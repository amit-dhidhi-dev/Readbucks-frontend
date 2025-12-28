// utils/razorpay.js

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

import axios from "axios";

export const displayRazorpay = async (amount, productName, onSuccess, onError, setLoading) => {
  setLoading(true);

  try {

    if (amount < 0 || amount == 0) {
      onSuccess();
      return;
    }

    // Load Razorpay script
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load');
      setLoading(false);
      return;
    }

    // Create order on backend
    const { data } = await axios.post('http://localhost:8000/payments/create-order', {
      amount: amount,
      currency: 'INR'
    });



    if (!data.success) {
      throw new Error('Failed to create order');
    }

    const options = {
      key: data.key, // Razorpay key
      amount: data.amount.toString(),
      currency: data.currency,
      name: 'ReadBucks',
      description: productName || 'Product Purchase',
      image: '/logo.png', // Your logo
      order_id: data.order_id,
      handler: async function (response) {
        // Verify payment on backend
        const verifyResponse = await axios.post('http://localhost:8000/payments/verify-payment', {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature
        });

        if (verifyResponse.data.success) {
          if (onSuccess) {
            onSuccess(response);
          }
          // alert('Payment Successful!');
        } else {
          if (onError) {
            onError('Payment verification failed');
          }
          // alert('Payment verification failed');
        }
      },
      // prefill: {
      //   name: 'John Doe',
      //   email: 'john@example.com',
      //   contact: '9999999999'
      // },
      // notes: {
      //   address: 'Your address'
      // },
      // theme: {
      //   color: '#3399cc'
      // }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

  } catch (error) {
    console.error('Payment error:', error);
    if (onError) {
      onError(error.message);
    }
    alert('Payment initialization failed');
  } finally {
    setLoading(false);
  }
};