import React from 'react';
import Typewritter from 'typewriter-effect';
const Jumbotron = ({ text }) => {
  return (
    <div className='jumbotron text-danger h1 font-wight-bold text-center'>
      <Typewritter
        options={{
          strings: text,
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
};

export default Jumbotron;
