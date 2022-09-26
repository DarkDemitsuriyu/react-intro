import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      valueLogin: '',
      valuePwd:'',
      errorLogin: false,
      errorLoginText: "",
      errorPwd: false,
      errorPwdText: ""
    }
    this.sxCard = {
      width: 270,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: '-50px',
      marginLeft: '-100px'
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handlerSubmit = this.handlerSubmit.bind(this)
    this.showError = this.showError.bind(this)
  }

  showError(type, text) {
    let value = `error${type}`
    let textProp = `error${type}Text`
    this.setState({ [value]: true, [textProp]: text })
    setTimeout(() => this.setState({ [value]: false, [textProp]: ""}), 5000)
    return false
  }

  async handlerSubmit() {
    let isValid = true
    if(this.state.valueLogin.length < 1){
      isValid = this.showError('Login', "Поле обязательно для заполнения")
    }
    if(this.state.valuePwd.length < 1){
      isValid = this.showError('Pwd', "Поле обязательно для заполнения")
    }
    if(isValid){
      let response = await fetch('/login', { method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' }, body: JSON.stringify({login: this.state.valueLogin, password: this.state.valuePwd}) })
      let {err, data} = await response.json();
      if(err){
        this.showError(data.type, data.txt)
      } else {
        this.props.onDataSet(data)
      }
    }
  }

  handleInputChange({target}) {
    const name = `value${target.name}`
    this.setState({[name]: target.value});
  }

  render(){
    let errorLogin = this.state.errorLogin
    let errorLoginText = this.state.errorLoginText
    let errorPwd = this.state.errorPwd
    let errorPwdText = this.state.errorPwdText
    return (
      <Card sx={this.sxCard}>
        <CardContent>
          <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
            <TextField required value={this.valueLogin} onChange={this.handleInputChange} size="small" error={errorLogin} helperText={errorLoginText} id="login-text" label="Логин" variant="standard" name="Login"/>
            <TextField required value={this.valuePwd} onChange={this.handleInputChange} size="small" error={errorPwd} helperText={errorPwdText} id="pwd-text" label="Пароль" variant="standard" type="password" name="Pwd"/>
          </Box>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={this.handlerSubmit}>Вход</Button>
        </CardActions>
      </Card>
    );
  }
}
  
export default LoginForm;
 