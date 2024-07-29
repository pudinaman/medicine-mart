import React, { useState, useEffect } from 'react';
import './CSS/RecipientInformation.css';
import facer from "../../assets/facer.png"

const RecipientInformation = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    apartment: '',
    street:'',
    city: '',
    state: '',
    postalCode: '',
    phoneNumber: '',
    email: '',
    saveAsDefault: false,
    deliveryNote: ''
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [billingExists, setBillingExists] = useState(false); // State to track if billing exists

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      fetchBillingInfo(storedUserId);
    }
  }, []);

  const fetchBillingInfo = async (userId) => {
    try {
      const response = await fetch(`https://wayuapi.wayumart.com/billing/${userId}`, {
        headers: {
          'x-access-token': localStorage.getItem('auth-token')
        }
      });

      if (response.ok) {
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          const { firstName, lastName, address, phone, email, saveAsDefault, orderNotes } = data[0];
          
          const formDataToUpdate = {
            firstName: firstName || '',
            lastName: lastName || '',
            apartment: address && address.apartment ? address.apartment : '',
            street: address && address.street ? address.street : '',
            city: address && address.city ? address.city : '',
            state: address && address.state ? address.state : '',
            postalCode: address && address.postalCode ? address.postalCode : '',
            phoneNumber: phone || '',
            email: email || '',
            saveAsDefault: saveAsDefault || false,
            deliveryNote: orderNotes || ''
          };

          setFormData(formDataToUpdate);
          setBillingExists(true); // Set billingExists to true if billing data exists
        } else {
          console.error('No billing information found for the user:', userId);
          setBillingExists(false); // Set billingExists to false if no billing data exists
          // Optionally handle error states or set default values for formData
        }
      } else {
        console.error('Failed to fetch billing information:', response.status);
        // Optionally handle error states or set default values for formData
      }
    } catch (error) {
      console.error('Error fetching billing information:', error);
      // Optionally handle error states or set default values for formData
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAction = async () => {
    if (billingExists) {
      await handleUpdate(); // If billing exists, execute update action
    } else {
      await handleCreate(); // If no billing exists, execute create action
    }
  };

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('https://wayuapi.wayumart.com/billing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify({
          user_id: localStorage.getItem('userId'),
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: {
            apartment: formData.apartment,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: 'USA' // Default country
          },
          phone: formData.phoneNumber,
          email: formData.email,
          saveAsDefault: formData.saveAsDefault,
          orderNotes: formData.deliveryNote
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Created billing information:', data); // Optionally handle success response
      setIsPopupOpen(false);
      setBillingExists(true); // Update billingExists state after successful create
    } catch (error) {
      console.error('Error saving billing information:', error);
      // Optionally handle error states or display error messages
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch(`https://wayuapi.wayumart.com/billing/${localStorage.getItem('userId')}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: {
            apartment: formData.apartment,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: 'USA' // Default country
          },
          phone: formData.phoneNumber,
          email: formData.email,
          saveAsDefault: formData.saveAsDefault,
          orderNotes: formData.deliveryNote
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Updated billing information:', data); // Optionally handle success response
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Error updating billing information:', error);
      // Optionally handle error states or display error messages
    }
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="ri-container">
      
      <h2>
        
        Recipient information</h2>
        
      <div className={`preview ${isPopupOpen ? 'preview-collapsed' : ''}`} onClick={() => setIsPopupOpen(true)}>
        <p><strong>Full Name:</strong></p> <input type="text" value={`${formData.firstName} ${formData.lastName}`} />
        <p><strong>Address:</strong></p><input type="text" value={`${formData.apartment}, ${formData.street}, ${formData.city}, ${formData.state} - ${formData.postalCode}`} />
        <p><strong>Phone Number:</strong></p><input type="text" value={formData.phoneNumber} />
        <p><strong>Email Address:</strong>,</p><input type="text" value={formData.email} />
      </div>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-content">
              <h2>Recipient information</h2>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Apartment/House No</label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Street</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="saveAsDefault"
                    checked={formData.saveAsDefault}
                    onChange={handleChange}
                  />
                  Save as default
                </label>
              </div>
              <div className="form-group delivery-note">
                <label>Delivery note</label>
                <textarea
                  name="deliveryNote"
                  value={formData.deliveryNote}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
              <div className="popup-buttons">
                {billingExists ? (
                  <button onClick={handleAction}>Update</button>
                ) : (
                  <button onClick={handleAction}>Create</button>
                )}
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipientInformation;
