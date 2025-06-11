import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function DocumentGallery({ documents = [] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">📂 Documentos cargados</h3>

      {documents.length === 0 ? (
        <p className="text-muted-foreground text-sm">No hay documentos cargados aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {documents.map((doc, idx) => (
            <Card
              key={idx}
              className="flex items-center gap-4 p-4 border hover:shadow-md transition-all cursor-pointer"
            >
              <FileText size={28} className="text-blue-600 shrink-0" />
              <CardContent className="p-0">
                <h4 className="text-md font-semibold truncate">{doc.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {doc.size ? (doc.size / 1024).toFixed(1) + " KB" : "Tamaño desconocido"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
