import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default class ToDoModal extends React.Component {
  constructor(props) {
    super(props)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  handleOpen() {
    this.props.onClick(true)
  }
  handleClose(){
    this.props.onClose(false)
  }

  async handleSave(){
    let isValid = true
    let url = this.props.newData ? '/insert' : '/update'
    let data = this.props.data
   
    isValid = isValid && !!data.heading
    isValid = isValid && !!data.description
    isValid = isValid && !!data.responsible
    isValid = isValid && !!data.priority
    isValid = isValid && !!data.status
    if(isValid){
      let response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' }, body: JSON.stringify(data) })
      let result = await response.json()
      this.props.onTasksUpdate(result)
      this.props.onClose(false)
    } else {
      alert("Не все поля заполнены")
    }    
  }

  handleInputChange({target}) {
    const name = target.name
    this.props.onDataUpdate({[name]: target.value})
  }
  
  render(){
    let open = this.props.open
    let data = this.props.data
    let user = this.props.user
    let users = this.props.users
    let newData = this.props.newData
    let disabled = newData ? false : data.creator == user.manager || data.status == 'Выполнена'
    return (
      <Dialog  open={open} onClose={this.handleClose}>
        <DialogTitle>{ data.heading || "Новая задача" }</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{margin: '10px'}}>
            <Grid xs={12}>
              <TextField fullWidth disabled={disabled} value={data.heading} onChange={this.handleInputChange} size="small" label="Заголовок" name="heading" />
            </Grid>
            <Grid xs={12}>
              <TextField fullWidth disabled={disabled} value={data.description} onChange={this.handleInputChange} multiline rows={4} size="small" label="Описание"  name="description" />
            </Grid>
            <Grid xs={6}>
              <FormControl fullWidth>
                <InputLabel>Приоритет</InputLabel>
                <Select disabled={disabled} size="small" value={data.priority} label="Приоритет" onChange={this.handleInputChange} name="priority">
                  <MenuItem value="Высокий">Высокий</MenuItem>
                  <MenuItem value="Средний">Средний</MenuItem>
                  <MenuItem value="Низкий">Низкий</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={6}>
              <FormControl fullWidth>
                <InputLabel>Статус</InputLabel>
                <Select disabled={data.status == 'Выполнена'} size="small" value={data.status} label="Статус" onChange={this.handleInputChange} name="status">
                  <MenuItem value="К выполнению">К выполнению</MenuItem>
                  <MenuItem value="Выполняется">Выполняется</MenuItem>
                  <MenuItem value="Выполнена">Выполнена</MenuItem>
                  <MenuItem value="Отменена">Отменена</MenuItem>                  
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth>
                <InputLabel>Ответственный</InputLabel>
                <Select disabled={disabled} size="small" value={data.responsible} label="Ответственный" onChange={this.handleInputChange} name="responsible">
                  <MenuItem value="">Выберите ответственного</MenuItem> 
                  { users.map( user => {
                    return (<MenuItem key={user.id} value={user.id}>{`${user.last_name} ${user.name} ${user.second_name}`}</MenuItem>)
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth>
                <InputLabel>Создатель</InputLabel>
                <Select disabled={true} size="small" value={data.creator || user.id} label="Создатель" name="creator">
                  { users.map( user => {
                    return (<MenuItem key={user.id} value={user.id}>{`${user.last_name} ${user.name} ${user.second_name}`}</MenuItem>)
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>Закрыть</Button>
          <Button onClick={this.handleSave}>Сохранить</Button>
        </DialogActions>
      </Dialog >
    );
  }
}

  