import DocumentCard from './DocumentCard';

const DocumentList = ({ documents, loading, onSelect }) => {
  if (loading) {
    return <p className="text-center text-gray-500">Cargando documentos...</p>;
  }

  if (!documents || documents.length === 0) {
    return <p className="text-center text-gray-500">No hay documentos disponibles.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {documents.map((doc) => (
        <DocumentCard key={doc.id} document={doc} onClick={() => onSelect(doc.id)} />
      ))}
    </div>
  );
};

export default DocumentList;
