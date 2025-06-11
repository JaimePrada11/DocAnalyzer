import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-emerald-50 font-sans relative">
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white z-10">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900">¡Hola de nuevo!</h1>
          <p className="text-base text-gray-600 mb-8">
            Inicia sesión para continuar explorando.
          </p>
          <LoginForm />
          <p className="text-center text-sm text-gray-500 mt-6">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="text-black font-medium hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex w-full lg:w-1/2 relative z-0">
        <img
          src="https://cdn.dribbble.com/userupload/31459289/file/original-799f6e759f93bf8e9b9a9d235d0de334.png?resize=2048x1536&vertical=center"
          alt="Decoración IA"
          className="w-full h-full object-cover rounded-l-xl"
        />
      </div>

      <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-y-1/1 -translate-x-1/10 z-30">
        <div className="bg-black/60 backdrop-blur-lg px-8 py-6 rounded-2xl text-white shadow-2xl max-w-sm">
          <h2 className="text-3xl font-bold mb-2">Automatiza tu espacio</h2>
          <p className="text-white/90 text-base">
            Transforma tu entorno con estilo y eficiencia gracias a la inteligencia artificial.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
