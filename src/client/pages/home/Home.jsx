import React from 'react';
import Lottie from 'lottie-react';
import animationData from '@assets/topset-coding.json';

export default function Home() {
  return (
    <div>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}
