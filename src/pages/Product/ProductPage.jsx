import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import MainProduct from './MainProduct';
import RelatedProducts from './RelatedProduct';
import HorizontalMenu from './HorizintalMenu';
import BenefitsSection from './BenifitsSection';
import Ingredients from './Ingredients';
import VideoButton from './VideoButton';
import FAQAccordion from './FAQAccordian';
import Footer from '../Footer';
import Reviews from './ReviewsData';

const ProductPage = () => {
  const location = useLocation();
  const { product } = location.state || {};

  console.log('Product in ProductPage:', product); // Debug log to check the product object

  if (!product) {
    return <p>Product details not found.</p>;
  }

  return (
    <div>
      <Navbar />
      <MainProduct product={product} />
      <RelatedProducts category={product.category} />
      <HorizontalMenu />
      <section id='benefits'>
      <BenefitsSection benefits={product} />
      </section>
      <section id='ingredients'>
      <Ingredients ingredients={product.ingredients} />
      </section>
      <section id='how-to-use'>
      <VideoButton videoUrl={product} />
      </section>
      <section id='reviews'>
      <Reviews productId={product._id} reviews={product.reviews}/>
      </section>
      <section id='faqs'>
      <FAQAccordion faqs={product.faq} />
      </section>
      <Footer />
    </div>
  );
};

export default ProductPage;
