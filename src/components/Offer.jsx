import React from 'react'
import HeroImage from '../assets/images/hero.png';

const Offer = () => {


  return (
    <div className="w-[9rem] h-[9rem] rounded-tl-50 rounded-tr-10 rounded-br-50 rounded-bl-10"
    style={{
        backgroundImage: `url(${HeroImage})`,
        // opacity: 0.7
      }}>
     Offer
    </div>
  )
}

export default Offer;