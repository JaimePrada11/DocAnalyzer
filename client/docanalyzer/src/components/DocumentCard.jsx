import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileAlt,
} from "react-icons/fa";

const iconMap = {
  pdf: <FaFilePdf className="text-red-600 text-6xl" />,
  docx: <FaFileWord className="text-blue-600 text-6xl" />,
  xlsx: <FaFileExcel className="text-green-600 text-6xl" />,
  default: <FaFileAlt className="text-gray-500 text-6xl" />,
};

const DocumentCard = ({ document, onClick }) => {
  const { name, createdAt, fileType, fileSize } = document;

  const ext = fileType?.split("/").pop()?.toLowerCase() || "default";
  const icon = iconMap[ext] || iconMap.default;

  const sizeKB = fileSize ? (fileSize / 1024).toFixed(2) : null;

  return (
    <Card
      className="w-full max-w-md cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}  
    >
      <CardHeader className="flex flex-row items-center space-x-4">
        <div>{icon}</div>
        <div className="flex-1">
          <CardTitle className="text-base truncate">{name || "Sin nombre"}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {createdAt
              ? format(new Date(createdAt), "dd/MM/yyyy HH:mm")
              : "Fecha desconocida"}
          </p>
          {sizeKB && (
            <p className="text-xs text-gray-500 mt-1">{sizeKB} KB</p>
          )}
        </div>
      </CardHeader>
      <CardContent>
      </CardContent>
    </Card>
  );
};

export default DocumentCard;
