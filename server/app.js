import express from 'express'
import session from 'express-session'
import knex from './db/knex.js'
import bodyParser from 'body-parser'
import cPass from './lib/cryptPass.js'
 import sessionStore from './lib/sessionStore.js'

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(express.static('public'))

app.use(session({
  resave: false,
  saveUninitialized: false,
  store:sessionStore,
  secret: 'shhhh, very secret'
}))

app.use('/login', async ({body:{login, password}, ...req}, res, next) => {
	let pwd = await cPass.passCrypt(password)
	let [{count}] = await knex('users').count('id').where({ login })
	if(count > 0){
		let [user] = await knex('users').select('id', 'name', 'second_name', 'last_name', 'login', 'manager').where({ login, pwd })
		if(user){
			req.session.user = user
			let responsibleName = knex.raw("concat(users.last_name, ' ', users.name, ' ', users.second_name) as responsibleName")
			let {rows:tasks} = await knex.raw(`select distinct t.*, concat(users.last_name, ' ', users.name, ' ', users.second_name) as responsibleName, x.creatorName from tasks t, users, (select users.id, concat(users.last_name, ' ', users.name, ' ', users.second_name) as creatorName from tasks t, users where t.creator = users.id) x where t.responsible = users.id and (t.creator = ${user.id} or t.responsible = ${user.id}) and x.id = t.creator`)
			let resps = await knex('tasks').join('users', 'tasks.responsible', '=', 'users.id').distinct().select('users.id', responsibleName).where('creator', user.id).orWhere('responsible', user.id)
			let users = await knex('users').select('id', 'name', 'second_name', 'last_name', 'manager').where('manager', user.id).orWhere('id', user.id)
			res.send({err:false, data: {tasks, resps, user, isLogged: true, users}})
		} else {
			res.send({err: true, data: {type:'Pwd', txt:'Пользователя с таким сочетанием логина и пароля не существует'}})
		}
	} else {
		res.send({err: true, data: {type:'Login', txt:'Пользователя с таким логином не существует'}})
	}
})

app.use('/insert', async (req, res, next) => {
	if(req.session.user){
		let body = req.body
		body.creator = req.session.user.id
		await knex('tasks').insert(body)
		let {rows:tasks} = await knex.raw(`select distinct t.*, concat(users.last_name, ' ', users.name, ' ', users.second_name) as responsibleName, x.creatorName from tasks t, users, (select users.id, concat(users.last_name, ' ', users.name, ' ', users.second_name) as creatorName from tasks t, users where t.creator = users.id) x where t.responsible = users.id and (t.creator = ${body.creator} or t.responsible = ${body.creator}) and x.id = t.creator`)
		res.send(tasks)
	}	
})

app.use('/update', async ({body, ...req}, res, next) => {
	await knex('tasks').where('id', body.id).update({
		heading: body.heading,
		description: body.description,
		update_date: new Date(),
		responsible: body.responsible,
		priority: body.priority,
		status: body.status
	})
	let user = req.session.user
	console.log(user)
	let {rows:tasks} = await knex.raw(`select distinct t.*, concat(users.last_name, ' ', users.name, ' ', users.second_name) as responsibleName, x.creatorName from tasks t, users, (select users.id, concat(users.last_name, ' ', users.name, ' ', users.second_name) as creatorName from tasks t, users where t.creator = users.id) x where t.responsible = users.id and (t.creator = ${user.id} or t.responsible = ${user.id}) and x.id = t.creator`)
	res.send(tasks)
})

app.use('/', (req, res, next) => {
	knex.select().from('tasks').then( rows => {
		res.send(rows)
	}).catch(function(error) {
		console.error(error);
		res.send(error)
	});
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
