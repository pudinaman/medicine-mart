import React, { useState } from 'react';

const DeliveryOptions = () => {
  const [selectedOperator, setSelectedOperator] = useState('UPS');
  const [selectedDelivery, setSelectedDelivery] = useState('instant');

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Delivery options</h2>
      
      <div style={styles.section}>
        <span style={styles.label}>Operator</span>
        <div style={styles.operators}>
          {['UPS', 'Amazon', 'DHL', 'FedEx'].map(operator => (
            <label key={operator} style={styles.radioLabel}>
              <input
                type="radio"
                name="operator"
                value={operator}
                checked={selectedOperator === operator}
                onChange={() => setSelectedOperator(operator)}
                style={styles.radioInput}
              />
              {operator}
            </label>
          ))}
        </div>
      </div>
      
      <div style={styles.section}>
        <div
          onClick={() => setSelectedDelivery('instant')}
          style={selectedDelivery === 'instant' ? styles.selectedBox : styles.box}
        >
          <input
            type="radio"
            name="delivery"
            value="instant"
            checked={selectedDelivery === 'instant'}
            onChange={() => setSelectedDelivery('instant')}
            style={styles.hiddenInput}
          />
          <div style={styles.deliveryOption}>
            <span style={styles.price}>$22</span>
            <div>
              <span>Instant delivery</span>
              <br />
              <span>Est. arrival: Today</span>
            </div>
          </div>
        </div>

        <div
          onClick={() => setSelectedDelivery('standard')}
          style={selectedDelivery === 'standard' ? styles.selectedBox : styles.box}
        >
          <input
            type="radio"
            name="delivery"
            value="standard"
            checked={selectedDelivery === 'standard'}
            onChange={() => setSelectedDelivery('standard')}
            style={styles.hiddenInput}
          />
          <div style={styles.deliveryOption}>
            <span style={styles.price}>$12</span>
            <div>
              <span>Standard delivery</span>
              <br />
              <span>Est. arrival: DD/MM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  section: {
    marginBottom: '20px',
    width: '100%',
    maxWidth: '600px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  operators: {
    display: 'flex',
    gap: '10px',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    cursor: 'pointer',
  },
  radioInput: {
    marginRight: '5px',
  },
  box: {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    maxWidth: '300px', // Set maximum width for the boxes
    width: '100%', // Ensure the box uses full width up to the max-width
    boxSizing: 'border-box',
  },
  selectedBox: {
    border: '1px solid #8a2be2',
    backgroundColor: '#f5f0ff',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    maxWidth: '300px', // Set maximum width for the boxes
    width: '100%', // Ensure the box uses full width up to the max-width
    boxSizing: 'border-box',
  },
  price: {
    fontSize: '14px', // Reduced font size
    fontWeight: 'bold',
    marginRight: '10px',
  },
  hiddenInput: {
    display: 'none',
  },
  deliveryOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px', // Add some space between price and description
  },
};

export default DeliveryOptions;
