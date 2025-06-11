import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  ArrowRightIcon,
  CloudArrowUpIcon,
  MagnifyingGlassIcon,
  FolderOpenIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-indigo-100 py-24 px-4 sm:px-6 lg:px-12 flex items-center justify-center">
      <div className="max-w-6xl w-full space-y-20 text-center">
        {/* Hero Section */}
        <section className="space-y-8 animate-fade-in px-2">
          <DocumentTextIcon className="mx-auto h-16 sm:h-20 w-16 sm:w-20 text-gray-900" />
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-gray-900 leading-tight">
            Procesamiento Inteligente <br className="hidden sm:block" />
            de Documentos
          </h1>
          <p className="mt-4 text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Potenciado por inteligencia artificial para analizar, extraer y
            organizar la información clave de tus archivos de forma automática y
            segura.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="bg-black text-white text-lg px-6 py-4 rounded-xl shadow-md hover:bg-neutral-800 transition-colors duration-200 w-full sm:w-auto"
            >
              <Link to="/register" className="flex items-center justify-center gap-2">
                Comenzar <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-gray-900 border-gray-300 text-lg px-6 py-4 rounded-xl shadow-sm hover:bg-gray-100 transition-colors duration-200 w-full sm:w-auto"
            >
              <Link to="/login">Iniciar sesión</Link>
            </Button>
          </div>
        </section>

        {/* Funcionalidades Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-2">
          <div className="flex justify-center">
            <img
              src="/IA.gif"
              alt="Ilustración IA"
              className="rounded-xl shadow-xl w-full max-w-sm sm:max-w-md h-auto"
            />
          </div>

          <Card className="bg-white shadow-xl border border-gray-200 text-left">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 text-center sm:text-left">
                ¿Qué puedes hacer aquí?
              </h2>
              <div className="space-y-4">
                <Feature icon={<CloudArrowUpIcon className="h-6 w-6 text-black" />}>
                  Sube documentos en formatos PDF, DOCX o imágenes escaneadas.
                </Feature>
                <Feature icon={<MagnifyingGlassIcon className="h-6 w-6 text-black" />}>
                  Extrae automáticamente nombres, fechas, montos y otros datos
                  clave.
                </Feature>
                <Feature icon={<FolderOpenIcon className="h-6 w-6 text-black" />}>
                  Organiza tus documentos en proyectos y consulta los resultados
                  fácilmente.
                </Feature>
                <Feature icon={<LockClosedIcon className="h-6 w-6 text-black" />}>
                  Accede a todo desde cualquier lugar, de forma segura y privada.
                </Feature>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

const Feature = ({ icon, children }) => (
  <div className="flex items-start gap-4">
    {icon}
    <p className="text-gray-700">{children}</p>
  </div>
);

export default Home;