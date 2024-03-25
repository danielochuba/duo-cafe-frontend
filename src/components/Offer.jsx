import React from 'react'
import HeroImage from '../assets/images/hero.png';

const Offer = () => {

  return (

    <div className="ml-5 mr-5 w-[120px] h-[9rem] rounded-tl-[50px] rounded-tr-[10px] rounded-br-[50px] rounded-bl-[10px]"
    style={{
        backgroundImage: `url(${HeroImage})`,
        // opacity: 0.7
      }}>

     Offer
     
    </div>

  )

}

export default Offer;
