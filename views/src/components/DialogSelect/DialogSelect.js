import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  titleButton: {
      color: "white"
  }
}));

export default function DialogSelect(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [city, setCity] = React.useState('');
  const [province, setProvince] = React.useState('');
  const {title, dialogTitle, cat1, cat2, collection} = props;
  const [displayedTitle, setDisplayedTitle] = React.useState(title);

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  }

  const handleCityChange = (event) => {
    setCity(event.target.value);
  }

  const handleTitleChange = () => {
    setDisplayedTitle(city);
    setOpen(false);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  function getProvinces() {
    let provinces = [];
    let x;
    for (x = 0; x < collection.length; x++) {
        if (!provinces.includes(collection[x]["admin"])){
            provinces.push(collection[x]["admin"]);
        }
    }
    return provinces;
  }

  const renderProvinces = (
    <Select
    labelId="demo-dialog-select-label"
    id="demo-dialog-select"
    value={province}
    onChange={handleProvinceChange}
    input={<Input />}
  >
        <option aria-label="None" value="" />
        {getProvinces().map(x => {
            return <MenuItem value={x}>{x}</MenuItem>
        })}
    </Select>
  );

  function getCities(province){
    let cities = [];
    let x;
    for (x = 0; x < collection.length; x++) {
        // console.log(x);
        if (collection[x]["admin"] === province){
            cities.push(collection[x]["city"]);
        }
    }
    // console.log(cities)
    return cities;
  };

  const renderCities = (
    <Select
    labelId="demo-dialog-select-label"
    id="demo-dialog-select"
    value={city}
    onChange={handleCityChange}
    input={<Input />}
  >
    <MenuItem value="">
      <em>None</em>
    </MenuItem>
    {getCities(province).map(x => {
        return <MenuItem value={x}>{x}</MenuItem>
    })}
  </Select>
  );

  return (
    <div>
      <Button className={classes.titleButton} onClick={handleClickOpen}>{displayedTitle}</Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle classees={{root: classes.dialogTitle}}>{dialogTitle}</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">{cat1}</InputLabel>
              {renderProvinces}
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">{cat2}</InputLabel>
              {renderCities}
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleTitleChange} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}