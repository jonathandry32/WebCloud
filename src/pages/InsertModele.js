import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function InsertModele() {
    const token = localStorage.getItem('token');
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        idMarque: "",
        nom: "",
        idCategories: [], // Ajout d'un tableau pour stocker les catégories sélectionnées
        idCarburants: [] // Ajout d'un tableau pour stocker les carburants sélectionnés
      });

    const [marques,setMarque]=useState([]);
    useEffect(()=>{
        loadMarque();
        loadCategorie();
        loadCarburant();
    },[]);

    const loadMarque =async ()=>{
        const result=await axios.get("http://localhost:8080/marques", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setMarque(result.data);
    }

    const [categorie,setCategorie]=useState([]);

    const loadCategorie =async ()=>{
        const result=await axios.get("http://localhost:8080/categories", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setCategorie(result.data);
    }

    const [carburant,setCarburant]=useState([]);

    const loadCarburant =async ()=>{
        const result=await axios.get("http://localhost:8080/carburants", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setCarburant(result.data);
    }
    

    const onInputChange = (e) => {
        if (e.target.type === "checkbox") {
            if (e.target.name === "idCategories") {
                const categoryID = e.target.value;
                setFormData((prevData) => ({
                    ...prevData,
                    idCategories: e.target.checked
                        ? [...prevData.idCategories, categoryID]
                        : prevData.idCategories.filter(category => category !== categoryID)
                }));
                
            } 
            if (e.target.name === "idCarburants") {
                const carburantID = e.target.value;
                setFormData((prevData) => ({
                    ...prevData,
                    idCarburants: e.target.checked
                        ? [...prevData.idCarburants, carburantID]
                        : prevData.idCarburants.filter(carb => carb !== carburantID)
                }));
            }
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
        
    };
    
      
    
    const onSubmit = async (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.append("idMarque", formData.idMarque);
        params.append("nom", formData.nom);
        params.append("idCategories", formData.idCategories);
        params.append("idCarburants", formData.idCarburants);
        await axios.post("http://localhost:8080/modeles", params, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        navigate("/");
      };

    return (
        <div className="container">

            <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-lg-6 col-md-6 d-flex flex-column align-items-center justify-content-center">

                    <div className="card mb-3">

                    <div className="card-body">

                        <div className="pt-4 pb-3">
                        <h5 className="card-title text-center pb-0 fs-4">Ajout Modele</h5>
                        <p className="text-center small">Entrez les informations concerant le modele.
                        </p>
                        </div>

                        <form className="row g-3 needs-validation" onSubmit={(e) => onSubmit(e)} novalidate>
                            
                            <div className="row mb-3">
                                <label for="inputText" className="col-sm-3 col-form-label">Marque</label>
                                <div className="col-sm-9 input-group">
                                <select className="form-select" aria-label="Default select example" name="idMarque" onChange={(e) => onInputChange(e)}>
                                        <option> choisir...</option>
                                        {
                                            marques.map((m)=>(
                                                <option value={m.idMarque}>{m.nom}</option>
                                            ))
                                        }
                                </select>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label for="inputText" className="col-sm-3 col-form-label">Nom</label>
                                <div className="col-sm-9 input-group has-validation">
                                <input type="text" className="form-control" name="nom" value={formData.nom} onChange={(e) => onInputChange(e)} required/>
                                <div className="invalid-feedback">Entrer le nom</div>
                                </div>
                            </div>

                            <div className="col-12">
                                <button type="button" data-bs-toggle="modal" data-bs-target="#basicModal"
                                        className="btn btn-success rounded-pill w-100 mb-3"><i className="bi bi-plus-circle-fill"></i>
                                    Catégorie
                                </button>
                            </div>

                            
                            <div class="modal fade" id="basicModal" tabindex="-1">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Liste des catégories</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                        <table class="table">
                                            <thead>
                                            <tr>
                                                <th scope="col">id</th>
                                                <th scope="col">Nom</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {categorie.map((category,index) => (
                                                <tr>
                                                    <td>
                                                    <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="gridCheck1"
                                                    name="idCategories"
                                                    value={category.idCategorie} 
                                                    onChange={(e) => onInputChange(e)}
                                                    />
                                                    </td>
                                                    <td>{category.nom}</td> 
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">Fermer</button>
                                                <button type="button" class="btn btn-primary"
                                                data-bs-dismiss="modal">Valider</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <button type="button" data-bs-toggle="modal" data-bs-target="#basicModal2"
                                        className="btn btn-success rounded-pill w-100 mb-3"><i className="bi bi-plus-circle-fill"></i>
                                    carburant
                                </button>
                            </div>

                            <div class="modal fade" id="basicModal2" tabindex="-1">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Liste des carburants</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                        <table class="table">
                                            <thead>
                                            <tr>
                                                <th scope="col">id</th>
                                                <th scope="col">Nom</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {carburant.map((car,index) => (
                                                <tr>
                                                    <td>
                                                        <input
                                                        class="form-check-input"
                                                        type="checkbox"
                                                        id="gridCheck1"
                                                        name="idCarburants"
                                                        value={car.idCarburant} 
                                                        onChange={(e) => onInputChange(e)}
                                                        />
                                                    </td>
                                                    <td>{car.nom}</td> 
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">Fermer</button>
                                                <button type="button" class="btn btn-primary"
                                                data-bs-dismiss="modal">Valider</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-6">
                            <button className="btn btn-secondary w-100" type="reset">Annuler</button>
                            </div>

                            <div className="col-6">
                            <button className="btn btn-primary w-100 " type="submit">Save</button>
                            </div>
                        </form>

                    </div>
                    </div>

                </div>
                </div>
            </div>

            </section>

        </div>
    );
}

export default InsertModele;