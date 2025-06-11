import {
  BadgeCheck,
  User,
  IdCard,
  MapPin,
  FileText,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FileSummaryPanel({ summary }) {
  if (!summary) return null;

  const { nombre, documento, ubicacion, resumen } = summary;

  return (
    <Card className="shadow-md border border-muted rounded-2xl">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BadgeCheck className="text-green-600" size={22} />
            <h2 className="text-lg font-semibold text-foreground">
              Resumen del documento
            </h2>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-500">
            Procesado
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-start gap-3">
            <User className="text-blue-500" size={18} />
            <div>
              <p className="text-muted-foreground">Nombre</p>
              <p className="text-foreground font-medium">{nombre}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <IdCard className="text-blue-500" size={18} />
            <div>
              <p className="text-muted-foreground">Documento de identidad</p>
              <p className="text-foreground font-medium">{documento}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="text-blue-500" size={18} />
            <div>
              <p className="text-muted-foreground">Ubicación</p>
              <p className="text-foreground font-medium">{ubicacion}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 col-span-1 sm:col-span-2">
            <FileText className="text-blue-500" size={18} />
            <div>
              <p className="text-muted-foreground">Resumen</p>
              <p className="text-foreground font-medium">{resumen}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-4 text-xs text-green-600">
          <CheckCircle size={16} />
          Documento analizado correctamente
        </div>
      </CardContent>
    </Card>
  );
}
