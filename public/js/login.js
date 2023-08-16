/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const signupForm = document.querySelector('.form--signup');

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      if(res.data.role=='user'){
        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
      }else{
        window.setTimeout(() => {
          location.assign('/admin');
        }, 1500);
      }
      
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout'
    });
    if ((res.data.status = 'success')) location.reload(true);
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Error logging out! Try again.');
  }
};


export const adminLogin = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/admin-login',
      data: {
        email,
        password,
        
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};






export const signup = async (name, email, password, passwordConfirm,company,yearOfCompletion,mobile) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
        company,
        yearOfCompletion,
        mobile
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'signed up in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Error while singing  out! Try again! may be email is duplicate.');
  }
};

