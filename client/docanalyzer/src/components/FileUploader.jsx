import { useRef, useState } from "react";
import { Upload, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FileUploader({ onProcess }) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = (fileList) => {
    const selected = Array.from(fileList);
    setFiles(selected);
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleProcess = () => {
    if (files.length > 0) {
      onProcess?.(files);
    }
  };

  return (
    <div className="space-y-4">
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
          isDragging ? "border-blue-500 bg-blue-50" : "border-muted"
        )}
      >
        <input
          type="file"
          ref={inputRef}
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <Upload size={28} className="text-blue-500" />
          <p className="font-medium text-foreground">
            Haz clic o arrastra uno o más archivos
          </p>
          <span className="text-xs text-muted-foreground">
            Archivos permitidos: PDF, DOCX, TXT, etc.
          </span>

          {files.length > 0 && (
            <div className="mt-4 w-full text-left space-y-1">
              {files.map((file, i) => (
                <div key={i} className="flex items-center gap-2 text-foreground text-sm">
                  <File size={16} />
                  <span className="truncate">{file.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {files.length > 0 && (
        <Button onClick={handleProcess} className="w-full">
          Procesar archivos
        </Button>
      )}
    </div>
  );
}
