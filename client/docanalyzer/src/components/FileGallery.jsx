// components/FileGallery.jsx
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import FileDetailSidebar from "./FileDetailSidebar";

const mockFiles = [
  {
    id: 1,
    name: "Contrato.pdf",
    size: "1.2 MB",
    type: "PDF",
    uploadedAt: new Date(),
    owner: "Tú",
    modifiedAt: new Date(),
    location: "Carpeta legal",
  },
  {
    id: 2,
    name: "Factura.docx",
    size: "800 KB",
    type: "Word",
    uploadedAt: new Date(Date.now() - 3600 * 1000 * 5),
    owner: "Tú",
    modifiedAt: new Date(Date.now() - 3600 * 1000 * 5),
    location: "Facturas",
  },
  {
    id: 3,
    name: "Wireframes Project A.zip",
    size: "1.56 GB",
    type: "ZIP",
    uploadedAt: new Date(Date.now() - 3600 * 1000 * 24),
    owner: "Tú",
    modifiedAt: new Date(Date.now() - 3600 * 1000 * 24),
    location: "Diseño",
  },
];

export default function FileGallery() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenSidebar = (file) => {
    setSelectedFile(file);
    setSidebarOpen(true);
  };

  return (
    <div className="relative flex w-full">
      <ScrollArea className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {mockFiles.map((file) => (
          <Card
            key={file.id}
            onClick={() => handleOpenSidebar(file)}
            onContextMenu={(e) => {
              e.preventDefault();
              handleOpenSidebar(file);
            }}
            className="cursor-pointer hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-4 space-y-2">
              <div className="font-semibold text-lg">{file.name}</div>
              <div className="text-sm text-muted-foreground">{file.size}</div>
              <div className="text-xs text-gray-500">
                Subido hace {formatDistanceToNow(file.uploadedAt, { addSuffix: true })}
              </div>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>

      <FileDetailSidebar
        file={selectedFile}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </div>
  );
}
