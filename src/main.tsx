import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './theme/index.css'
import { Provider as AppContext } from 'react-redux'
import { theme, ThemeProvider } from './theme'
import { ColorModeScript } from '@chakra-ui/react'
import { store } from './redux/'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContext store={store}>
      <ThemeProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ThemeProvider>
    </AppContext>
  </StrictMode>,
)
