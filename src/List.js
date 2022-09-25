import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//const [checked, setChecked] = React.useState([0]);

export default class ToDoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: [0]
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle(value) {
    const currentIndex = this.state.checked.indexOf(value);
    const newChecked = [...this.state.checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1)
    }

    this.setState({checked:newChecked})
  };

  render() {
    return (
      <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell align="right">Заголовок</TableCell>
              <TableCell align="right">Описание</TableCell>
              <TableCell align="right">Дата создания</TableCell>
              <TableCell align="right">Дата обновления</TableCell>
              <TableCell align="right">Дата окончания</TableCell>
              <TableCell align="right">Создатель</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index}
                </TableCell>
                <TableCell align="right">{row.heading}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.creation_date}</TableCell>
                <TableCell align="right">{row.update_date}</TableCell>
                <TableCell align="right">{row.end_date}</TableCell>
                <TableCell align="right">{row.creatorname}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
  
  
  
        <ListSubheader>{`I'm sticky`}</ListSubheader>
        {this.props.data.map((task) => {
          const labelId = `checkbox-list-label-${task.id}`;
  
          return (
            <React.Fragment key={task.id}>
              <ListItem disablePadding >
                <ListItemButton role={undefined} onClick={this.handleToggle(task)} dense>
                  <ListItemText id={labelId} primary={task.heading} secondary={
                    <React.Fragment>
                      <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                        {task.description}
                      </Typography>
                      <br />
                      Создал: {task.creatorname}
                      <br />
                      {"Дата создания / завершения: "}
                      { new Date(task.update_date || task.creation_date).toLocaleDateString() }
                      {" / "}
                      { new Date(task.end_date).toLocaleDateString() }
                  </React.Fragment>                
                  } />
                </ListItemButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
      </div>
    );
  }
}