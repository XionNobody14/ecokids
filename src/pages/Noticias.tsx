import { SectionHeader } from '../components/SectionHeader';
import type { ExternalResource } from '../types';

const resources: ExternalResource[] = [
  { title: 'Fundación Vivo Sano', url: 'https://www.vivosano.org/', language: 'es' },
  { title: 'Hogares sin tóxicos', url: 'https://www.hogarsintoxicos.org/es/', language: 'es' },
  { title: 'Asociación de Educación Ambiental', url: 'https://ae-ea.es/', language: 'es' },
  {
    title: 'Instituto para la Salud Geoambiental',
    url: 'https://www.saludgeoambiental.org/',
    language: 'es',
  },
  {
    title: 'Fondo Defensa de la Salud Ambiental',
    url: 'https://www.fondosaludambiental.org/',
    language: 'es',
  },
  { title: 'Fundación Alborada', url: 'https://www.fundacion-alborada.org/', language: 'es' },
  {
    title: 'Contaminantes Ambientales',
    url: 'https://contaminantesambientales.com/',
    language: 'es',
  },
  {
    title: 'Libres de contaminantes endocrinos',
    url: 'https://futurosintoxicos.org/',
    language: 'es',
  },
  {
    title: 'El plato para Comer Saludable (Harvard)',
    url: 'https://nutritionsource.hsph.harvard.edu/healthy-eating-plate/translations/spanish/',
    language: 'es',
  },
  { title: 'Healthy Child, Healthy World', url: 'https://healthychild.org/', language: 'en' },
  { title: 'Environmental Working Group (EWG)', url: 'https://www.ewg.org/', language: 'en' },
  {
    title: "Canadian Partnership for Children's Health & Environment",
    url: 'https://www.healthyenvironmentforkids.ca/',
    language: 'en',
  },
  {
    title: 'National Institute of Environmental Health Sciences',
    url: 'https://www.niehs.nih.gov/',
    language: 'en',
  },
  {
    title: 'NIEHS - Kids Environment Kids Health',
    url: 'https://kids.niehs.nih.gov/',
    language: 'en',
  },
];

export function Noticias() {
  const spanishLinks = resources.filter((item) => item.language === 'es');
  const englishLinks = resources.filter((item) => item.language === 'en');

  return (
    <main className="page-content">
      <SectionHeader title="Para saber más" />

      <section className="wrapper content-card">
        <div className="text-box w-100">
          <p>
            Si deseas profundizar en el conocimiento sobre cómo el entorno afecta a nuestra salud,
            te ofrecemos una selección de portales verificados que ofrecen contenido educativo y
            científico de gran calidad.
          </p>

          <div className="row g-4 mt-2">
            <div className="col-md-6">
              <h3 className="h4 mb-3">Páginas web en español</h3>
              <ul className="leaf-list">
                {spanishLinks.map((resource) => (
                  <li key={resource.url}>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resource-link"
                    >
                      {resource.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-md-6">
              <h3 className="h4 mb-3">Páginas en inglés</h3>
              <ul className="leaf-list">
                {englishLinks.map((resource) => (
                  <li key={resource.url}>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resource-link"
                    >
                      {resource.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
