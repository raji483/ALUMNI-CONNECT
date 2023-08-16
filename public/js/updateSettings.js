/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const shareExperience=async(experience,userId,companyName)=>{

  try{

    const res=await axios({
      method: 'POST',
      url:"http://127.0.0.1:3000/interview-experience",
      data:{
        experience,
        userId,
        companyName

      }
    });
    if (res.data.status === 'success') {
      showAlert('success', `Interview Experience Posted successfully!`);
    }

  }catch(err){
    showAlert('error', err.response.data.message);

  }

}

export const postReferral=async(companyName,location,link,userId,role)=>{

  try{

    const res=await axios({
      method: 'POST',
      url:"http://127.0.0.1:3000/referral",
      data:{
        link,
        location,
        userId,
        companyName,
        role

      }
    });
    console.log(res.data)
    if (res.data.status === 'success') {
      showAlert('success', `Referral Posted successfully!`);
    }

  }catch(err){
    showAlert('error', err.response.data.message);

  }

}
