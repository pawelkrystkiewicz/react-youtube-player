import { StyledEngineProvider, ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { Theme } from '@mui/material/styles'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import theme from './theme'

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
