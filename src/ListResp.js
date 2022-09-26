import * as React from 'react';
import List from '@mui/material/List';
import ToDoListItem from './ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

export default class ToDoListResp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          open: [true, true]
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
      let data = this.props.data
      let resps = this.props.resps
      let open = this.state.open
      return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {resps.map( (resp, index) => {
            return (
              <React.Fragment key={resp.id}>
                <ListItemButton onClick={this.handleClick.bind(this, index)}>
                  <ListItemText primary={<b>{resp.responsiblename}</b>} />
                  {open[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open[index]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {data.map( task => {
                      if(task.responsible == resp.id){
                        return (<ToDoListItem key={task.id} task={task} onClick={this.handleOpenModal} />);
                      }                    
                    })}
                  </List>
                </Collapse>
              </React.Fragment>
            )
          })}
        </List>
      )
    }
}