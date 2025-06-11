export default function FileInfoSidebar({ file, open, onClose }) {
  if (!open || !file) return null;

  return (
    <aside className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg border-l z-50 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Detalles del archivo</h2>
        <button onClick={onClose}>✕</button>
      </div>
      <p><strong>Nombre:</strong> {file.name}</p>
      <p><strong>Tamaño:</strong> {file.size}</p>
      <p><strong>Tipo:</strong> {file.type}</p>
      <p><strong>Subido por:</strong> {file.owner}</p>
      <p><strong>Modificado:</strong> {file.modified}</p>
    </aside>
  );
}
