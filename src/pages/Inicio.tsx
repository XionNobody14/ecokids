import { SectionHeader } from '../components/SectionHeader';

export function Inicio() {
  return (
    <main className="page-content">
      <SectionHeader title="Inicio" />

      <section className="wrapper content-card">
        <img
          src="/assets/home-1-600x930.jpeg"
          alt="Cuidado del medio ambiente en manos de los niños"
          width={360}
          height={450}
          fetchPriority="high"
          className="content-media"
        />
        <div className="text-box">
          <h2>¿Qué es la salud ambiental?</h2>
          <p>
            La salud ambiental se relaciona con la influencia que pueden tener los distintos agentes
            ambientales físicos, químicos y biológicos en nuestra salud; por ejemplo, el aire, el
            ruido, las sustancias químicas, los alimentos y los campos electromagnéticos.
          </p>
          <p>
            Por tanto, un entorno contaminado puede afectar negativamente a nuestra salud. Salud
            Ambiental en la Escuela sensibiliza sobre la influencia del medio ambiente en la salud y
            favorece el desarrollo de hábitos saludables.
          </p>
        </div>
      </section>

      <SectionHeader title="¿Por qué es importante la salud ambiental?" />

      <section className="wrapper content-card">
        <div className="text-box">
          <p>
            El siglo XX se caracterizó por un exponencial desarrollo industrial que ha repercutido
            en el aumento de nuestra calidad de vida. Sin embargo, también ha generado una serie de
            problemas, entre ellos una relevante contaminación de nuestro entorno que puede afectar
            a la salud de las personas. La Organización Mundial de la Salud (OMS) estima que una de
            cada cuatro enfermedades en el mundo puede tener que ver con factores ambientales.
          </p>
          <p>
            Dentro de los factores ambientales que pueden contribuir a generar problemas sanitarios,
            uno de especial interés para la comunidad científica y las autoridades es el de los
            contaminantes químicos. Preocupa en especial lo que tiene que ver con los niños, como
            evidencian iniciativas como el Plan de acción sobre medio ambiente y salud para los
            niños en Europa (CEHAPE), puesto en marcha bajo los auspicios de la OMS.
          </p>
          <p>
            Es importante trabajar para concienciar acerca de cuáles pueden ser situaciones de
            posible riesgo y las formas para reducirlas: aprender qué artículos o productos pueden
            contener sustancias perjudiciales y la forma de evitarlas o de reducir su presencia en
            entornos infantiles.
          </p>
        </div>
      </section>

      <SectionHeader title="¿Por qué las escuelas?" />

      <section className="wrapper content-card">
        <div className="text-box">
          <p>
            Uno de los ámbitos más importantes en los que introducir la prevención en salud
            ambiental es la escuela. Los niños y niñas tienen una gran capacidad de aprendizaje y
            son la base de la sociedad, por lo que los cambios aplicados en esta etapa repercuten en
            todo el conjunto.
          </p>
        </div>
      </section>

      <SectionHeader title="Los niños, los más vulnerables" />

      <section className="wrapper content-card">
        <img
          src="/assets/los-ninos-los-mas-vulnerables.png"
          alt="Infografía sobre la vulnerabilidad infantil ante contaminantes"
          width={480}
          height={320}
          loading="lazy"
          className="content-media"
        />
        <div className="text-box">
          <p>
            Los niños presentan una serie de características que les hacen particularmente sensibles
            a la influencia del entorno. En proporción, respiran más que los adultos y además están
            más cerca del suelo, de modo que se exponen más a inhalar compuestos orgánicos volátiles
            o sustancias presentes en el polvo, además de las que puedan ingerir por llevarse las
            manos a la boca. Su piel es más permeable y sus sistemas orgánicos de eliminación de
            tóxicos aún no han madurado.
          </p>
          <p>
            Enfermedades respiratorias, asma infantil, alergias, problemas cognitivos y alteraciones
            hormonales crecen en incidencia entre la población infantil. Reducir la exposición a la
            contaminación química en casa y en la escuela ayuda a prevenir gran parte de estos
            problemas.
          </p>
        </div>
      </section>

      <SectionHeader title="Qué pretendemos" />

      <section className="wrapper content-card">
        <div className="text-box">
          <p>
            El fin que nos mueve es preservar la salud del medio ambiente bajo su acepción más
            amplia: todo lo que rodea a un ser vivo, así como los valores naturales, sociales y
            culturales que existen en un momento y lugar. Se trata de una doble finalidad:
          </p>
          <ul className="leaf-list">
            <li>
              Preservar la salud de las personas, previniendo enfermedades y mejorando el nivel de
              salud.
            </li>
            <li>Preservar la salud del planeta, protegiendo el medio ambiente.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
