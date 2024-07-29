import React from 'react';
import './CSS/BenifitsSection.css'; // Make sure to create this CSS file

const BenefitsSection = ({benefits }) => {
  console.log('Product in BenefitsSection:', benefits); // Debug log to check the product object

  const { description_details } = benefits || {};

  if (!description_details) {
    return <p>No benefits details available.</p>;
  }

  return (
    <section className="benefits-section">
      <div className="benefits-content">
        <h2>Benefits</h2>
        {description_details.key_features_details.map((feature) => (
          <div key={feature._id}>
            <h3>{feature.point}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
      <div className="benefits-image">
        <img src={benefits.product_image[0]} alt="Benefits" />
      </div>
    </section>
  );
};

export default BenefitsSection;
