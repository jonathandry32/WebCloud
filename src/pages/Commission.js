import axios from "axios";
import React, { useEffect, useState } from "react";

function Commission() {
    const token = localStorage.getItem('token');
    const [commission,setCommission]=useState([]);
    const [caisse,setCaisse]=useState([]);
    useEffect(()=>{
        loadCommission();
        loadCaisse();
    },[]);
    const loadCommission =async ()=>{
        const result=await axios.get("http://localhost:8080/commissions", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setCommission(result.data);
    }
    const loadCaisse =async ()=>{
        const result=await axios.get("http://localhost:8080/venteannonce/commission", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setCaisse(result.data);
    }

    const [formData, setFormData] = useState({
        id_commission:1,
        valeur: ""
      });
    

    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const onSubmit = async (e) => {
        e.preventDefault();
    
        try {
            await axios.put("http://localhost:8080/commissions/1", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            loadCommission();
        } catch (error) {
            console.error("Error updating commission:", error);
        }
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
                        <h5 class="card-title text-center pb-0 fs-4">Concernant la commission</h5>
                        </div>

                        <div class="row mb-12">
                            <label class="col-sm-8 col-form-label">Commission : 
                            {
                                commission.map((c)=>(
                                    <span>{c.valeur}</span>
                                ))
                            }
                             %</label>
                            <div class="col-sm-3">
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#basicModal"><i class="bi bi-pencil-square"></i></button>

                            <div class="modal fade" id="basicModal" tabindex="-1">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Modifier commission: valeur</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                    <form class="row g-3 needs-validation" onSubmit={(e) => onSubmit(e)} novalidate> 
                                        <div class="modal-body">
                                                <div class="col-sm-7 input-group has-validation">
                                                    <input type="number" class="form-control" name="valeur" value={formData.valeur} onChange={(e) => onInputChange(e)} required/>
                                                    <div class="invalid-feedback">Entrer la valeur</div>
                                                </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">Fermer</button>
                                                <button type="submit" class="btn btn-primary"
                                                data-bs-dismiss="modal">Valider</button>
                                        </div>
                                    </form>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="pt-4 pb-3">
                            {
                                caisse.map((c)=>(
                                    <h5 class="card-title text-center pb-0 fs-4">Valeur de caisse : 
                                    {c} 
                                    Ariary</h5>
                                ))
                            }
                        </div>
                </div>

                    </div>
                    </div>
        
                </div>
            </div>
            </div>
        
            </section>
    
      </div>
    );
}

export default Commission;