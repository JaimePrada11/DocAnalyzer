import { FileText } from "lucide-react";

export default function FileInfoPanel({ files }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Información de los archivos</h3>
      {files.map((file, i) => (
        <div
          key={i}
          className="border rounded-lg p-4 bg-white shadow-sm flex items-start gap-4"
        >
          <FileText size={24} className="text-blue-500 mt-1" />
          <div>
            <p className="font-medium text-foreground">{file.name}</p>
            <p className="text-sm text-muted-foreground">
              Tamaño: {(file.size / 1024).toFixed(1)} KB
            </p>
            <p className="text-sm text-muted-foreground">
              Tipo: {file.type || "Desconocido"}
            </p>
            {/* Puedes añadir fecha, contenido simulado, etc. */}
          </div>
        </div>
      ))}
    </div>
  );
}
