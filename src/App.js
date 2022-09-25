import Groupped from './Groupped';
import List from './List';
import Form from './Form';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogged: false,
      tasks: [],
      groupped: ''
    }
    this.handleLoggedChange = this.handleLoggedChange.bind(this)
    this.handleTasksChange = this.handleTasksChange.bind(this)
    this.handleGroupped = this.handleGroupped.bind(this)
  }

  handleLoggedChange(data){
    this.setState({isLogged: data})
  }

  handleTasksChange(tasks){
    this.setState({tasks})
  }

  handleGroupped(value){
    this.setState({ groupped: value })
    console.log(value)
  }

  render(){
    let isLogged = this.state.isLogged
    let tasks = this.state.tasks
    let groupped = this.state.groupped
    
    if (isLogged){
      return(
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="sm">
            <Groupped value={groupped} onGrouppedChange={this.handleGroupped}/>
            <List data={tasks} groupped={groupped} />
          </Container>
        </React.Fragment>
      )
    }
    return <Form islogged={isLogged} onLoggedChange={this.handleLoggedChange} onTasksChange={this.handleTasksChange}/>
  }
    
}

export default App;