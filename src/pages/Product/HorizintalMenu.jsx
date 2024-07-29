import React from 'react';
import './CSS/HorizontalMenu.css'; // Make sure to create this CSS file
import AnchorLink from 'react-anchor-link-smooth-scroll';

const HorizontalMenu = () => {
  return (
    <nav className="horizontal-menu">
      <ul>
      <AnchorLink href="#benefits"><button><li>Benefits</li></button></AnchorLink>
      <AnchorLink href="#ingredients"><li><button>Ingredients</button></li></AnchorLink>
      <AnchorLink href="#how-to-use"><li><button>How to use</button></li></AnchorLink>
      <AnchorLink href="#reviews"><li><button>Reviews</button></li></AnchorLink>
      <AnchorLink href="#faqs"><li><button>FAQs</button></li></AnchorLink>
      </ul>
    </nav>
  );
};

export default HorizontalMenu;
