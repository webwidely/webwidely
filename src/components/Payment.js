import React, { useState } from 'react';
import axios from 'axios';

const PayMobPaymentComponent = () => {
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState('');
  const [paymentUrl, setPaymentUrl] = useState('');

  const handlePayment = async () => {
    try {
      // Step 1: Create an order
      const orderResponse = await axios.post(
        'https://api.paymob.com/payments/orders',
        {
          amount_cents: amount * 100,
          currency: 'USD',
          integration_id: 37078,
          delivery_needed: false,
          items: [],
          shipping_data: {
            apartment: 'NA',
            email,
            floor: 'NA',
            first_name: 'NA',
            street: 'NA',
            building: 'NA',
            phone_number: 'NA',
            shipping_method: 'NA',
            postal_code: 'NA',
            city: 'NA',
            country: 'NA',
            state: 'NA',
          },
        },
        {
          headers: {
            Authorization: `Bearer 1BDED0C896164C3AD739E2DF770A426A`,
          },
        }
      );

      const { id } = orderResponse.data;

      // Step 2: Generate payment URL
      const paymentUrlResponse = await axios.post(
        `https://accept.paymob.com/api/acceptance/payment_keys`,
        {
          amount_cents: amount * 100,
          currency: 'USD',
          order_id: id,
          billing_data: {
            email,
          },
        },
        {
          headers: {
            Authorization: `Bearer 1BDED0C896164C3AD739E2DF770A426A`,
          },
        }
      );

      const { token: paymentToken } = paymentUrlResponse.data;

      setPaymentUrl(`https://pakistan.paymob.com/api/acceptance/iframes/${paymentToken}`);
    } catch (error) {
      console.error('Error occurred during payment:', error);
    }
  };

  const redirectToPayment = () => {
    window.location.href = paymentUrl;
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-heading mb-4">PayMob Payment Component</h2>
      <div className="mb-4">
        <label htmlFor="amount" className="block font-body mb-1">
          Amount:
        </label>
        <input
          id="amount"
          type="number"
          className="border border-gray-300 px-4 py-2 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block font-body mb-1">
          Email:
        </label>
        <input
          id="email"
          type="text"
          className="border border-gray-300 px-4 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        className="bg-green-500 hover:bg-hover text-white font-body py-2 px-4 rounded"
        onClick={handlePayment}
      >
        Send Payment
      </button>
      {paymentUrl && (
        <div className="mt-4">
          <h3 className="text-xl font-heading">Payment URL:</h3>
          <a
            href={paymentUrl}
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {paymentUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default PayMobPaymentComponent;
