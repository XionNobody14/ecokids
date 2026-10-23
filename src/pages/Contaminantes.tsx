import { SectionHeader } from '../components/SectionHeader';
import { ContaminantCard } from '../components/Cards';
import type { ContaminantCategory } from '../types';

const contaminantCategories: ContaminantCategory[] = [
  {
    id: 'aire',
    title: 'Aire',
    summary:
      'Conoce qué es el polvo químico, los compuestos orgánicos volátiles (COVs) y cómo mejorar la ventilación dentro de casa y la escuela.',
    imageUrl: '/assets/flying-kite-89.png',
    route: '/aire',
  },
  {
    id: 'ropa',
    title: 'Ropa',
    summary:
      'Identifica los residuos químicos en tejidos sintéticos y naturales, y descubre alternativas de ropa libre de tóxicos.',
    imageUrl: '/assets/online-shopping-34.png',
    route: '/ropa',
  },
  {
    id: 'plasticos',
    title: 'Plásticos',
    summary:
      'Aprende a distinguir los 7 códigos de reciclaje del plástico, cuáles evitar y qué alternativas saludables utilizar.',
    imageUrl: '/assets/recycling-2-69.png',
    route: '/plastico',
  },
];

export function Contaminantes() {
  return (
    <main className="page-content">
      <SectionHeader title="Dónde están los contaminantes" />

      <section className="wrapper content-card align-items-center">
        <img
          src="/assets/linda-ubicacion-pin-dibujos-animados-sosteniendo-planta-olla_214584-5185.avif"
          alt="Localización de contaminantes en el hogar"
          width={360}
          height={260}
          fetchPriority="high"
          className="content-media"
        />
        <div className="text-box">
          <h2>Guía práctica para hogares y escuelas saludables</h2>
          <p>
            En este apartado encontrarás información útil sobre los tóxicos que puede haber en tu
            hogar, cómo localizarlos y alternativas sencillas para proteger la salud de los niños y
            del planeta.
          </p>
        </div>
      </section>

      <section className="wrapper">
        <div className="contaminants-grid">
          {contaminantCategories.map((category, index) => (
            <ContaminantCard
              key={category.id}
              item={category}
              prioritizeImage={index === 0}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
