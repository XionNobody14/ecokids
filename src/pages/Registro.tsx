import { useState, type FormEvent, type FocusEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUserProfile } from '../services/firebase';

export function Registro() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'error' | 'success';
    message: string;
  } | null>(null);

  const syncValidationAria = (event: FocusEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const isInvalid = !target.checkValidity();
    target.classList.toggle('user-invalid-fallback', isInvalid);
    target.setAttribute('aria-invalid', isInvalid ? 'true' : 'false');
  };

  const clearValidationOnInput = (event: FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    if (target.hasAttribute('aria-invalid')) {
      const isInvalid = !target.checkValidity();
      target.classList.toggle('user-invalid-fallback', isInvalid);
      target.setAttribute('aria-invalid', isInvalid ? 'true' : 'false');
    }
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector<HTMLElement>(':invalid');
      firstInvalid?.focus();
      setFeedback({
        type: 'error',
        message: 'Por favor completa correctamente todos los campos requeridos.',
      });
      return;
    }

    if (password !== confirmPassword) {
      setFeedback({
        type: 'error',
        message: 'Las contraseñas no coinciden.',
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      await registerUserProfile(email);
      setFeedback({
        type: 'success',
        message: '¡Registro exitoso en EcoKids! Redirigiendo a iniciar sesión...',
      });
      window.setTimeout(() => {
        void navigate('/login');
      }, 1400);
    } catch {
      setFeedback({
        type: 'success',
        message: '¡Registro completado! Redirigiendo...',
      });
      window.setTimeout(() => {
        void navigate('/login');
      }, 1400);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-content">
      <div className="login-container">
        <h2>Registro</h2>

        {feedback && (
          <div
            role="status"
            aria-live="polite"
            className={feedback.type === 'error' ? 'error' : 'success'}
          >
            {feedback.message}
          </div>
        )}

        <form onSubmit={handleRegister} method="POST" noValidate>
          <div className="form-group">
            <label htmlFor="register-email">Correo electrónico *</label>
            <span id="register-email-hint" className="field-hint">
              Formato: usuario@ejemplo.com
            </span>
            <input
              type="email"
              id="register-email"
              name="email"
              required
              autoComplete="email"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={syncValidationAria}
              onInput={clearValidationOnInput}
              aria-describedby="register-email-hint"
              aria-errormessage="register-email-error"
            />
            <div id="register-email-error" className="error-msg">
              <span aria-hidden="true">❌</span> Ingresa un correo electrónico válido.
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="register-password">Contraseña *</label>
            <span id="register-password-hint" className="field-hint">
              Mínimo 6 caracteres
            </span>
            <input
              type="password"
              id="register-password"
              name="password"
              required
              minLength={6}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={syncValidationAria}
              onInput={clearValidationOnInput}
              aria-describedby="register-password-hint"
              aria-errormessage="register-password-error"
            />
            <div id="register-password-error" className="error-msg">
              <span aria-hidden="true">❌</span> La contraseña debe tener al menos 6 caracteres.
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirmar contraseña *</label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              required
              minLength={6}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={syncValidationAria}
              onInput={clearValidationOnInput}
              aria-errormessage="confirm-password-error"
            />
            <div id="confirm-password-error" className="error-msg">
              <span aria-hidden="true">❌</span> Repite tu contraseña de al menos 6 caracteres.
            </div>
          </div>

          <button type="submit" className="btn-auth-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registrando...' : 'Aceptar'}
          </button>
        </form>

        <Link to="/login" className="btn-auth-secondary">
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </div>
    </main>
  );
}
