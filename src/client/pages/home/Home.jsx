import Lottie from 'lottie-react';
import React, { useEffect } from 'react';
import * as calculator from '@services/calculator';
import animationData from '@assets/topset-coding.json';

export default function Home() {
  useEffect(() => {
    const add = async () => {
      const resp = await calculator.add();

      console.log(resp);
    };

    add();
  }, []);
  return (
    <div>
      <p className="pt-8 font-medium text-center text-2xl text-pink-600 underline underline-offset-1">Happy Coding</p>
      <Lottie animationData={animationData} loop />
    </div>
  );
}
