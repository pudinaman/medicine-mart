import React from 'react';
import Header from './Header';
import Products from './Product';
import EventPromotion from './EventPromotion';
import Story from './Story';
import News from './News';
import Footer from './Footer';
import Navbar from './Navbar';

const HomePage = () => {
  return (
    <div className="HomePage">
      <Navbar/>
      <section id="header">
        <Header />
      </section>
      <section id="products">
        <Products />
      </section>
      <section id="event-promotion">
        <EventPromotion />
      </section>
      <section id="story">
        <Story />
      </section>
      <section id="news">
        <News />
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
