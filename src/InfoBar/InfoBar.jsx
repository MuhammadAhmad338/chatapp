import React from 'react';
import { GrClose } from 'react-icons/gr';
import './InfoBar.css';

const InfoBar = () => {
  return (
    <div className='infoBar'>
        <div className='leftInnerContainer'>
           <GrClose />
           <h3>RoomName</h3>
        </div>
        <div className='rightInnerContainer'>
             <a href="/"><GrClose /></a>
        </div>
    </div>
  );
}

export default InfoBar;