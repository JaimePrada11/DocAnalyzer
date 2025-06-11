import {
  X,
  Upload,
  PlusCircle,
  FileText,
  MessageCircle,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import clsx from "clsx";

export default function SidebarPanel({ open, setOpen }) {
  const documents = [
    { id: 1, title: "Informe 2024.pdf" },
    { id: 2, title: "Resumen mensual.docx" },
  ];

  const chats = [
    { id: 1, name: "Sofía", preview: "¿Terminaste el informe?" },
    { id: 2, name: "Carlos", preview: "Te envié el archivo." },
  ];

  const handleLogout = () => alert("Sesión cerrada");

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={clsx(
          "fixed md:static z-40 md:z-0 top-0 left-0 h-full w-80 bg-white shadow-md flex flex-col justify-between transition-transform duration-300",
          {
            "-translate-x-full": !open,
            "translate-x-0": open,
            "md:translate-x-0": true,
          }
        )}
      >
        <div className="p-5 space-y-6 overflow-y-auto">
          {/* Cerrar en mobile */}
          <div className="flex justify-end md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X size={20} />
            </Button>
          </div>

          {/* Acciones principales */}
          <div className="space-y-3">
            <Button variant="default" className="w-full justify-start gap-2 rounded-xl shadow-sm">
              <Upload size={18} /> Procesar documento
            </Button>
            <Button variant="secondary" className="w-full justify-start gap-2 rounded-xl shadow-sm">
              <PlusCircle size={18} /> Nuevo chat
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-270px)] pr-2">
            {/* Documentos recientes */}
            <section className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2 uppercase tracking-wide">
                <FileText size={16} /> Documentos recientes
              </h3>
              <ul className="space-y-1 text-sm">
                {documents.map((doc) => (
                  <li
                    key={doc.id}
                    className="hover:bg-muted px-3 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    {doc.title}
                  </li>
                ))}
              </ul>
            </section>

            {/* Chats recientes */}
            <section className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2 uppercase tracking-wide">
                <MessageCircle size={16} /> Mis Chats
              </h3>
              <ul className="space-y-2 text-sm">
                {chats.map((chat) => (
                  <li
                    key={chat.id}
                    className="hover:bg-muted px-3 py-2 rounded-xl cursor-pointer transition-colors"
                  >
                    <div className="font-medium text-foreground">{chat.name}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {chat.preview}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </ScrollArea>
        </div>

        {/* Footer de usuario */}
        <div className="border-t p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="Usuario"
              className="w-10 h-10 rounded-full"
            />
            <div className="text-sm leading-tight">
              <p className="font-semibold">Jimmy Shergill</p>
              <p className="text-xs text-muted-foreground">info@dash.com</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut size={18} />
          </Button>
        </div>
      </aside>
    </>
  );
}
