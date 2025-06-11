import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen mt-6 flex flex-col lg:flex-row bg-emerald-50 font-sans relative">
      <div className="hidden lg:flex w-full lg:w-1/2 relative z-0">
        <img
        src='https://cdn.dribbble.com/userupload/17751156/file/original-a9b29912fd1b2d0a2e311070633db80e.png?resize=2048x1290&vertical=center'
        alt="Decoración IA"
          className="w-full h-full object-cover rounded-r-xl"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 bg-white z-10">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900">¡Bienvenido!</h1>
          <p className="text-base text-gray-600 mb-8">
            Crea tu cuenta para comenzar tu experiencia personalizada.
          </p>
          <RegisterForm />
          <p className="text-center text-sm text-gray-500 mt-6">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-black font-medium hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-y-[10rem] translate-x-[-20rem] z-30">
        <div className="bg-black/60 backdrop-blur-lg px-8 py-6 rounded-2xl text-white shadow-2xl max-w-sm">
          <h2 className="text-3xl font-bold mb-2">Empieza con ventaja</h2>
          <p className="text-white/90 text-base">
            Automatiza tu entorno y descubre todo lo que la inteligencia artificial puede hacer por ti.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
