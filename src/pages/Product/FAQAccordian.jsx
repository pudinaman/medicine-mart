import React, { useState } from 'react';
import './CSS/FAQAccordian.css';

const FAQAccordian = ({ faqs }) => {
  const [selected, setSelected] = useState(null);

  const toggle = (index) => {
    setSelected(selected === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>FAQs</h2>
      <div className="faq-columns">
        {faqs.map((faq, index) => (
          <div
            className={`faq-item ${selected === index ? 'active' : ''}`}
            key={faq._id}
            onClick={() => toggle(index)}
          >
            <div className="faq-question">
              {faq.question}
              <span className="faq-icon">{selected === index ? '▼' : '▶'}</span>
            </div>
            <div className={`faq-answer ${selected === index ? 'show' : ''}`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordian;
