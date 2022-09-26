import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

export default class Groupped extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleOpenModalNew = this.handleOpenModalNew.bind(this)
  }

  handleChange(event) {
    this.props.onGrouppedChange(event.target.value)
  }

  handleOpenModalNew(){
    this.props.onOpenModalNew()
  }

  render() {
    let groupped = this.props.value
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{margin: '10px'}}>
          <Grid xs={10}>
            <FormControl variant="standard" sx={{ minWidth: 200 }}>
              <InputLabel>Сгруппировать</InputLabel>
              <Select size="small" value={groupped} onChange={this.handleChange} label="Сгруппировать">
                <MenuItem value=""><em>Без группировки</em></MenuItem>
                <MenuItem value="end_date">По дате завершения</MenuItem>
                <MenuItem value="responsible">По ответственным</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={2} sx={{p: 2}}>
            <IconButton onClick={this.handleOpenModalNew} color="primary">
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    );
  }
}