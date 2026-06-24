import type { ReactNode } from "react";
import { Box, Button, Paper } from "@mui/material";
import ClearIcon from "@mui/icons-material/FilterAltOff";

/**
 * Props para o componente FilterBar
 * @interface Props
 * @property {ReactNode} children - Elementos filhos (campos de busca e filtros)
 * @property {() => void} [onClear] - Callback ao limpar filtros
 * @property {boolean} [showClear] - Se deve mostrar o botão de limpar
 */
interface Props {
  children: ReactNode;
  onClear?: () => void;
  showClear?: boolean;
}

/**
 * Barra de filtros que agrupa a busca e os dropdowns de filtro
 * Inclui botão para limpar todos os filtros
 * @component
 * @example
 * return (
 *   <FilterBar onClear={handleClearFilters} showClear={true}>
 *     <SearchBar value={search} onChange={setSearch} />
 *     <SelectFilter value={status} onChange={setStatus} />
 *   </FilterBar>
 * )
 */
export default function FilterBar({ children, onClear, showClear }: Props) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1.5,
        mb: 2,
        display: "flex",
        gap: 1.5,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {children}
      {onClear && (
        <Box sx={{ ml: "auto" }}>
          <Button
            size="small"
            startIcon={<ClearIcon />}
            onClick={onClear}
            disabled={!showClear}
          >
            Limpar filtros
          </Button>
        </Box>
      )}
    </Paper>
  );
}
