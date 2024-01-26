import React from 'react';
import logo from '../assets/img/omby.png';
import { Link } from "react-router-dom";

export default function Header() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const admin = localStorage.getItem('admin');
    const userId = JSON.parse(user);
    return (
        <div>
        <header id="header" className="header fixed-top d-flex align-items-center">

            <div className="d-flex align-items-center justify-content-between">
                <a href="#" className="logo d-flex align-items-center">
                    <img src={logo} alt=""/>
                    <span className="d-none d-lg-block">
                        <h4 style={{marginLeft: '10px', paddingTop: '10px'}}>Ombaika mitady</h4>
                    </span>
                </a>
                <i className="bi bi-list toggle-sidebar-btn"></i>
            </div>

           <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">

                    <li className="nav-item d-block d-lg-none">
                        <a className="nav-link nav-icon search-bar-toggle " href="#">
                            <i className="bi bi-search"></i>
                        </a>
                    </li>



                    <li className="nav-item dropdown pe-3">

                        <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#"
                            data-bs-toggle="dropdown">
                            <img src={logo} alt="Profil"
                                className="rounded-circle"/>
                            <span className="d-none d-md-block dropdown-toggle ps-2">
                            </span>
                        </a>

                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li className="dropdown-header">
                                <span>Connection</span>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            {user ? (
                            <li>
                                <a className="dropdown-item d-flex align-items-center" href="/deconnexion">
                                    <i className="bi bi-box-arrow-in-right"></i>
                                    <span>Deconnexion</span>
                                </a>
                            </li>
                            ) : (
                            <li className="nav-item">
                                <a className="dropdown-item d-flex align-items-center" href="/loginAdmin">
                                    <i class="bi bi-box-arrow-in-left"></i>
                                    <span>Se connecter en tant qu'Admin</span>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="/login">
                                    <i class="bi bi-box-arrow-in-left"></i>
                                    <span>Se connecter</span>
                                </a>
                            </li>
                            )}
                        </ul>
                    </li>

                </ul>
            </nav>

        </header>

        <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">

                <li className="nav-item">
                    <a className="nav-link collapsed" href="/">
                        <i className="bi bi-house"></i>
                        <span>Accueil</span>
                    </a>
                </li>
                
                {admin ? (
                <>
                    <li className="nav-item">
                    <a className="nav-link collapsed" href="/commission">
                        <i className="bi bi-calculator"></i><span>Commission</span>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link collapsed" href="/validationannonce">
                        <i className="bi bi-check"></i><span>Validation Annonce</span>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link collapsed" href="/statistique">
                        <i className="bi bi-bar-chart-line"></i><span>Statistique</span>
                    </a>
                    </li>
                    <li className="nav-heading">Creation simple</li>
                    <li className="nav-item">
                    <a className="nav-link collapsed" href="/insertCategorie">
                        <i className="bi bi-person-plus"></i><span>Ajout categorie</span>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link collapsed" href="/insertMarque">
                        <i className="bi bi-person-plus"></i><span>Ajout marque</span>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link collapsed" href="/insertCarburant">
                        <i className="bi bi-person-plus"></i><span>Ajout carburant</span>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link collapsed" href="/insertModele">
                        <i className="bi bi-person-plus"></i><span>Ajout modele</span>
                    </a>
                    </li>
                </>
                ) : (
                <li className="nav-item">
                    <span className="nav-link">Veuillez vous connecter en tant qu'admin</span>
                </li>
                )}
            </ul>

        </aside>


        </div>
    );
}