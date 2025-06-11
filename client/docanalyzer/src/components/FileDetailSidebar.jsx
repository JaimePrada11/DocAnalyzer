import { X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function FileDetailSidebar({ file, onClose }) {
  if (!file) return null;

  return (
    <aside className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg border-l z-50 overflow-y-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">Detalles del archivo</h2>
        <button onClick={onClose}>
          <X />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <p className="text-sm text-gray-500">Nombre</p>
          <p className="font-medium">{file.name}</p>
        </div>

        <Tabs defaultValue="info">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="info">Detalles</TabsTrigger>
            <TabsTrigger value="activity">Actividad</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-2 mt-4">
            <div>
              <p className="text-sm text-gray-500">Tipo</p>
              <p className="font-medium">{file.type || "Desconocido"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tamaño</p>
              <p className="font-medium">{file.size || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ubicación</p>
              <p className="font-medium">{file.location || "Mi unidad"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Propietario</p>
              <p className="font-medium">{file.owner || "Yo"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Modificado</p>
              <p className="font-medium">{file.modified || "—"}</p>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-4">
            {file.activity?.length > 0 ? (
              <ul className="space-y-2">
                {file.activity.map((act, i) => (
                  <li key={i} className="text-sm text-gray-700">
                    {act}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Sin actividad reciente</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </aside>
  );
}
