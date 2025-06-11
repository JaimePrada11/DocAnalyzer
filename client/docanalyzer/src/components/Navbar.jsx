import { Link, useNavigate } from 'react-router-dom';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <DocumentTextIcon className="h-7 w-7 text-white" />
          <Link
            to="/"
            className="text-lg sm:text-xl font-semibold text-white tracking-tight hover:opacity-90 transition-opacity duration-200"
          >
            DocProcessord
          </Link>
        </div>

        {/* Actions */}
        <div>
          {user ? (
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-white hover:bg-white/10 px-4 py-2 text-sm font-medium transition-colors duration-200"
            >
              Cerrar sesión
            </Button>
          ) : (
            <Button
              asChild
              className="bg-white text-gray-900 hover:bg-gray-200 px-5 py-2 text-sm font-medium transition-colors duration-200"
            >
              <Link to="/login">Iniciar sesión</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;