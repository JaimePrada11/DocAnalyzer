import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";

export default function AIChatPanel() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "### Bienvenido al Asistente IA\n\nPuedes consultarme sobre documentos, datos o pedir un resumen. Por ejemplo:\n\n- ¿Cuál es el objetivo del contrato?\n- ¿Qué obligaciones tiene la parte A?\n\nEscribe tu consulta abajo 👇",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Simulación de respuesta de IA (Gemini o similar)
      const fakeGeminiResponse = {
        role: "assistant",
        content: `**Gracias por tu consulta.**\n\nEste documento incluye los siguientes elementos clave:\n\n1. **Nombre del cliente:** Juan Pérez\n2. **Identificación:** 12345678\n3. **Ubicación:** Bogotá, Colombia\n\n### Resumen del documento\n\nEl documento es un contrato de servicios entre las partes, donde se establecen obligaciones, plazos de entrega y condiciones de cancelación. Se recomienda revisar especialmente las cláusulas 3, 5 y 8.`,
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, fakeGeminiResponse]);
        setLoading(false);
      }, 1200);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Error al procesar la solicitud." },
      ]);
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-sm border rounded-2xl">
      <CardContent className="p-6 flex flex-col h-[600px]">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Asistente Inteligente</h3>

        {/* Chat content */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {messages.map((msg, idx) => (
            <div key={idx} className="w-full">
              <div
                className={`p-4 rounded-xl text-sm ${
                  msg.role === "user"
                    ? "bg-blue-100 text-blue-900 self-end ml-auto max-w-[80%]"
                    : "bg-muted text-muted-foreground max-w-[90%]"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm dark:prose-invert max-w-full">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-sm text-muted-foreground">Escribiendo respuesta...</div>
          )}
        </div>

        {/* Input area */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="mt-4 flex items-end gap-2"
        >
          <Textarea
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu consulta..."
            className="resize-none"
          />
          <Button type="submit" disabled={loading}>
            Enviar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
