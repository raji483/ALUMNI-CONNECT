/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_51NTM8kSE9OEOSVUmLe8sJk1ie42sJGeDpIv1zXRHgoi8pwlYTXEalhQh2XVOTXSZL7ljvpPlrXnQGbeB7u8QvB8L00xug0Bj9G');

export const contributeToCollege = async (amount,userId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
    `http://127.0.0.1:3000/api/v1/payments/checkout-session/${userId}/${amount}`,
        
    );
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};