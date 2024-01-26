import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function InsertCarburant() {
    const token = localStorage.getItem('token');
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        nom: "",
      });
    

    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
    const onSubmit = async (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.append("nom", formData.nom);
        await axios.post("http://localhost:8080/carburant", params, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(formData.nom);
        navigate("/");
      };

    return (
        <div class="container">

            <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div class="container">
                <div class="row justify-content-center">
                <div class="col-lg-6 col-md-6 d-flex flex-column align-items-center justify-content-center">

                    <div class="card mb-3">

                    <div class="card-body">

                        <div class="pt-4 pb-3">
                        <h5 class="card-title text-center pb-0 fs-4">Ajout carburant</h5>
                        <p class="text-center small">Entrez les informations concerant le carburant.
                        </p>
                        </div>

                        <form class="row g-3 needs-validation" onSubmit={(e) => onSubmit(e)} novalidate>
                        
                        <div class="row mb-3">
                            <label for="inputText" class="col-sm-3 col-form-label">Nom</label>
                            <div class="col-sm-9 input-group has-validation">
                            <input type="text" class="form-control" name="nom" value={formData.nom} onChange={(e) => onInputChange(e)} required/>
                            <div class="invalid-feedback">Entrer le nom</div>
                            </div>
                        </div>

                        <div class="col-6">
                        <button class="btn btn-secondary w-100" type="reset">Annuler</button>
                        </div>

                        <div class="col-6">
                        <button class="btn btn-primary w-100 " type="submit">Save</button>
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

export default InsertCarburant;