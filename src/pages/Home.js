//import './../assets/css/annonce.css'
import React from 'react';
import logo from '../assets/img/omby.png';

function Home() {
    const handleLikeClick = (liked) => {
      if (liked) {
        console.log('Liked!');
      } else {
        console.log('Unliked!');
      }
    };
    return (
        <>
    <div class="container">
    </div>
    </>
    );
}

export default Home;