import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default class ToDoListItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.task)
  }

  render() {
    let task = this.props.task
    let sx = {
      color: task.status === 'Выполнена' ? 'green' : task.dateDiff < 0 ? 'red' : 'grey'
    }

    return (
      <React.Fragment key={task.id}>
        <ListItem disablePadding >
          <ListItemButton role={undefined} onClick={this.handleClick} dense>
            <ListItemText sx={sx} primary={task.heading} secondary={
              <React.Fragment>
                <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                Ответственный: {task.responsiblename}
                <br />
                Дата завершения: { new Date(task.end_date).toLocaleDateString() }
                <br />
                Приоритет: { task.priority }
                <br />
                Статус: { task.status }
                </Typography>
              </React.Fragment>
            } />
          </ListItemButton>
        </ListItem>
        <Divider />
      </React.Fragment>
    );
  }
}