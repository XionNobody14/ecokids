import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';
import type { ContentSection } from '../types';

const airSections: ContentSection[] = [
  {
    id: 'contaminacion-hogar',
    heading: 'La contaminación del aire dentro de nuestras casas',
    paragraphs: [
      'Cuando se nos habla de aire contaminado solemos pensar en el aire exterior, el de la calle. La mayoría de las personas desconocen que la contaminación que podemos respirar dentro de los edificios puede ser mucho mayor y estar dañando nuestra salud más que la del aire exterior.',
      'Los occidentales pasamos más de un 90% de nuestro tiempo dentro de espacios cerrados, y casi un 50% de todo nuestro tiempo lo pasamos en nuestros hogares. Es un hecho, conocido por la comunidad científica, que buena parte de nuestra exposición a contaminantes se da en nuestros mismos hogares. Y ello es algo que debe movernos a reflexionar y, sobre todo, a actuar.',
    ],
  },
  {
    id: 'polvo-quimico',
    subheading: 'El polvo químico',
    imageUrl:
      '/assets/f.elconfidencial.com_original_e3b_255_598_e3b2555985b3a3c7061dba256099f0af.jpg',
    imageAlt: 'Partículas de polvo doméstico en el hogar',
    paragraphs: [
      'Uno de los factores más reveladores de la contaminación química que tenemos en los hogares es lo que se sabe acerca de la composición química del polvo doméstico. También es uno de los factores más preocupantes, ya que el polvo es algo que inhalamos de continuo, pudiendo hacer que una amplia serie de contaminantes pasen a nuestra sangre a través de la respiración.',
      'En 2003, la Universidad de Exeter (RU) analizó para Greenpeace el polvo de numerosas casas de países europeos, como España. Se detectaron alquilfenoles, ftalatos, el insecticida permetrina, retardantes de llama, compuestos organoestánnicos y parafinas cloradas; sustancias asociadas por estudios científicos a problemas como cáncer, daños al sistema nervioso, alteraciones hormonales y perturbaciones inmunológicas.',
      'Las sustancias químicas tóxicas que acaban integrando la composición del polvo doméstico proceden, en buena medida, de los diversos elementos que hay en los hogares: electrodomésticos, suelos de PVC, muebles, alfombras y moquetas, productos de limpieza, pinturas, juguetes, productos de aseo y pesticidas domésticos.',
    ],
  },
  {
    id: 'covs',
    subheading: 'Compuestos orgánicos volátiles (COVs)',
    paragraphs: [
      'Los compuestos orgánicos volátiles son unos de los más importantes contaminantes del aire. En las ciudades se originan ingentes cantidades de ellos por la combustión de gasolina, y generan un considerable problema ambiental y sanitario. En espacios cerrados, los contaminantes volátiles pueden acumularse mucho más al ser liberados desde disolventes, pinturas, pegamentos, plásticos, ambientadores y productos de limpieza.',
      'Según la Agencia de Protección del Medio Ambiente (EPA) de los EE.UU., la concentración de estos compuestos suele ser varias veces más alta en espacios cerrados como los hogares que en el exterior. En algún caso, hasta 10 veces mayor que en el exterior de una planta petroquímica.',
      'Los síntomas más inmediatos ante exposiciones intensas pueden ser irritación de la conjuntiva, molestias en nariz y garganta, cefalea, reacción alérgica de la piel, disnea, náuseas, fatiga y mareos. También trastornos de memoria, pérdida de coordinación y problemas visuales. Entre los compuestos volátiles se cuentan sustancias como el benceno, el óxido de estireno, el percloroetileno, el tricloroetileno o el formaldehído.',
    ],
  },
  {
    id: 'aire-limpio',
    heading: 'Aire interior más limpio',
    imageUrl: '/assets/ventilacion-en-las-aulas.jpg',
    imageAlt: 'Ventilación natural en aulas y hogares',
    paragraphs: [
      'Una de las formas más sencillas de reducir la acumulación de elementos nocivos dentro del hogar es incrementar la ventilación natural de la casa. Ello reducirá en gran medida la concentración de los mismos. Existen también purificadores de aire de diversas clases que pueden retener algunos de los compuestos volátiles o los presentes en el polvo doméstico.',
      'Ciertas plantas (hiedras, crisantemo, ficus, cinta, azucena), al igual que los microorganismos de la tierra de las macetas que las contienen, pueden ayudar a capturar algunos contaminantes del ambiente interior del hogar. Plantas como los helechos absorben parte de la humedad en dependencias como el cuarto de baño. Pero, como en todo, lo más eficaz para eliminar los problemas es atacar su fuente, eliminando o reduciendo las fuentes de contaminación de nuestro hogar.',
    ],
  },
];

export function Aire() {
  return (
    <main className="page-content">
      <SectionHeader title="Aire" />

      <div className="container mb-3 text-start">
        <Link to="/contaminantes" className="btn btn-outline-secondary btn-sm">
          ← Volver a Contaminantes
        </Link>
      </div>

      {airSections.map((section, sectionIndex) => (
        <section className="wrapper content-card" key={section.id}>
          {section.imageUrl && (
            <img
              className="content-media"
              src={section.imageUrl}
              alt={section.imageAlt ?? section.heading ?? 'Ilustración sobre el aire'}
              width={480}
              height={280}
              {...(sectionIndex <= 1 ? { fetchPriority: 'high' } : { loading: 'lazy' })}
            />
          )}
          <div className="text-box">
            {section.heading && <h2>{section.heading}</h2>}
            {section.subheading && <h3>{section.subheading}</h3>}
            {section.paragraphs.map((paragraph, index) => (
              <p key={`${section.id}-p-${index}`}>{paragraph}</p>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
