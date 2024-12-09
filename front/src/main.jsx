import { StrictMode } from 'react'
import { CssBaseline } from '@mui/material';
import { createRoot } from 'react-dom/client'
import { createTheme, ThemeProvider,  } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './App.jsx'
import './index.css'
export const theme= createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#12310c',
    },
    secondary: {
      main: '#f3f5f4',
    },
    background: {
      default: '#edf2f4',
      paper: '#ffffff',
    },
    info: {
      main: '#f17300',
    },
    text: {
      primary: '#2b2d42',
      secondary: '#f2f3ee',
    },
  },
  typography: {
    h3: {
      fontFamily: 'Droid Serif',
    },
    h4: {
      fontFamily: 'Droid Serif',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
  }
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
