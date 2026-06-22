import type { ReactNode } from 'react';
import { Box, Button, Paper } from '@mui/material';
import ClearIcon from '@mui/icons-material/FilterAltOff';

interface Props {
  children: ReactNode;
  onClear?: () => void;
  showClear?: boolean;
}

// Barra que agrupa a busca e os dropdowns de filtro, com botão de limpar.
export default function FilterBar({ children, onClear, showClear }: Props) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1.5,
        mb: 2,
        display: 'flex',
        gap: 1.5,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      {children}
      {onClear && (
        <Box sx={{ ml: 'auto' }}>
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
