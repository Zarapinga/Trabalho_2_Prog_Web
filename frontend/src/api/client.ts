import axios from 'axios';

// URL base da API. Lida de variável de ambiente para funcionar tanto em dev
// local quanto dentro de containers Docker. Fallback para o servidor de dev.
export const API_ORIGIN =
  import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000';

export const apiClient = axios.create({
  baseURL: `${API_ORIGIN}/api`,
});

// Resolve o caminho relativo de um arquivo de mídia para URL absoluta.
export function mediaUrl(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${API_ORIGIN}${path}`;
}
