import React, { useEffect, useState } from 'react';
import './CSS/AboutComponent.css'; // Import your CSS file for component styling
import hero_1 from "../../assets/medbg.jpg"
import loading from '../../assets/loading.jpg'
const AboutComponent = () => {
  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('https://wayuapi.wayumart.com/api/about/get');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched about data:', data);
        setAboutData(data[0].about.map(item => ({ ...item, isOpen: false }))); // Initialize isOpen for each item
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    };

    fetchAboutData();
  }, []);

  const toggleDescription = (index) => {
    setAboutData(prevAboutData =>
      prevAboutData.map((item, i) => ({
        ...item,
        isOpen: i === index ? !item.isOpen : item.isOpen  // Toggle isOpen for clicked item
      }))
    );
  };

  useEffect(() => {
    console.log('Updated aboutData:', aboutData);
  }, [aboutData]);

  return (
    <div>
      <img src={hero_1} alt="" className='abt-img'/>
      <h1 className='hero-text'>About Us</h1>
      <p className='hero-text2'>Wayu Medicare IndiaPvt. Ltd. is one of the largest growing Ayurvedic pharmaceutical company, Headquartered at Delhi, in the state of Delhi.</p>
    <div className="about-container">
      {aboutData.length > 0 ? (
        <div className="about-list">
          {aboutData.map((item, index) => (
            <div className="about-item" key={item._id}>
              <div className="about-title" onClick={() => toggleDescription(index)}>
                <h3>{item.title}</h3>
                <span className={`ab-dropdown-icon ${item.isOpen ? 'open' : ''}`}></span>
              </div>
              <div className={`about-description ${item.isOpen ? 'open' : ''}`}>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <img src={loading} alt="" className='abt-load'/>
      )}
    </div>
    </div>
  );
};

export default AboutComponent;
