import { useRef, useState } from "react";
import { Upload, File, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FileUpload({ onProcess, processing = false }) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = (fileList) => {
    const selected = Array.from(fileList);
    setFiles((prev) => [...prev, ...selected]);
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const handleProcess = () => {
    if (files.length > 0) {
      onProcess?.(files);
    }
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        )}
      >
        <input
          type="file"
          ref={inputRef}
          multiple
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.txt,.docx,.jpg,.jpeg,.png"
        />

        <div className="flex flex-col items-center gap-2 text-sm text-gray-500">
          <Upload size={28} className="text-blue-500" />
          <p className="font-medium text-gray-700">
            Haz clic o arrastra uno o más archivos
          </p>
          <span className="text-xs">PDF, DOCX, TXT, imágenes...</span>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Archivos seleccionados:</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-50 p-2 rounded"
              >
                <div className="flex items-center gap-2 text-sm">
                  <File size={16} />
                  <span className="truncate max-w-xs">{file.name}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <XCircle size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button
        onClick={handleProcess}
        disabled={processing || files.length === 0}
        className="w-full"
      >
        {processing ? "Procesando..." : "Procesar archivos"}
      </Button>
    </div>
  );
}
