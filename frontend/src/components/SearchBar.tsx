import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

/**
 * Props para o componente SearchBar
 * @interface Props
 * @property {string} value - Valor atual do campo de busca
 * @property {(value: string) => void} onChange - Callback quando o valor muda
 * @property {string} [placeholder] - Placeholder do campo de busca
 */
interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * Componente de barra de busca com ícone
 * @component
 * @example
 * return (
 *   <SearchBar
 *     value={searchTerm}
 *     onChange={setSearchTerm}
 *     placeholder="Procure por nome..."
 *   />
 * )
 */
export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <TextField
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ?? "Buscar..."}
      sx={{ width: { xs: "100%", sm: 320 } }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
