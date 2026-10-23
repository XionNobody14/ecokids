import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';

const plasticCodes: string[] = [
  'Polietilentereftalato (PET)',
  'Polietileno de alta densidad (PE-HD)',
  'Cloruro de polivinilo (PVC)',
  'Polietileno de baja densidad (PE-LD)',
  'Polipropileno (PP)',
  'Poliestireno (PS)',
  'Otros (O): PMMA, PA, PLA, PC (policarbonato), etc.',
];

export function Plastico() {
  return (
    <main className="page-content">
      <SectionHeader title="Plásticos" />

      <div className="container mb-3 text-start">
        <Link to="/contaminantes" className="btn btn-outline-secondary btn-sm">
          ← Volver a Contaminantes
        </Link>
      </div>

      <section className="wrapper content-card">
        <div className="text-box">
          <h2>El plástico en la vida cotidiana</h2>
          <p>
            El plástico es el principal componente de muchas de las cosas que utilizamos todos los
            días: juguetes, electrodomésticos, bolsas, botellas, táperes para guardar la comida e
            incluso recubrimientos de suelos y paredes. Por lo tanto, los materiales plásticos
            pueden ser una importante vía de entrada de tóxicos al hogar.
          </p>
          <p>
            Muchos de los componentes del plástico pueden ser dañinos para el medio ambiente, acabar
            contaminando ríos y mares y afectando a la fauna, además de dañar nuestra salud.
          </p>
          <p>
            Algunos plásticos pueden liberar sustancias como el bisfenol A (presente en el
            policarbonato y recubrimientos internos de latas) o ftalatos y retardantes de llama que
            terminan integrándose en el polvo doméstico.
          </p>
          <p>
            Un aspecto importante es saber distinguir los distintos tipos de plástico mediante el
            símbolo triangular numerado del 1 al 7:
          </p>
          <ol className="plastic-code-list">
            {plasticCodes.map((code, idx) => (
              <li key={idx}>{code}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrapper content-card">
        <img
          src="/assets/numeros-plastico.jpg"
          alt="Códigos de identificación de plásticos del 1 al 7"
          width={480}
          height={260}
          loading="lazy"
          className="content-media"
        />
        <div className="text-box">
          <h3>¿Qué números debemos evitar?</h3>
          <p>
            El triángulo y el número impreso en los envases indican el polímero con el que están
            fabricados. Es especialmente importante evitar el tipo 3 (PVC, puede contener ftalatos)
            y el tipo 6 (PS). El tipo 7 solo debemos usarlo si sabemos que es libre de BPA. Y las
            botellas del tipo 1 (PET) solo deben usarse una vez.
          </p>
        </div>
      </section>

      <section className="wrapper content-card">
        <div className="text-box">
          <h3>Alternativas a los plásticos</h3>
          <p>
            Un primer consejo es reducir la cantidad de plásticos en casa, especialmente en
            habitaciones infantiles y recubrimientos de PVC. Evita calentar alimentos o bebidas en
            recipientes plásticos dentro del microondas.
          </p>
          <p>
            Sustituye envases y envoltorios plásticos por vidrio, acero inoxidable o papel, reduce
            el consumo de comidas enlatadas y busca siempre etiquetas certificadas como «Sin BPA»
            (BPA Free) y «Libre de ftalatos».
          </p>
        </div>
      </section>
    </main>
  );
}
