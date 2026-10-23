import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-links-row">
          <div>
            <strong>Fundación EcoKids</strong>
            <p className="mb-1">Corazón Verde, 66360 Monterrey, N.L.</p>
            <p className="mb-0">Salud Ambiental en la Escuela</p>
          </div>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <Link to="/nosotros">Quiénes somos</Link>
            <Link to="/contaminantes">Contaminantes</Link>
            <Link to="/aire">Calidad del Aire</Link>
            <Link to="/quiz">Juegos y Quiz</Link>
            <Link to="/contacto">Contacto</Link>
          </div>
        </div>
        <hr className="border-secondary my-3" />
        <p className="mb-0 text-center">
          Derechos de autor © {new Date().getFullYear()} Cuidemos el Medio Ambiente - EcoKids. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
