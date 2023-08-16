/* eslint-disable */
import '@babel/polyfill';
import { login, logout ,signup, adminLogin} from './login';
import { updateSettings,shareExperience, postReferral } from './updateSettings';
import { showAlert } from './alerts';

import {contributeToCollege} from './stripe';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const signupForm = document.querySelector('.form--signup');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');
const shareExperienceForm = document.querySelector('.form-user-interview-experience');
const referralForm=document.querySelector('.form-user-referrals');
const contributeForm= document.querySelector('.form-user-contribute');
const AdminLoginForm = document.querySelector('.form--admin-login');
if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const yearOfCompletion=document.getElementById('yearOfCompletion').value;
    const company = document.getElementById('company').value;
    const mobile = document.getElementById('mobile').value;
    signup(name, email, password, passwordConfirm,company,yearOfCompletion,mobile);
  });
}

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if(AdminLoginForm){

  AdminLoginForm.addEventListener('submit',e=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    adminLogin(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const name= document.getElementById('name').value;
    const email=document.getElementById('email').value;
    const company= document.getElementById('company').value;
    const form={name,email,company}
    console.log(form)
    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
 
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings({ passwordCurrent, password, passwordConfirm}, 'password');

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

// if (bookBtn)
//   bookBtn.addEventListener('click', e => {
//     e.target.textContent = 'Processing...';
//     const { tourId } = e.target.dataset;
//     bookTour(tourId);
//   });

if(shareExperienceForm) {
  shareExperienceForm.addEventListener('submit',async e => {
    e.preventDefault();
    const myTextarea=document.getElementById('myTextarea');
    const company=document.getElementById('companyName');
    const companyName=company.value;
    const userTextarea=document.getElementById('userTextarea');
    const userId=userTextarea.name
    const experience=myTextarea.value;
    shareExperience(experience,userId,companyName);
  });

}

if(referralForm){

  referralForm.addEventListener('submit',async e=>{
    e.preventDefault();
    const userTextarea=document.getElementById('userTextarea');
    const company=document.getElementById('companyName');
    const locationEle=document.getElementById('location');
    const linkEle=document.getElementById('link');
    const roleEle=document.getElementById('role');
    const role=roleEle.value;
    const companyName=company.value;
    const location=locationEle.value;
    const link=linkEle.value;
    const userId=userTextarea.name;
    postReferral(companyName,location,link,userId,role);

  })

}


if(contributeForm){
  contributeForm.addEventListener('submit',async e=>{
    e.preventDefault();
    console.log("got here");
    const amount=document.getElementById('amount');
    const user=document.getElementById('userTextarea');
    const userId=user.name;
    console.log(amount.value,userId)
    contributeToCollege(amount.value,userId);
  })
}


document.querySelector('.openPopup').addEventListener('click', function() {
  console.log("open popup")
  document.querySelector('.popup').style.display = 'block';
});

document.querySelector('.closePopup').addEventListener('click', function() {
  console.log("closepopup")
  document.querySelector('.popup').style.display = 'none';
});






const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);
