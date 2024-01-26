import './App.css';
import './assets/vendor/bootstrap/css/bootstrap.min.css'
import './assets/vendor/bootstrap-icons/bootstrap-icons.css'
import './assets/vendor/boxicons/css/boxicons.min.css'
import './assets/vendor/quill/quill.snow.css'
import './assets/vendor/quill/quill.bubble.css'
import './assets/vendor/remixicon/remixicon.css'
import './assets/vendor/simple-datatables/style.css'
import './assets/css/style.css'
import Header from './layout/Header';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VendorScripts from './layout/VendorScript';
import InsertCategorie from './pages/InsertCategorie';
import InsertMarque from './pages/InsertMarque';
import InsertCarburant from './pages/InsertCarburant';
import InsertModele from './pages/InsertModele';
import Commission from './pages/Commission';
import Statistique from './pages/Statistique';
import Login from './pages/Login';
import LoginAdmin from './pages/LoginAdmin';
import Deconnexion from './pages/Deconnexion';
import ValidationAnnonce from './pages/ValidationAnnonce';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/insertCategorie" element={<InsertCategorie />} />
          <Route exact path="/insertMarque" element={<InsertMarque />} />
          <Route exact path="/insertCarburant" element={<InsertCarburant />} />
          <Route exact path="/insertModele" element={<InsertModele />} />
          <Route exact path="/commission" element={<Commission />} />
          <Route exact path="/statistique" element={<Statistique />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/loginAdmin" element={<LoginAdmin />} />
          <Route exact path="/deconnexion" element={<Deconnexion />} />
          <Route exact path="/validationannonce" element={<ValidationAnnonce />} />
        </Routes>
      </Router>
      <VendorScripts/>
    </div>
  );
}

export default App;
