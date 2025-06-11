import { UploadCloud, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const activities = [
  {
    type: "upload",
    message: "Subiste 3 documentos",
    time: "Hace 10 minutos",
  },
  {
    type: "processed",
    message: "Procesamiento completado: Contrato.pdf",
    time: "Hace 1 hora",
  },
  {
    type: "upload",
    message: "Subiste Identificación_CL.jpg",
    time: "Hace 3 horas",
  },
  {
    type: "processed",
    message: "Procesamiento completado: Factura.docx",
    time: "Ayer, 5:30 PM",
  },
];

const iconMap = {
  upload: <UploadCloud className="text-blue-500" size={14} />,
  processed: <CheckCircle className="text-green-500" size={14} />,
};

export default function ActivityTimeline() {
  return (
    <Card className="shadow-md border rounded-2xl bg-white">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-6 text-foreground">
          Historial de actividad
        </h3>
        <div className="relative pl-6 border-l border-muted space-y-5">
          {activities.map((activity, idx) => (
            <div key={idx} className="relative">
              {/* Punto e ícono */}
              <div className="absolute -left-[12px] top-1 translate-y-[1px] bg-background border border-muted rounded-full w-5 h-5 flex items-center justify-center shadow">
                {iconMap[activity.type]}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {activity.message}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
