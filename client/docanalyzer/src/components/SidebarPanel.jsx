import {
  X,
  FileText,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import clsx from "clsx";


export default function SidebarPanel({
  open,
  setOpen,
  documents = [],
  onDocumentSelect,
  onLogout, user
  
}) {


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
          <div className="flex justify-end md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X size={20} />
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-270px)] pr-2">
            <section className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2 uppercase tracking-wide">
                <FileText size={16} /> Documentos recientes
              </h3>
              <ul className="space-y-1 text-sm">
                {Array.isArray(documents) &&
                  documents.map((doc) => (
                    <li
                      key={doc.id}
                      onClick={() => onDocumentSelect?.(doc.id)}
                      className="hover:bg-muted px-3 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      {doc.fileName || `Documento ${doc.id}`}
                    </li>
                  ))}
              </ul>
            </section>
          </ScrollArea>
        </div>

        <div className="border-t p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="Usuario"
              className="w-10 h-10 rounded-full"
            />
            <div className="text-sm leading-tight">
              <p className="font-semibold">{user?.name || "..."}</p>
              <p className="text-xs text-muted-foreground">{user?.email || "..."}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onLogout}>
            <LogOut size={18} />
          </Button>
        </div>
      </aside>
    </>
  );
}
