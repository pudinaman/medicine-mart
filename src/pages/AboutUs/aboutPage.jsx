import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import AboutComponent from './AboutComponent'

const aboutPage = () => {
  return (
    <div>
        <Navbar/>
        <AboutComponent/>
        <Footer/>
    </div>
  )
}

export default aboutPage