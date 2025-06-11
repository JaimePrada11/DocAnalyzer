import { useRef, useState } from 'react';
import { DocumentTextIcon, XCircleIcon } from '@heroicons/react/24/outline';

const FileUpload = ({ onUpload, processing }) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef();

  const handleChange = (e) => {
    setFiles([...e.target.files]);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0) {
      onUpload(files);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subir documentos (PDF, TXT, imágenes)
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleChange}
            multiple
            className="hidden"
            accept=".pdf,.txt,.jpg,.jpeg,.png"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded transition duration-200"
          >
            Seleccionar archivos
          </button>
        </div>

        {files.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Archivos seleccionados:</h3>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center">
                    <DocumentTextIcon className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm truncate max-w-xs">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XCircleIcon className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          disabled={processing || files.length === 0}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200 ${
            (processing || files.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {processing ? 'Procesando...' : 'Procesar documentos'}
        </button>
      </form>
    </div>
  );
};

export default FileUpload;