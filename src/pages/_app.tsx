import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from '@/themes'
import { SWRConfig } from 'swr'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SWRConfig
      value={{
        fetcher: async (resource, init) =>
          await fetch(resource, init).then(async (res) => await res.json()),
      }}
    >
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  )
}
