import type { ReactNode } from 'react';
import { Box, Paper, Typography } from '@mui/material';

interface Props {
  title: string;
  children: ReactNode;
}

// Cartão padrão para abrigar um gráfico do dashboard.
export default function ChartCard({ title, children }: Props) {
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>
      <Box sx={{ width: '100%', height: 280 }}>{children}</Box>
    </Paper>
  );
}
