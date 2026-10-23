import { NavLink, Link } from 'react-router-dom';
import type { NavItem } from '../types';

const navigationItems: NavItem[] = [
  { label: 'Inicio', path: '/' },
  { label: 'Sobre nosotros', path: '/nosotros' },
  { label: 'Juegos', path: '/quiz' },
  { label: 'Noticias', path: '/noticias' },
  { label: 'Contacto', path: '/contacto' },
  { label: 'Contaminantes', path: '/contaminantes' },
  { label: 'Login', path: '/login' },
];

export function Navbar() {
  return (
    <>
      <header className="site-banner">
        <h1>¡Cuidemos el Medio Ambiente!</h1>
      </header>

      <nav className="navbar navbar-expand-lg site-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/">
            <img
              src="/assets/WhatsApp Image 2024-05-11 at 21.04.47_fb79240a.jpg"
              alt="Logo EcoKids"
              width={34}
              height={28}
              className="d-inline-block align-text-top rounded"
            />
            <span>EcoKids</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Alternar navegación"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto align-items-lg-center gap-lg-2">
              {navigationItems.map((item) => (
                <li className="nav-item leaf-nav-item" key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active fw-bold text-success' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
