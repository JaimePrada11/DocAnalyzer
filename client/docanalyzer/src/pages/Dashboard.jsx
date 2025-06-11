import { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';
import DocumentDetails from '../components/DocumentDetails';
import DocumentList from '../components/DocumentList';
import SidebarPanel from '../components/SidebarPanel';
import { useDocuments } from '../hooks/useDocuments';
import { useAuth} from '../hooks/useAuth';
import { getDocuments, getDocumentById } from '../services/api';

const Dashboard = () => {
  const { processing, results, error, processDocuments, resetResults } = useDocuments();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'allDocs'
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarDocs, setSidebarDocs] = useState([]);
  const [processed, setProcessed] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [selectedFullDocument, setSelectedFullDocument] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = () => {
    getDocuments()
      .then((res) => setSidebarDocs(res.data.documents || []))
      .catch(() => setSidebarDocs([]));
  };

  useEffect(() => {
    if (results.length > 0 && !processing) {
      setProcessed(true);
      fetchDocuments();
    }
  }, [results, processing]);

  const handleProcess = async (files) => {
    await processDocuments(files);
  };

const handleDocumentSelect = async (id) => {
  try {
    const response = await getDocumentById(id);
setSelectedFullDocument({ document: response.data.document });
    setSelectedDocId(id);
    setActiveTab('upload');
  } catch (error) {
    console.error("❌ Error al obtener el documento completo:", error);
  }
};


  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedDocId(null);
    setSelectedFullDocument(null);
    resetResults(); 
    setProcessed(false);
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="mt-[4rem]">
        <SidebarPanel
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          documents={sidebarDocs}
          onDocumentSelect={handleDocumentSelect}
          onLogout={logout}
          user={user}
        />
      </div>

      <main className="flex-1 mt-[4rem] p-6 space-y-6 overflow-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Bienvenido, {user?.name}</h1>
        </div>

        <div className="flex border-b border-gray-200 space-x-4">
          <button
            className={`py-2 px-4 font-medium border-b-2 ${
              activeTab === 'upload' ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent'
            }`}
            onClick={() => handleTabChange('upload')}
          >
            Procesar Documentos
          </button>

          <button
            className={`py-2 px-4 font-medium border-b-2 ${
              activeTab === 'allDocs' ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent'
            }`}
            onClick={() => handleTabChange('allDocs')}
          >
            Ver Todos los Documentos
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p>{error}</p>
          </div>
        )}

        {activeTab === 'upload' && (
          <>
            {selectedFullDocument ? (
              <DocumentDetails documents={[selectedFullDocument]} loading={false} />
            ) : !processed ? (
              <FileUpload onProcess={handleProcess} processing={processing} />
            ) : (
              <DocumentDetails documents={results} loading={processing} />
            )}
          </>
        )}

        {activeTab === 'allDocs' && (
          <DocumentList
            documents={sidebarDocs}
            loading={false}
            onSelect={handleDocumentSelect}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
