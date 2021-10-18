import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ScrollToTop from 'src/ScrollToTop'
import { createTheme, ThemeProvider } from '@material-ui/core'
import Inter from 'src/assets/fonts/Inter-VariableFont_slnt,wght.ttf'
import Loading from 'src/components/Loading'

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
    fontSize: 12,
    fontFamily: 'Inter, sans-serif'
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Inter'), local('Inter-Regular'), url(${Inter}) format('woff2-variations');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <ScrollToTop />
          <Routes />
          <Loading />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default App
