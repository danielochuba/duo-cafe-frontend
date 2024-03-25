import React from 'react';
import YellowCup from '../assets/images/yellow_cup.png';
import cart from './../assets/images/cart.png';

function Coffee() {
  return (
    <div>
        <img src={YellowCup} alt="" />
        <div className="text-center">
            <h1 className="text-2xl font-bold">Coffee</h1>
            <p className="text-center">a place where the rich aroma of freshly brewed coffee mingles with the soothing ambiance of comfort.</p>
        </div>
        <div className="text-center">
            <span className="text-2xl font-bold">Offers</span>
            <span className="text-2xl font-bold rounded-sm bg-[#4A2C21]"><img src={cart} alt="Add to cart" /></span>
        </div>
    </div>
  )
}

export default Coffee;
