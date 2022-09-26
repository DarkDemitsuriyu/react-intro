import * as React from 'react';
import List from '@mui/material/List';
import ToDoListItem from './ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

export default class ToDoListData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          open: [true, true, true]
        }
        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(index) {
      let open = this.state.open
      open[index] = !open[index]
      this.setState({ open });
    };

    handleOpenModal(value) {
      this.props.openModal(value)
    }

    render() {
      let dataToday = this.props.data.filter( task => {
        return task.dateDiff <= 0
      })
      let dataWeek = this.props.data.filter( task => {
        return 0 < task.dateDiff && task.dateDiff <= 7
      })
      let dataFuture = this.props.data.filter( task => {
        return task.dateDiff > 7
      })
      let open = this.state.open
      return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItemButton onClick={this.handleClick.bind(this, 0)}>
            <ListItemText primary={<b>{"Задачи на сегодня"}</b>} />
            {open[0] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open[0]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {dataToday.map((task) => {
                return (
                  <ToDoListItem key={task.id} task={task}  onClick={this.handleOpenModal}/>
                );
              })}
            </List>
          </Collapse>
          <ListItemButton onClick={this.handleClick.bind(this, 1)}>
            <ListItemText primary={<b>{"Задачи на неделю"}</b>} />
            {open[1] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open[1]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {dataWeek.map((task) => {
                return (
                  <ToDoListItem key={task.id} task={task}  onClick={this.handleOpenModal}/>
                );
              })}
            </List>
          </Collapse>
          <ListItemButton onClick={this.handleClick.bind(this, 2)}>
            <ListItemText primary={<b>{"Задачи на будущее"}</b>} />
            {open[2] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open[2]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {dataFuture.map((task) => {
                return (
                  <ToDoListItem key={task.id} task={task}  onClick={this.handleOpenModal}/>
                );
              })}
            </List>
          </Collapse>
        </List>
      )
    }
}