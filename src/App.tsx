import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Inicio } from './pages/Inicio';
import { Nosotros } from './pages/Nosotros';
import { Contaminantes } from './pages/Contaminantes';
import { Aire } from './pages/Aire';
import { Ropa } from './pages/Ropa';
import { Plastico } from './pages/Plastico';
import { Quiz } from './pages/Quiz';
import { Noticias } from './pages/Noticias';
import { Contacto } from './pages/Contacto';
import { Login } from './pages/Login';
import { Registro } from './pages/Registro';

export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contaminantes" element={<Contaminantes />} />
        <Route path="/aire" element={<Aire />} />
        <Route path="/ropa" element={<Ropa />} />
        <Route path="/plastico" element={<Plastico />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/juegos" element={<Navigate to="/quiz" replace />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
