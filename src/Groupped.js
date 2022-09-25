import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default class Groupped extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.onGrouppedChange(event.target.value)
  }

  render() {
    let groupped = this.props.value
    return (
      <Box sx={{ flexGrow: 1 }}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-standard-label">Сгруппировать</InputLabel>
          <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={groupped} onChange={this.handleChange} label="Сгруппировать">
            <MenuItem value=""><em>Без группировки</em></MenuItem>
            <MenuItem value="end_date">По дате завершения</MenuItem>
            <MenuItem value="responsible">По ответственным</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }
}