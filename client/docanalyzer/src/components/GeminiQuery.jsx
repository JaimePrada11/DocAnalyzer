import { useState } from 'react';
import { PaperAirplaneIcon, DocumentTextIcon, XCircleIcon } from '@heroicons/react/24/outline';

const GeminiQuery = ({ onQuery, processing, results = [] }) => {
  const [prompt, setPrompt] = useState('');
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      onQuery(prompt, files);
      setPrompt('');
      setFiles([]);
    }
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
              Consulta a Gemini
            </label>
            <textarea
              id="prompt"
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Escribe tu pregunta para Gemini..."
              disabled={processing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Archivos de contexto (opcional)
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              className="hidden"
              accept=".pdf,.txt,.jpg,.jpeg,.png"
              disabled={processing}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded transition duration-200 flex items-center justify-center"
              disabled={processing}
            >
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              Seleccionar archivos
            </button>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center truncate">
                    <DocumentTextIcon className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm truncate">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XCircleIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={processing || !prompt.trim()}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200 flex items-center justify-center ${
              processing || !prompt.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <PaperAirplaneIcon className="h-5 w-5 mr-2" />
            {processing ? 'Enviando...' : 'Enviar consulta'}
          </button>
        </form>
      </div>

      {results.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Respuestas de Gemini</h2>
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                {result.error ? (
                  <div className="bg-red-50 p-3 rounded-md text-red-700 text-sm">
                    {result.error}
                  </div>
                ) : (
                  <>
                    <h3 className="font-medium text-gray-800 mb-2">
                      Consulta: <span className="font-normal">"{result.prompt}"</span>
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="whitespace-pre-wrap">{result.respuestaGemini}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiQuery;