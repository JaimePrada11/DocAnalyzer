import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import DocumentList from '../components/DocumentList';
import GeminiQuery from '../components/GeminiQuery';
import { useDocuments } from '../hooks/useDocuments';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { processing, results, error, processDocuments, queryGemini } = useDocuments();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Bienvenido, {user?.name}</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="flex border-b border-gray-200">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'upload' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('upload')}
        >
          Procesar Documentos
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'query' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('query')}
        >
          Consultar Gemini
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p>{error}</p>
        </div>
      )}

      {activeTab === 'upload' ? (
        <div className="grid md:grid-cols-2 gap-6">
          <FileUpload onUpload={processDocuments} processing={processing} />
          <DocumentList documents={results} loading={processing} />
        </div>
      ) : (
        <GeminiQuery onQuery={queryGemini} processing={processing} results={results} />
      )}
    </div>
  );
};

export default Dashboard;