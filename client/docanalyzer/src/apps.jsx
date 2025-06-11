
import "./App.css";

import { useState } from "react";
import SidebarPanel from "./components/SidebarPanel";
import Header from "./components/Header";
import FileUploadPanel from "./components/FileUploader";
import FileSummaryPanel from "./components/FileSummaryPanel";
import ActivityHistoryPanel from "./components/ActivityTimeline";
import AIChatPanel from "./components/AIChatPanel";
import DocumentGallery from "./components/DocumentGallery";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [summaryData, setSummaryData] = useState(null);
  const [activityLog, setActivityLog] = useState([]);

  const handleFilesUpload = (files) => {
    const fileArray = Array.from(files);
    setUploadedFiles((prev) => [...prev, ...fileArray]);

    const newActivities = fileArray.map((file) => ({
      timestamp: new Date().toLocaleString(),
      action: "Archivo subido",
      detail: file.name,
    }));
    setActivityLog((prev) => [...newActivities, ...prev]);
  };

  const handleProcessFiles = () => {
    if (uploadedFiles.length === 0) return;

    const data = {
      name: "Juan Pérez",
      id: "12345678",
      location: "Bogotá, Colombia",
      summary:
        "Este documento es un contrato de servicios entre las partes, que establece obligaciones, condiciones de pago y cláusulas legales.",
    };

    setSummaryData(data);
    setActivityLog((prev) => [
      {
        timestamp: new Date().toLocaleString(),
        action: "Documento procesado",
        detail: uploadedFiles.map((f) => f.name).join(", "),
      },
      ...prev,
    ]);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SidebarPanel open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-6 overflow-auto bg-gray-50 space-y-8">
          {/* Panel de carga de archivos */}
          <FileUploadPanel onUpload={handleFilesUpload} onProcess={handleProcessFiles} />

          {/* Galería de documentos */}
          <DocumentGallery documents={uploadedFiles} />

          {/* Resumen del documento */}
          {summaryData && <FileSummaryPanel data={summaryData} />}

          {/* Historial de actividad */}
          <ActivityHistoryPanel activities={activityLog} />

          {/* Chat con IA */}
          <AIChatPanel />
        </main>
      </div>
    </div>
  );
}
