import { useState, type FormEvent, type FocusEvent } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';
import { saveContactMessage } from '../services/firebase';
import type { ContactMessage, SenderRole } from '../types';

export function Contacto() {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderRole, setSenderRole] = useState<SenderRole>('niño');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [sentMessages, setSentMessages] = useState<ContactMessage[]>([]);

  const syncValidationAria = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.currentTarget;
    const isInvalid = !target.checkValidity();
    target.classList.toggle('user-invalid-fallback', isInvalid);
    target.setAttribute('aria-invalid', isInvalid ? 'true' : 'false');
  };

  const clearValidationOnInput = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.currentTarget;
    if (target.hasAttribute('aria-invalid')) {
      const isInvalid = !target.checkValidity();
      target.classList.toggle('user-invalid-fallback', isInvalid);
      target.setAttribute('aria-invalid', isInvalid ? 'true' : 'false');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector<HTMLElement>(':invalid');
      firstInvalid?.focus();
      setStatusMessage({
        type: 'error',
        text: 'Por favor revisa los campos marcados antes de enviar tu mensaje.',
      });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const cleanPayload = {
        senderName: senderName.trim(),
        senderEmail: senderEmail.trim(),
        senderRole,
        subject: subject.trim(),
        message: message.trim(),
      };

      const docId = await saveContactMessage(cleanPayload);

      const savedItem: ContactMessage = {
        id: docId,
        ...cleanPayload,
        createdAt: new Date().toISOString(),
      };

      setSentMessages((prev) => [savedItem, ...prev]);
      setSenderName('');
      setSenderEmail('');
      setSenderRole('niño');
      setSubject('');
      setMessage('');
      form.reset();
      setStatusMessage({
        type: 'success',
        text: `¡Tu mensaje fue enviado y guardado en EcoKids con éxito! (Folio: ${docId})`,
      });
    } catch (error) {
      setStatusMessage({
        type: 'error',
        text:
          error instanceof Error
            ? error.message
            : 'No pudimos conectar con el servidor. Por favor verifica tu conexión e inténtalo nuevamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-content">
      <SectionHeader title="Contacto" />

      <section className="wrapper contact-grid">
        <div className="contact-info-banner">
          <div className="mb-4">
            <span className="badge bg-light text-primary mb-2">Una Iniciativa de</span>
            <h2 className="text-white p-0 m-0">Fundación EcoKids</h2>
          </div>

          <div className="contact-details-columns">
            <div>
              <h3 className="h5 fw-bold text-warning">CONTACTO DIRECTO</h3>
              <p>📍 Corazón Verde, 66360 Monterrey, N.L.</p>
              <p>📞 Teléfono: 3481299941</p>
              <p>📱 Móvil: 8687582845</p>
              <p>
                ✉️ Email:{' '}
                <a href="mailto:ecokids@saludambientalenlaescuela.org">
                  ecokids@saludambientalenlaescuela.org
                </a>
              </p>
            </div>

            <div>
              <h3 className="h5 fw-bold text-warning">MAPA WEB</h3>
              <ul className="contact-sitemap">
                <li>
                  <Link to="/nosotros">Quiénes somos</Link>
                </li>
                <li>
                  <Link to="/contacto">Contacta</Link>
                </li>
                <li>
                  <Link to="/contaminantes">Contaminantes en el hogar</Link>
                </li>
                <li>
                  <Link to="/quiz">Juegos interactivos</Link>
                </li>
                <li>
                  <Link to="/noticias">Fuentes y Noticias</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="content-card contact-form-card">
          <h3 className="mb-3">Envíanos tus dudas o comentarios</h3>
          <p className="text-muted mb-4">
            ¿Eres niño, maestro o padre de familia? Escríbenos tus preguntas sobre reciclaje,
            salud ambiental o actividades escolares.
          </p>

          {statusMessage && (
            <div
              role="status"
              aria-live="polite"
              className={`alert ${
                statusMessage.type === 'success' ? 'alert-success' : 'alert-danger'
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit} method="POST" noValidate>
            <div className="form-group">
              <label htmlFor="senderName">Nombre completo *</label>
              <input
                type="text"
                id="senderName"
                name="senderName"
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                onBlur={syncValidationAria}
                onInput={clearValidationOnInput}
                aria-errormessage="senderName-error"
              />
              <div id="senderName-error" className="error-msg">
                <span aria-hidden="true">❌</span> Ingresa tu nombre (mínimo 2 caracteres).
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="senderEmail">Correo electrónico *</label>
              <span id="senderEmail-hint" className="field-hint">
                Formato: correo@ejemplo.com
              </span>
              <input
                type="email"
                id="senderEmail"
                name="senderEmail"
                required
                autoComplete="email"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                onBlur={syncValidationAria}
                onInput={clearValidationOnInput}
                aria-describedby="senderEmail-hint"
                aria-errormessage="senderEmail-error"
              />
              <div id="senderEmail-error" className="error-msg">
                <span aria-hidden="true">❌</span> Por favor ingresa un correo electrónico válido.
              </div>
            </div>

            <fieldset className="form-group">
              <legend className="form-legend">¿Quién nos escribe? *</legend>
              <div className="radio-group">
                {(['niño', 'maestro', 'familia'] as const).map((roleOption) => (
                  <label key={roleOption} className="radio-option">
                    <input
                      type="radio"
                      name="senderRole"
                      value={roleOption}
                      checked={senderRole === roleOption}
                      onChange={() => setSenderRole(roleOption)}
                    />
                    <span className="text-capitalize">{roleOption}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="form-group">
              <label htmlFor="subject">Asunto *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                minLength={4}
                maxLength={120}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                onBlur={syncValidationAria}
                onInput={clearValidationOnInput}
                aria-errormessage="subject-error"
              />
              <div id="subject-error" className="error-msg">
                <span aria-hidden="true">❌</span> Indica un asunto breve (mínimo 4 caracteres).
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensaje o pregunta *</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                minLength={10}
                maxLength={1000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onBlur={syncValidationAria}
                onInput={clearValidationOnInput}
                aria-errormessage="message-error"
              />
              <div id="message-error" className="error-msg">
                <span aria-hidden="true">❌</span> Escribe un mensaje de al menos 10 caracteres.
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 py-2 fw-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando mensaje...' : 'Enviar mensaje a EcoKids'}
            </button>
          </form>
        </div>
      </section>

      {sentMessages.length > 0 && (
        <section className="wrapper content-card flex-column">
          <h3 className="w-100 text-start mb-3">Tus mensajes enviados en esta sesión</h3>
          <div className="row g-3 w-100">
            {sentMessages.map((item, idx) => (
              <div className="col-md-6" key={item.id ?? idx}>
                <div className="border rounded p-3 bg-light h-100 text-start">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <strong>{item.senderName}</strong>
                    <span className="badge bg-success text-capitalize">{item.senderRole}</span>
                  </div>
                  <div className="small fw-semibold text-secondary mb-1">{item.subject}</div>
                  <p className="mb-0 small">{item.message}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
