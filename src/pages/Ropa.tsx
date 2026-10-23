import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';

const clothingTips: string[] = [
  'Una forma de eliminar parte de las sustancias químicas es lavar la ropa nueva antes de estrenarla, con detergentes lo más naturales posibles.',
  'Podemos reducir la presencia de contaminantes en una prenda nueva dejándola en remojo en agua con bicarbonato antes de usarla por primera vez.',
  'Son preferibles los tejidos naturales de origen biológico no tratados.',
  'Intentar garantizar que no se hayan incorporado sustancias problemáticas a lo largo del proceso de producción y comercialización de la ropa.',
  'Evitar tejidos antimanchas, hidrófugos y antiarrugas que puedan contener sustancias perjudiciales. Evitar también la limpieza en seco que emplea percloroetileno.',
  'Lavar la ropa con productos ecológicos y sin fragancias sintéticas.',
  'Informarse sobre las diferentes certificaciones textiles: Global Organic Textile Standard (GOTS), OEKO-TEX, Ecoetiqueta Europea o Made in Green.',
  'Estar atentos a campañas como Moda sin Tóxicos de Greenpeace, que vigilan qué marcas eliminan sustancias peligrosas de sus prendas.',
];

export function Ropa() {
  return (
    <main className="page-content">
      <SectionHeader title="Ropa" />

      <div className="container mb-3 text-start">
        <Link to="/contaminantes" className="btn btn-outline-secondary btn-sm">
          ← Volver a Contaminantes
        </Link>
      </div>

      <section className="wrapper content-card">
        <img
          src="/assets/el-importante-beneficio-de-usar-ropa-holgada.jpg"
          alt="Tejidos y prendas saludables"
          width={460}
          height={260}
          fetchPriority="high"
          className="content-media"
        />
        <div className="text-box">
          <h2>Residuos en ropa y tejidos</h2>
          <p>
            En la industria textil puede utilizarse una larguísima serie de sustancias tóxicas tanto
            durante el proceso de producción como en la comercialización, tanto si se trata de
            tejidos sintéticos como naturales: pesticidas en cultivos de fibras vegetales, productos
            químicos para limpiar tejidos, colas, blanqueantes o tintes sintéticos, compuestos
            antiarrugas, antimanchas o repelentes del fuego.
          </p>
          <p>
            Parte de estos compuestos no permanecen eternamente en las prendas y van liberándose
            poco a poco al ambiente interior de los hogares, pudiendo ser detectados en el polvo
            doméstico.
          </p>
          <p>
            Tampoco conviene olvidar las sustancias que pueden quedar en las ropas a consecuencia
            del empleo de detergentes convencionales y productos usados en la limpieza en seco.
          </p>
        </div>
      </section>

      <section className="wrapper content-card">
        <div className="text-box w-100">
          <h2>Alternativas: ropa sin tóxicos</h2>
          <h3>¿Qué podemos hacer?</h3>
          <ul className="leaf-list">
            {clothingTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
