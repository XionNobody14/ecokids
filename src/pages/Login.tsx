import { useState, type FormEvent, type FocusEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector<HTMLElement>(':invalid');
      firstInvalid?.focus();
      setFeedback({
        type: 'error',
        message: 'Por favor ingresa un correo válido y una contraseña de al menos 6 caracteres.',
      });
      return;
    }

    setFeedback({
      type: 'success',
      message: '¡Sesión iniciada, bienvenido a EcoKids! Redirigiendo...',
    });

    window.setTimeout(() => {
      void navigate('/');
    }, 1200);
  };

  return (
    <main className="page-content">
      <div className="login-container">
        <h2>Iniciar Sesión</h2>

        {feedback && (
          <div
            role="status"
            aria-live="polite"
            className={feedback.type === 'error' ? 'error' : 'success'}
          >
            {feedback.message}
          </div>
        )}

        <form onSubmit={handleLogin} method="POST" noValidate>
          <div className="form-group">
            <label htmlFor="login-email">Correo electrónico *</label>
            <span id="login-email-hint" className="field-hint">
              Formato: usuario@ejemplo.com
            </span>
            <input
              type="email"
              id="login-email"
              name="email"
              required
              autoComplete="username"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={syncValidationAria}
              onInput={clearValidationOnInput}
              aria-describedby="login-email-hint"
              aria-errormessage="login-email-error"
            />
            <div id="login-email-error" className="error-msg">
              <span aria-hidden="true">❌</span> Ingresa un correo electrónico válido.
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Contraseña *</label>
            <span id="login-password-hint" className="field-hint">
              Mínimo 6 caracteres
            </span>
            <input
              type="password"
              id="login-password"
              name="password"
              required
              minLength={6}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={syncValidationAria}
              onInput={clearValidationOnInput}
              aria-describedby="login-password-hint"
              aria-errormessage="login-password-error"
            />
            <div id="login-password-error" className="error-msg">
              <span aria-hidden="true">❌</span> La contraseña debe tener al menos 6 caracteres.
            </div>
          </div>

          <button type="submit" className="btn-auth-submit">
            Iniciar Sesión
          </button>
        </form>

        <Link to="/registro" className="btn-auth-secondary">
          Registrarse
        </Link>
      </div>
    </main>
  );
}
