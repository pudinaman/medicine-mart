import React from 'react';
import './CSS/Ingredients.css'; // Make sure to create a corresponding CSS file for styling
import ing1 from '../../assets/ing1.png';
import ing2 from '../../assets/ing2.png';
import ing3 from '../../assets/ing3.png';
const Ingredients = () => {
  return (
    <div className="ingredients-container">
      <h2>Ingredients</h2>
      <div className="ingredient-columns">
        <div className="ingredient">
          <img src={ing1} alt="Hyaluronic acid" />
          <h3>Hyaluronic acid</h3>
          <p>Elit do sit excepteur duis labore nisi sit anim...</p>
        </div>
        <div className="ingredient">
          <img src={ing2} alt="Green tea" />
          <h3>Green tea</h3>
          <p>Tempor adipisicing aute pariatur magna enim...</p>
        </div>
        <div className="ingredient">
          <img src={ing3} alt="Olive oil" />
          <h3>Olive oil</h3>
          <p>Cupidatat culpa id do laboris nisi aliqua eu...</p>
        </div>
      </div>
      <button className='see-full-list'>See full list</button>
    </div>
  );
};

export default Ingredients;
