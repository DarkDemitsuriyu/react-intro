import Groupped from './Groupped';
import List from './List';
import Form from './Form';
import Modal from './Modal';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogged: false,
      open:false,
      newData: true,
      modalData: {
        heading:'',
        description:'',
        responsible: '',
        priority:'Средний',
        status:'К выполнению'
      },
      tasks: [],
      resps: [],
      user:{},
      users: [],
      groupped: ''
    }
    this.handleDataSet = this.handleDataSet.bind(this)
    this.handleGroupped = this.handleGroupped.bind(this)
    this.handleOpenModalNew = this.handleOpenModalNew.bind(this)
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleDataUpdate = this.handleDataUpdate.bind(this)
    this.handleTasksUpdate = this.handleTasksUpdate.bind(this)  
  }

  handleTasksUpdate(tasks){
    this.setState({ tasks })
  }

  handleDataSet({user, resps, tasks, isLogged, users}){
    this.setState({tasks, resps, user, isLogged, users})
  }

  handleGroupped(value){
    this.setState({ groupped: value })
  }

  handleOpenModalNew(){
    this.setState({ open: true, newData: true, modalData: {
      heading:'',
      description:'',
      responsible: '',
      priority:'Средний',
      status:'К выполнению',
    }})
  }

  handleDataUpdate(data){
    this.setState({ modalData: Object.assign(this.state.modalData, data) })
  }
  
  handleOpenModal(value){
    this.setState({ open: true, newData: false, modalData: value })
  }

  handleCloseModal(){
    this.setState({ open: false })
  }

  render(){
    let isLogged = this.state.isLogged
    let tasks = this.state.tasks
    let resps = this.state.resps
    let groupped = this.state.groupped
    let open = this.state.open
    let modalData = this.state.modalData
    let user = this.state.user
    let users = this.state.users
    let newData = this.state.newData
    
    if (isLogged){
      return(
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="sm">
            <Groupped value={groupped} onGrouppedChange={this.handleGroupped} onOpenModalNew={this.handleOpenModalNew}/>
            <List data={tasks} resps={resps} groupped={groupped} openModal={this.handleOpenModal}/>
          </Container>
          <Modal open={open} user={user} users={users} onTasksUpdate={this.handleTasksUpdate} newData={newData} data={modalData} onDataUpdate={this.handleDataUpdate} onClose={this.handleCloseModal} onClick={this.handleOpenModal}/>
        </React.Fragment>
      )
    }
    return <Form islogged={isLogged} onDataSet={this.handleDataSet}/>
  }
    
}

export default App;