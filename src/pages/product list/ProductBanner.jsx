import React from 'react'

import { Helmet } from 'react-helmet'

import './CSS/ProductBanner.css'
import heart from '../../assets/heart.png'
import star from '../../assets/star.png'

const ProductBanner = (props) => {
  return (
    <div className="container3-container">
      <Helmet>
        <title>exported project</title>
      </Helmet>
      <div className="container3-container3">
        <button className="container3-button1">
          <span className="container3-text">
            <span>Shop now!</span>
          </span>
        </button>
        <span className="container3-text02">
          <span className="container3-text03">The Best Place To</span>
          <br></br>
          <span className="container3-text05">Find And Buy</span>
          <br></br>
          <span className="container3-text07">
            Amazing
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </span>
          <span className="container3-text08">
            Product
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </span>
        </span>
        <span className="container3-text09">
          <span>Absolutely hot collections 🔥</span>
        </span>
        <div className="container3-group1">
          <div className="container3-container4"></div>
          <div className="container3-container5">
            <img
              src="/external/image15188-jzg-300h.png"
              alt="Image15188"
              className="container3-image15"
            />
            <span className="container3-text11">
              <span>$330</span>
            </span>
          </div>
          <div className="container3-container6">
            <img
              src={heart}
              alt="Favorite1191"
              className="container3-favorite1"
            />
          </div>
          <div className="container3-container7">
            <div className="container3-rating1">
              <img
                src={star}
                alt="Frame195"
                className="container3-frame"
              />
              <img
                src={star}
                alt="Frame198"
                className="container3-frame1"
              />
              <img
                src={star}
                alt="Frame1101"
                className="container3-frame2"
              />
              <img
                src={star}
                alt="Frame1104"
                className="container3-frame3"
              />
              <img
                src={star}
                alt="Frame1107"
                className="container3-frame4"
              />
            </div>
          </div>
          <div className="container3-container8">
            <span className="container3-text13">
              <span>Product name</span>
            </span>
            <span className="container3-text15">
              <span>$123</span>
            </span>
            <img
              src="/external/image161113-vl5iu-300w.png"
              alt="Image161113"
              className="container3-image16"
            />
          </div>
          <div className="container3-container9">
            <img
              src="/external/image171115-2po-500w.png"
              alt="Image171115"
              className="container3-image17"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductBanner
