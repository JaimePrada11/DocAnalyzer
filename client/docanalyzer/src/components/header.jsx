import { Menu, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Header({ toggleSidebar }) {
  const [search, setSearch] = useState("");

  const handleLogout = () => alert("Sesión cerrada");

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm sticky top-0 z-50">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </Button>

        <div className="hidden md:block leading-tight">
          <h2 className="text-lg font-semibold text-foreground">Hola, Jimmy 👋</h2>
          <p className="text-sm text-muted-foreground">¡Bienvenido de nuevo!</p>
        </div>
      </div>

      {/* Center: Search */}
      <div className="flex-1 mx-4 max-w-md">
        <Input
          type="text"
          placeholder="Buscar documentos o chats..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl"
        />
      </div>

      {/* Right: Avatar menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <img
            src="https://i.pravatar.cc/40"
            alt="Usuario"
            className="w-10 h-10 rounded-full cursor-pointer border border-muted shadow-sm"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm"
          >
            <LogOut size={16} /> Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
