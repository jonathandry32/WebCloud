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
        <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="row ">
            <div class="col-lg-12 col-md-12">
            <div class="card mb-12">
            <div class="card-body">
                <br></br>
            <div class="grid-container">
                <div class="car-card">
                    <div class="car-owner">
                        <img class="owner-avatar" src={logo} alt="Avatar" />
                        <div class="owner-info">
                            <p class="owner-name">Jonapiso</p>
                            <p class="owner-timestamp">17/01/2024 12:30 PM</p>
                        </div>
                    </div>
                    <img class="car-image" src={logo} alt="Voiture 1" />
                    <div class="car-details">
                        <h2>Subaru STI WRX</h2>
                        <p>La Subaru WRX STI est réputée pour ses performances sportives</p>
                        <br></br>
                        <b>Prix: 75.000.000 MGA</b>
                    </div>
                    <div class="car-actions">
                        <div className="d-flex align-items-center">
                            <button style={{ marginBottom: '-5px'}}>
                                <i className="bi bi-heart h2"></i>
                            </button>
                            <button style={{ marginBottom: '-5px'}}>
                                <i className="bi bi-heart h2"></i>
                            </button>
                            <button>
                                <i className="bi bi-chat h2"></i>
                            </button>
                        </div>
                        <button class="details-button">Détails</button>
                    </div>
                </div>
                
            </div>
            </div>
            </div>
            </div>
            </div>
        </section>
    </div>
    </>
    );
}

export default Home;