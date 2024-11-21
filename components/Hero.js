import React from 'react';
import {Fugaz_One} from 'next/font/google';
import Button from './Button';
import Calendar from './Calendar';

const fugaz  = Fugaz_One({subsets: ["latin"], weight:['400'] });
export default function Hero() {
  return (
    <div className='py-4 md:py-10 flex flex-col gap-4 sm:gap-8'>
      <h1 className={'text-5xl sm:text-6xl md:text-7xl text-center ' + fugaz.className}>
      <span className='textGradient'>HerLuna</span>
      <span > Track Your <span className='textGradient'>Flow</span>, Take Control</span></h1>
      <p className='text-lg sm:text-lg md:text-2xl text-center w-full '>Create your flow record and see how you feel on <span className='font-semibold'>every month of every year</span></p>
      <div className='grid grid-cols-2 gap-4 w-fit mx-auto '>
        <Button text="Sign Up" />
        <Button text="Log In" dark/>
      </div>
      <Calendar />
    </div>
  )
}
