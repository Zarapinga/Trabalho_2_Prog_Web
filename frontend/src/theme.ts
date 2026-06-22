import { createTheme } from '@mui/material/styles';

// Tema da aplicação. Paleta sóbria em tons de índigo/teal para diferenciar de
// defaults óbvios, com tipografia levemente mais densa.
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#3a4f9a' },
    secondary: { main: '#0f8a86' },
    background: { default: '#f4f5fa' },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
  },
  components: {
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
  },
});

// Cores para as fatias dos gráficos do dashboard.
export const CHART_COLORS = [
  '#3a4f9a',
  '#0f8a86',
  '#e0913a',
  '#c0504d',
  '#7d5ba6',
  '#4f9a3a',
  '#3a8f9a',
  '#9a3a7d',
];
