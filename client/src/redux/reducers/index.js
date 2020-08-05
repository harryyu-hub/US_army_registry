import { combineReducers } from 'redux';
import users from './getUserList';
import createUser from './createUsers';
import editUser from './editUsers';
// import deleteUser from './deleteuser';
import alert from './alert';
import getUser from './getUser';
import superiors from './getSuperiorList';

const reducer = combineReducers({
  users,
  createUser,
  editUser,
  // deleteUser,
  getUser,
  superiors,
  alert
});

export default reducer;
