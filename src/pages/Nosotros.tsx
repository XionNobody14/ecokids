import { SectionHeader } from '../components/SectionHeader';

export function Nosotros() {
  return (
    <main className="page-content">
      <SectionHeader title="Quiénes somos" />

      <section className="wrapper content-card">
        <img
          src="/assets/sostenibilidad-economia-verde-planta-manos-crecimiento-global-trabajo-equipo-esperanza-ayuda-confianza-comunidad-futura-tierra-e.avif"
          alt="Equipo de EcoKids sembrando sostenibilidad"
          width={500}
          height={300}
          fetchPriority="high"
          className="content-media"
        />
        <div className="text-box">
          <h2>Educación ambiental para las nuevas generaciones</h2>
          <p>
            <strong>EcoKids — Por una vida con mejor conciencia sobre el medio ambiente</strong> es
            una plataforma web educativa y lúdica creada para sensibilizar sobre la influencia del
            entorno en nuestra salud y favorecer el desarrollo de hábitos saludables desde la
            infancia.
          </p>
          <p>
            Es una iniciativa nacida por un grupo de estudiantes de ingeniería de la Facultad de
            Ingeniería Mecánica y Eléctrica (FIME) de la Universidad Autónoma de Nuevo León (UANL),
            que buscan apoyar a la sociedad. Su principal objetivo es crear una comunidad más sana
            donde los niños, familias y educadores disfruten de una buena salud física y mental,
            relaciones constructivas y un entorno sostenible.
          </p>
        </div>
      </section>
    </main>
  );
}
