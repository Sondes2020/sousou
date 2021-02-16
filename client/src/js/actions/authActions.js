import axios from 'axios';
import {
  USER_LOADING,
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  GET_AUTH_USER,
  AUTH_ERRORS,
  PROFILE_USER,
} from '../constants/ActionsTypes';

//Set the user loading
const userLoading = () => (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });
};

// Register USer
export const registerUser = (formData) => async (dispatch) => {
  dispatch(userLoading());
  try {
    const res = await axios.post('/api/auth/register', formData);
    dispatch({
      type: REGISTER_USER,
      payload: res.data, // { msg: 'User registred with success', user, token }
    });
  } catch (error) {
    console.dir(error);

    const { errors, msg } = error.response.data;

    if (Array.isArray(errors)) {
      errors.forEach((err) => alert(err.msg));
    }
    console.log(errors);
    if (msg) {
      alert(msg);
    }

    dispatch({
      type: AUTH_ERRORS,
    });
  }
};

// Login User
export const loginUser = (formData) => async (dispatch) => {
  dispatch(userLoading());

  try {
    const res = await axios.post('/api/auth/login', formData);
    dispatch({
      type: LOGIN_USER,
      payload: res.data, // { msg: 'Logged in with success', user, token }
    });
  } catch (error) {
    console.dir(error);

    const { errors, msg } = error.response.data;

    if (Array.isArray(errors)) {
      errors.forEach((err) => alert(err.msg));
    }
    console.log(errors);
    if (msg) {
      alert(msg);
    }

    dispatch({
      type: AUTH_ERRORS,
    });
  }
};

// Get auth user
export const getAuthUser = () => async (dispatch) => {
  dispatch(userLoading());

  try {
    //headers
    const config = {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    };
    const res = await axios.get('/api/auth/user', config);
    dispatch({
      type: GET_AUTH_USER,
      payload: res.data, // {user: req.user}
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_ERRORS,
    });
  }
};



export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  });
};



// create profile
export const profileUser = (formData) => async (dispatch) => {
  

  try {
    const res = await axios.post('/api/auth/inscription', formData);
    dispatch({
      type: PROFILE_USER,
      payload: res.data, // { msg: 'profile creacted with success'}
    });
  } catch (error) {
    console.dir(error);
  }
}

export const getProfile=()=>dispatch=>{
  axios.get("api/auth/allprofile")
  .then(res=>dispatch({type:PROFILE_USER, payload:res.data}))
  .catch(error=>console.log(error))
}

export const editProfile=(idProfile, editedContact)=>dispatch=>{

  axios.put(`api/auth/editprofile/${idProfile}`, editProfile)
  .then(res=>dispatch(getProfile()))
  .catch((error)=>console.log(error));


}
export const deleteprofile=(idProfile)=>(dispatch)=>{
  axios.delete(`api/auth/deleteprofile/${idProfile}`)
  .then(res=>dispatch(getProfile()))
  .catch((error)=>console.log(error));
}


