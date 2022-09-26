import * as React from 'react';
import List from '@mui/material/List';
import ToDoListItem from './ListItem';
import ListDate from './ListDate';
import ListResp from './ListResp';

export default class ToDoList extends React.Component {
  constructor(props) {
    super(props)
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({ open: !this.state.open});
  };

  handleOpenModal(value) {
    this.props.openModal(value)
  }

  render() {
    let data = this.props.data.map( task => {
      task.dateDiff = parseInt((new Date(task.end_date) - new Date())/1000/60/60/24)
      return task
    })
    let resps = this.props.resps
    switch(this.props.groupped){
      case 'end_date':
        return (<ListDate data={data} openModal={this.handleOpenModal}/>)
      case 'responsible':
        return (<ListResp data={data} resps={resps} openModal={this.handleOpenModal}/>)
      default:
        return (
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {data.map((task) => {
              return (<ToDoListItem key={task.id} task={task} onClick={this.handleOpenModal}/>)
            })}
          </List>
        )
    }
  }
}