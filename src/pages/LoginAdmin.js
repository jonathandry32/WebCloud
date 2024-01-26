import React, { useState } from 'react';
import axios from "axios";
import logo from '../assets/img/omby.png';
import { useNavigate } from 'react-router-dom';

// import '../assets/vendor/bootstrap/css/bootstrap.min.css'
// import '../assets/vendor/bootstrap-icons/bootstrap-icons.css'
// import '../assets/vendor/boxicons/css/boxicons.min.css'
// import '../assets/vendor/quill/quill.snow.css'
// import '../assets/vendor/quill/quill.bubble.css'
// import '../assets/vendor/remixicon/remixicon.css'
// import '../assets/vendor/simple-datatables/style.css'
// import '../assets/css/style.css'

function LoginAdmin() {

    let navigate = useNavigate();

    const [formData, setFormData] = useState({
      mail: "admin@gmail.com",
      password: "admin"
    });

    const [error, setError] = useState(null);

    const onInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
      e.preventDefault();
      try {
          const params = new URLSearchParams();
          params.append("mail", formData.mail);
          params.append("password", formData.password);
          const result = await axios.post("http://localhost:8080/auth/login", params);
          localStorage.setItem('token', result.data.token);
          if(result.data.userId.nom=="Admin"){
            localStorage.setItem('admin', "True");
          }
          localStorage.setItem('user', JSON.stringify(result.data.userId));
          navigate("/");
          window.location.reload();
      } catch (error) {
          setError("Veuillez verifier vos informations");
      }
    };
    return (
        <div class="container">
        <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                <div class="d-flex justify-content-center py-4">
                  <a href="index.html" class="logo d-flex align-items-center w-auto">
                    <img src={logo} alt=""/>
                    <span class="d-none d-lg-block">Ombaika mitady</span>
                  </a>
                </div>

                <div class="card mb-3">

                  <div class="card-body">

                    <div class="pt-4 pb-2">
                      <h5 class="card-title text-center pb-0 fs-4">Se connecter en tant qu'ADMIN</h5>
                      <p class="text-center small">Vous devez vous connecter avant d'accéder à la page</p>
                    </div>

                    <form class="row g-3 needs-validation" action="Login" method="post" onSubmit={(e) => onSubmit(e)} novalidate>

                      <div class="col-12">
                        <label for="yourUsername" class="form-label">Email</label>
                        <div class="input-group has-validation">
                          <span class="input-group-text" id="inputGroupPrepend">@</span>
                          <input type="text" name="mail" class="form-control" id="yourUsername" value={formData.mail} onChange={(e) => onInputChange(e)} required/>
                          <div class="invalid-feedback">Please enter your Email.</div>
                        </div>
                      </div>

                      <div class="col-12">
                        <label for="yourPassword" class="form-label">Password</label>
                        <input type="password" name="password" class="form-control" id="yourPassword" value={formData.password} onChange={(e) => onInputChange(e)} required/>
                        <div class="invalid-feedback">Please enter your password!</div>
                      </div>
                        
                      <div class="col-12">
                        <button class="btn btn-primary w-100" type="submit">Login</button>
                      </div>
                    </form>
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}

                  </div>
                </div>

              </div>
            </div>
          </div>

        </section>

      </div>
    );
}

export default LoginAdmin;