import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  createUser,
  initUser,
  setUserList,
  setAlert,
  resetConfig
} from '../../redux/action-creators';
import { Loading, Alert } from '../utils';
import axios from 'axios';

import { makeStyles, createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import teal from '@material-ui/core/colors/teal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { FormLabel, InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: teal,
  },
});

const CreateUser = ({
  setAlert,
  config,
  resetConfig,
  createUser,
  alertContent,
  history,
  createSuccess,
  isLoading,
  error,
  setUserList,
  superiorList
}) => {
  const inf = Number.MAX_SAFE_INTEGER;
  useEffect(
    () =>
      setUserList({
        pageSize: inf,
        pageNumber: 1,
        sortType: 0,
        searchText: '__NO_SEARCH_TEXT__',
        superiorId: '__NO_SUPERIOR_ID__'
      }),
    []
  );

  const [userData, setUserData] = useState({
    avatar:
      'https://s.yimg.com/aah/priorservice/us-army-new-logo-magnet-15.gif',
    name: '',
    sex: '',
    rank: '',
    startdate: '',
    phone: '',
    email: '',
    superior: '' // Id
  });

  const {
    avatar,
    name,
    sex,
    rank,
    startdate,
    phone,
    email,
    superior
  } = userData;

  const handleCreate = e => {
    //resetConfig();
    e.preventDefault();
     console.log(
       config
     );
     
    /*setUserList({
      pageSize: 9,
      pageNumber: 1,
      sortType: 0,
      searchText: '__NO_SEARCH_TEXT__',
      superiorId: '__NO_SUPERIOR_ID__'
    })*/
    createUser({
      avatar,
      name,
      sex,
      rank,
      startdate,
      phone,
      email,
      superior
    });
    

    
  };

  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleDateChange = date => {
    setUserData({ ...userData, startdate: date });
  };

  const handleBack = () => {
    history.push('/');
  };

  const rankList = ['General', 'Colonel', 'Major', 'Captain', 'Lieutenant', 
                'Warrant Officer', 'Sergeant', 'Corporal', 'Specialist', 'Private'];

  const [file, setFile] = useState(null);

  const handleSelect = e => {
    setFile(e.target.files[0]);
  };

  const handleUpload = e => {
    const fd = new FormData();
    fd.append('image', file);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    axios
      .post('http://localhost:5000/upload', fd, config)
      .then(res => {
        console.log(res);
        setUserData({
          ...userData,
          avatar: `http://localhost:5000/${res.data.filePath}`
        });
      })
      .catch(err => console.log(err));
  };

  const handleSelectRef = () => {
    uploadEl.current.click();
  };

  const uploadEl = useRef(null);

  const useStyles = makeStyles(theme => ({
    // appBar: {
    //   position: 'relative',
    // },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3)
      }
    },
    sex: {
      position: 'relative',
      top: theme.spacing(1.7),
      marginRight: theme.spacing(2),
      color: 'black'
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    button: {
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(1),
      marginBottom: theme.spacing(2)
    },
    fillSpace: {
      width: theme.spacing(15),
      margin: theme.spacing(1, 1, 1, 1)
    },
    badge: {
      width: theme.spacing(5),
      // height: '50%'
      // (top, right, bottom, left)
      margin: theme.spacing(1, 1, 1, 0)
    },
    formName: {
      marginTop: theme.spacing(1)
    },
    avatarHead: {
      textAlign: 'center'
    },
    avatar: {
      margin: '0 auto',
      width: theme.spacing(30),
      height: theme.spacing(30)
    },
    uploadButtons: {
      margin: '0 auto',
      padding: theme.spacing(0, 0, 0, 1)
    }
  }));

  const classes = useStyles();

  return (
    <div>
      {createSuccess ? (
        <Redirect to='/' />
      ) : isLoading ? (
        <Loading />
      ) : (
        <div>
          <ThemeProvider theme={theme}>
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <form onSubmit={handleCreate}>
                <div className={classes.buttons}>
                  
                  <Typography
                    className={classes.formName}
                    variant='h4'
                    gutterBottom
                  >
                    New Soldier
                  </Typography>
                  <div className={classes.fillSpace} />

                  
                </div>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={6}>
                    <div
                      className={classes.avatarHead}
                      fullWidth
                    >
                      Avatar
                    </div>
                    <br />
                    <div className={classes.avatar}>
                      <img
                        alt='avatar'
                        src={avatar}
                        id='avatar'
                        name='avatar-preview'
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>

                    <input
                      name='avatar-upload'
                      accept='image/*'
                      style={{ display: 'none' }}
                      onChange={handleSelect}
                      ref={uploadEl}
                      multiple
                      type='file'
                    />
                    <div className={classes.uploadButtons}>
                      <div>
                        <Button
                          variant='contained'
                          color='primary'
                          className={classes.button}
                          onClick={handleSelectRef}
                        >
                          Select
                        </Button>
                       
                        <Button
                          variant='contained'
                          color='secondary'
                          className={classes.button}
                          onClick={handleUpload}
                        >
                          Upload
                        </Button>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <TextField
                      required
                      id='name'
                      name='name'
                      value={name}
                      onChange={handleChange}
                      label='Name'
                      fullWidth
                      autoComplete='name'
                    />
                    <FormControl fullWidth>
                      <InputLabel htmlFor='rank-native-helper'>Rank</InputLabel>
                      <Select
                        native
                        value={rank}
                        onChange={handleChange}
                        inputProps={{ name: 'rank', id: 'rank-native-helper' }}
                      >
                        <option value='' />
                        {rankList.map(rank => {
                          return <option value={rank}>{rank}</option>;
                        })}
                      </Select>
                    </FormControl>

                    <RadioGroup
                      name='sex'
                      aria-label='sex'
                      value={sex}
                      onChange={handleChange}
                      row
                    >
                      <FormLabel className={classes.sex}>Sex: </FormLabel>
                      {['Male', 'Female'].map(sex => (
                        <FormControlLabel
                          value={sex}
                          control={<Radio />}
                          label={sex}
                        />
                      ))}
                    </RadioGroup>
                    
                    <TextField
                      required
                      id='startdate'
                      name='startdate'
                      value={startdate}
                      onChange={handleChange}
                      label='Start Date'
                      fullWidth
                      autoComplete='startdate'
                    />

                    {startdate && !/(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/.test(startdate) && (
                      <Alert warning='invalid' item='startdate' />
                    )}

                    <TextField
                      required
                      id='phone'
                      name='phone'
                      value={phone}
                      onChange={handleChange}
                      label='Office Phone'
                      fullWidth
                      autoComplete='phone'
                    />
                    {phone && !/^\d{10}$/.test(phone) && (
                      <Alert warning='invalid' item='phone number' />
                    )}

                    <TextField
                      required
                      id='email'
                      name='email'
                      value={email}
                      onChange={handleChange}
                      label='Email'
                      fullWidth
                      autoComplete='email'
                    />
                    {email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && (
                      <Alert warning='invalid' item='email' />
                    )}
                    

                    <FormControl fullWidth>
                      <InputLabel htmlFor='superior-native-helper'>
                        Superior
                      </InputLabel>
                      <Select
                        native
                        value={superior._id}
                        onChange={handleChange}
                        inputProps={{
                          name: 'superior',
                          id: 'superior-native-helper'
                        }}
                      >
                        <option value='' />
                        {superiorList.map(superior => {
                          return (
                            <option value={superior._id}>
                              {superior.name}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <div>
                <Button
                    variant='contained'
                    color='success'
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    className={classes.button}
                  >
                    Save
                  </Button>
                </div>
              </form>
            </Paper>
          </main>
          </ThemeProvider>
          
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    alertContent: state.alert.alertContent,
    createSuccess: state.createUser.createSuccess,
    isLoading: state.createUser.isLoading,
    error: state.createUser.error,
    superiorList: state.users.users,
    config: state.users.config,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAlert: alert => dispatch(setAlert(alert)),
    setUserList: config => dispatch(setUserList(config)),
    createUser: data => dispatch(createUser(data)),
    initUser: () => dispatch(initUser()),
    resetConfig: () => dispatch(resetConfig()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser);
