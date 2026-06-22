import { MenuItem, TextField } from '@mui/material';

export interface FilterOption {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  minWidth?: number;
}

// Dropdown reutilizável para um filtro client-side. Valor vazio = "Todos".
export default function FilterSelect({
  label,
  value,
  options,
  onChange,
  minWidth = 180,
}: Props) {
  return (
    <TextField
      select
      size="small"
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ minWidth }}
    >
      <MenuItem value="">Todos</MenuItem>
      {options.map((o) => (
        <MenuItem key={o.value} value={o.value}>
          {o.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
