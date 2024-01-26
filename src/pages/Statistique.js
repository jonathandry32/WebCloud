import axios from "axios";
import React, { useEffect, useState } from "react";

function Statistique() {
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState([]);
    const [cat, setResult] = useState({
        idCategorie:"",
        nom:""
    });
    const [tableau, setTableau] = useState([]);
    
    const loadMarque = async () => {
        const result = await axios.get("http://localhost:8080/venteannonce/marques", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setTableau(result.data);
    }
    const loadBoite = async () => {
        const result = await axios.get("http://localhost:8080/venteannonce/boites", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setTableau(result.data);
    }
    const loadCarburant = async () => {
        const result = await axios.get("http://localhost:8080/venteannonce/carburants", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setTableau(result.data);
    }    
    

    useEffect(() => {
        loadFormData();
    }, []);
    
    useEffect(() => {
        if (cat.idCategorie) {
            loadCategorie(cat.idCategorie);
        }
    }, [cat.idCategorie]);

    const loadFormData = async () => {
        const result = await axios.get("http://localhost:8080/categories", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setFormData(result.data);
    }

    const loadCategorie = async (selectedCategoryId) => {
        try {
            const result = await axios.get(`http://localhost:8080/venteannonce/categories?idCategorie=${selectedCategoryId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTableau(result.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const onInputChange = (e) => {
        setResult({ ...cat, [e.target.name]: e.target.value });
    };

    const onClick = async (e) => {
        e.preventDefault();
        if (e.target.name === "marque"){
            loadMarque();
        }
        else if (e.target.name === "boite"){
            loadBoite();
        } 
        else if (e.target.name === "carburant"){
            loadCarburant();
        }
    };

    return (
        <div className="container">
            <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-6 d-flex flex-column align-items-center justify-content-center">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <br></br>
                                    <div className="row">
                                        <div className="col-3">
                                            <button type="button" name="marque" className="btn btn-primary btn-block" onClick={(e) => onClick(e)}>Marque</button>
                                        </div>
                                        <div className="col-3">
                                            <button type="button" name="carburant" className="btn btn-primary btn-block" onClick={(e) => onClick(e)}>Carburant</button>
                                        </div>
                                        <div className="col-2">
                                            <button type="button"  name="boite"className="btn btn-primary btn-block" onClick={(e) => onClick(e)}>Boite</button>
                                        </div>
                                        <form className="col-4">
                                            <div>
                                                <select className="form-select" aria-label="Default select example" name="idCategorie" onChange={(e) => onInputChange(e)}>
                                                    <option> categorie </option>
                                                    {
                                                        formData.map((m) => (
                                                            <option value={m.idCategorie}>{m.nom}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </form>
                                    </div>
                                    <br></br>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Nom</th>
                                                <th>Nombre de vente</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                tableau.map((t) => (
                                                    <tr>
                                                        <td>{t[0]}</td>
                                                        <td>{t[1]}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Statistique;
