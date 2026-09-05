import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, AlertCircle, CheckCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { 
  authenticateAdmin, 
  requestPasswordReset, 
  resetPasswordWithCode,
  changeAdminPassword,
  setCurrentUser,
  initDB,
  isUserAuthenticated
} from '../lib/db';

type LoginStep = 'credentials' | 'resetRequest' | 'resetVerify' | 'changePassword';

export function AdminLogin() {
  const navigate = useNavigate();
  const [step, setStep] = useState<LoginStep>('credentials');
  
  // Credentials step
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  
  // Reset steps
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI state
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize DB on mount and check existing session
  useEffect(() => {
    console.log('🔄 [AdminLogin] Component mounted. Initializing DB verification...');
    initDB();

    if (isUserAuthenticated()) {
      console.log('✅ [AdminLogin] Active admin session detected. Redirecting to /admin/dashboard...');
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.group('🔐 [Admin Login Submit]');
    console.log('1. [Validation] Validating entered form fields...');
    
    if (!identifier.trim() || !password.trim()) {
      console.warn('⚠️ Validation failed: identifier or password is empty');
      setError('Por favor ingresa tu correo/usuario y contraseña.');
      setLoading(false);
      console.groupEnd();
      return;
    }

    console.log('   Identifier:', identifier.trim());
    console.log('   Password length:', password.length);
    console.log('2. [DB Query] Querying database for credentials...');

    // Small delay for natural UX
    await new Promise(resolve => setTimeout(resolve, 300));

    const result = authenticateAdmin(identifier, password);
    console.log('3. [DB Response]', result.success ? '✅ Success' : '❌ Failed', result);

    if (result.success && result.admin) {
      if (result.admin.mustChangePassword) {
        console.log('ℹ️ Admin must update password before proceeding.');
        setStep('changePassword');
      } else {
        console.log('4. [Session] Setting persistent session tokens in sessionStorage & localStorage...');
        setCurrentUser(result.admin.id);
        console.log('🚀 [Navigation] Redirecting to /admin/dashboard');
        navigate('/admin/dashboard');
      }
    } else {
      console.error('❌ [Auth Error]', result.error);
      setError(result.error || 'Credenciales inválidas. Por favor intenta de nuevo.');
    }

    console.groupEnd();
    setLoading(false);
  };

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('🔑 [Password Reset] Requesting reset code for:', identifier);
    const result = requestPasswordReset(identifier);

    if (result.success) {
      console.log('✅ [Password Reset] Code generated and dispatched.');
      setStep('resetVerify');
      setSuccess('Código de recuperación enviado. Revisa tu correo o ventana emergente.');
    } else {
      console.error('❌ [Password Reset Error]', result.error);
      setError(result.error || 'No se pudo generar el código de recuperación.');
    }

    setLoading(false);
  };

  const handleResetVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      setLoading(false);
      return;
    }

    console.log('🔑 [Password Reset] Verifying code and setting new password...');
    const result = resetPasswordWithCode(identifier, resetCode, newPassword);

    if (result.success) {
      console.log('✅ [Password Reset] Password updated successfully.');
      setSuccess('¡Contraseña restablecida con éxito! Ahora puedes iniciar sesión.');
      setTimeout(() => {
        setStep('credentials');
        setResetCode('');
        setNewPassword('');
        setConfirmPassword('');
        setSuccess('');
      }, 2000);
    } else {
      console.error('❌ [Password Reset Error]', result.error);
      setError(result.error || 'Error al restablecer la contraseña.');
    }

    setLoading(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      setLoading(false);
      return;
    }

    console.log('🔒 [Change Password] Authenticating and updating default password...');
    const authResult = authenticateAdmin(identifier, password);
    
    if (!authResult.success || !authResult.admin) {
      setError('Fallo de autenticación. Verifica la contraseña actual.');
      setLoading(false);
      return;
    }

    const result = changeAdminPassword(authResult.admin.id, newPassword);

    if (result.success) {
      console.log('✅ [Change Password] Password changed. Establishing session...');
      setCurrentUser(authResult.admin.id);
      navigate('/admin/dashboard');
    } else {
      setError(result.error || 'Error al cambiar la contraseña.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back link */}
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Portafolio</span>
          </Link>
        </div>

        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-4 shadow-xl shadow-blue-500/20 ring-1 ring-white/20">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Portal de Administración</h1>
          <p className="text-slate-400 text-sm">
            {step === 'credentials' && 'Inicia sesión para gestionar tu portafolio'}
            {step === 'resetRequest' && 'Solicitar restablecimiento de contraseña'}
            {step === 'resetVerify' && 'Verificar código de recuperación'}
            {step === 'changePassword' && 'Actualiza tu contraseña de acceso'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-700/80">
          {/* Credentials Step */}
          {step === 'credentials' && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-5">
              <div>
                <label htmlFor="identifier" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Correo Electrónico o Usuario
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="identifier"
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="block w-full pl-10 pr-3.5 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700/70 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="ej. faridmaloof@gmail.com o admin"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Contraseña
                  </label>
                  <button
                    type="button"
                    onClick={() => setStep('resetRequest')}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3.5 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700/70 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-600 dark:text-red-300">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Verificando credenciales...
                  </span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Iniciar Sesión</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Reset Request Step */}
          {step === 'resetRequest' && (
            <form onSubmit={handleResetRequest} className="space-y-5">
              <div>
                <label htmlFor="reset-identifier" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Correo o Usuario Registrado
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="reset-identifier"
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="block w-full pl-10 pr-3.5 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700/70 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="ej. faridmaloof@gmail.com"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-600 dark:text-red-300">{error}</p>
                </div>
              )}

              {success && (
                <div className="p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-green-600 dark:text-green-300">{success}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
              >
                {loading ? 'Generando código...' : 'Enviar Código de Restablecimiento'}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep('credentials');
                    setError('');
                  }}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:underline"
                >
                  ← Volver al inicio de sesión
                </button>
              </div>
            </form>
          )}

          {/* Reset Verify Step */}
          {step === 'resetVerify' && (
            <form onSubmit={handleResetVerify} className="space-y-4">
              <div>
                <label htmlFor="reset-code" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Código de 6 dígitos
                </label>
                <input
                  id="reset-code"
                  type="text"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  className="block w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700/70 text-slate-900 dark:text-white placeholder-slate-400 text-center tracking-widest text-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123456"
                  maxLength={6}
                  required
                />
              </div>

              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Nueva Contraseña
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700/70 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mínimo 8 caracteres"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Confirmar Nueva Contraseña
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700/70 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Repite la contraseña"
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-600 dark:text-red-300">{error}</p>
                </div>
              )}

              {success && (
                <div className="p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-green-600 dark:text-green-300">{success}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
              >
                {loading ? 'Restableciendo...' : 'Guardar Nueva Contraseña'}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep('credentials')}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:underline"
                >
                  ← Volver al login
                </button>
              </div>
            </form>
          )}

          {/* Change Password Step */}
          {step === 'changePassword' && (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="p-3.5 bg-amber-50 dark:bg-amber-900/25 border border-amber-200 dark:border-amber-800/60 rounded-lg text-xs text-amber-800 dark:text-amber-200">
                Por motivos de seguridad, debes actualizar la contraseña antes de acceder por primera vez.
              </div>

              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Contraseña Actual
                </label>
                <input
                  id="current-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700/70 text-slate-900 dark:text-white text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="new-password-change" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Nueva Contraseña
                </label>
                <input
                  id="new-password-change"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700/70 text-slate-900 dark:text-white text-sm"
                  placeholder="Mínimo 8 caracteres"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirm-password-change" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Confirmar Contraseña
                </label>
                <input
                  id="confirm-password-change"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700/70 text-slate-900 dark:text-white text-sm"
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-600 dark:text-red-300">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
              >
                {loading ? 'Actualizando...' : 'Actualizar y Continuar al Dashboard'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

