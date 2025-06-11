import { DocumentTextIcon, CalendarIcon, UserIcon, MapPinIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

const DocumentList = ({ documents = [], loading }) => {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No hay documentos procesados</h3>
        <p className="mt-1 text-sm text-gray-500">Sube archivos para comenzar el análisis</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-[600px]">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Resultados del análisis</h2>
      <div className="space-y-6">
        {documents.map((doc, index) => (
          <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-md font-medium text-blue-600 flex items-center">
                <DocumentTextIcon className="h-5 w-5 mr-2" />
                {doc.nombre_archivo || `Documento ${index + 1}`}
              </h3>
              <span className="text-xs text-gray-500">{doc.tipo_archivo}</span>
            </div>

            {doc.error ? (
              <div className="bg-red-50 p-3 rounded-md text-red-700 text-sm">
                {doc.error}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-start">
                    <UserIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Nombre</p>
                      <p className="text-sm">{doc.nombre || 'No identificado'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ClipboardDocumentListIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Documento</p>
                      <p className="text-sm">{doc.documento || 'No identificado'}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Ubicación</p>
                      <p className="text-sm">{doc.ubicacion || 'No identificada'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CalendarIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Procesado</p>
                      <p className="text-sm">
                        {new Date(doc.procesado).toLocaleString() || 'Desconocido'}
                      </p>
                    </div>
                  </div>
                </div>
                {doc.puntos_clave && (
                  <div className="md:col-span-2">
                    <p className="text-xs text-gray-500 mb-1">Puntos clave</p>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {doc.puntos_clave.map((punto, i) => (
                        <li key={i}>{punto}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {doc.resumen && (
                  <div className="md:col-span-2">
                    <p className="text-xs text-gray-500 mb-1">Resumen</p>
                    <p className="text-sm italic">{doc.resumen}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;