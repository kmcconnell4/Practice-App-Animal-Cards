import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#FF6B35', light: '#FF9A6C', dark: '#C94B1A' },
    secondary: { main: '#4ECDC4', light: '#80E8E0', dark: '#2A9D94' },
    background: { default: '#FFF9F0', paper: '#FFFFFF' },
    error: { main: '#FF4D6D' },
    success: { main: '#6BCB77' },
  },
  typography: {
    fontFamily: '"Nunito", "Arial Rounded MT Bold", Arial, sans-serif',
    h1: { fontSize: '2rem', fontWeight: 800 },
    h2: { fontSize: '1.5rem', fontWeight: 700 },
    h3: { fontSize: '1.25rem', fontWeight: 700 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', lineHeight: 1.5 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 24, textTransform: 'none', fontWeight: 700, minHeight: 48, minWidth: 48 },
      },
    },
    MuiIconButton: {
      styleOverrides: { root: { minHeight: 48, minWidth: 48 } },
    },
    MuiCard: {
      styleOverrides: { root: { borderRadius: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.10)' } },
    },
  },
});

export default theme;
