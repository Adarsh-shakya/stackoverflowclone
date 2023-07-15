import React, { useState } from 'react';
import './Subtion.css';

const Subtion = ({ onCheckout }) => {
  const [selectedPlan, setSelectedPlan] = useState('');

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  const handleCheckout = () => {
    if (selectedPlan) {
      onCheckout(selectedPlan.amount, selectedPlan.name);
    }
  };

  return (
    <div className="subscription-page">
      <h1>Choose a Subscription Plan</h1>
      <div className="card-container">
        <div
          className={`card ${selectedPlan === 'free' ? 'selected' : ''}`}
          onClick={() => handlePlanSelection({ name: 'free', amount: 0 })}
        >
          <h2>Free Plan</h2>
          <p className="price">₹0/month</p>
          <p>Post 1 question per day</p>
          <button>Select</button>
        </div>
        <div
          className={`card ${selectedPlan === 'silver' ? 'selected' : ''}`}
          onClick={() => handlePlanSelection({ name: 'silver', amount: 100 })}
        >
          <h2>Silver Plan</h2>
          <p className="price">₹100/month</p>
          <p>Post 5 questions per day</p>
          <button>Select</button>
        </div>
        <div
          className={`card ${selectedPlan === 'gold' ? 'selected' : ''}`}
          onClick={() => handlePlanSelection({ name: 'gold', amount: 1000 })}
        >
          <h2>Gold Plan</h2>
          <p className="price">₹1000/month</p>
          <p>Post unlimited questions</p>
          <button>Select</button>
        </div>
      </div>
      {selectedPlan && (
        <div className="selected-plan">
          <h2>Selected Plan: {selectedPlan.name}</h2>
          <p>Payment details and other information here...</p>
          <button className="payment-button" onClick={handleCheckout}>
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default Subtion;
