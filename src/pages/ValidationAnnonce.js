import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function ValidationAnnonce() {
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [annoncesNonValide, setAnnoncesNonValide] = useState([]);
  const [commissionValue, setCommissionValue] = useState(0);

  useEffect(() => {
    loadCommission();
    loadAnnonceNonValide();
  }, []);

  const loadCommission = async () => {
    const result = await axios.get("http://localhost:8080/commissions/1", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCommissionValue(result.data);
  };

  const loadAnnonceNonValide = async () => {
    const result = await axios.get("http://localhost:8080/annonces/nonvalide", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setAnnoncesNonValide(result.data);
  };

  const handleValidation = async (idAnnonce) => {
    const url = `http://localhost:8080/annonces/validate?idAnnonce=${idAnnonce}&commission=${commissionValue.valeur}`;
    await axios.put(url, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigate("/validationannonce");
    window.location.reload();
  };
  

  return (
    <>
      <section className="section">
        <div className="container">
          <div
            className="row justify-content-center"
            style={{ backgroundColor: "whitesmoke", borderColor: "whitesmoke" }}
          >
            <div className="col-lg-8" style={{ marginTop: "100px" }}>
              <div className="card mb-3">
                <div className="card-body">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Proprietaire</th>
                          <th>Vehicule</th>
                          <th>Prix</th>
                          <th>Commission</th>
                          <th>Valider</th>
                        </tr>
                      </thead>
                      <tbody>
                        {annoncesNonValide.map((annonce) => (
                          <tr key={annonce.idAnnonce}>
                            <td>{annonce.idAnnonce}</td>
                            <td>{annonce.proprietaire.nom}</td>
                            <td>{annonce.modele.marque.nom} {annonce.modele.nom}</td>
                            <td>{annonce.prix.toLocaleString('en-US')} Ariary</td>
                            <td>
                              <input
                                className="text-end"
                                style={{
                                  border: "1px solid #ccc",
                                  padding: "8px",
                                  borderRadius: "4px",
                                  width: "50%",
                                  boxSizing: "border-box",
                                }}
                                type="text"
                                value={commissionValue.valeur}
                                onChange={(e) => setCommissionValue({ valeur: e.target.value })}
                              />{' '}
                              %
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => handleValidation(annonce.idAnnonce)}
                              >
                                Valider
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ValidationAnnonce;

