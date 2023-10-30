import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from '@/themes'
import { SWRConfig } from 'swr'
import { SharedProvider } from '@/context/shared/SharedProvider'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SWRConfig
      value={{
        // eslint-disable-next-line @typescript-eslint/promise-function-async
        fetcher: (resource, init) =>
          // eslint-disable-next-line @typescript-eslint/promise-function-async
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <SharedProvider>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </SharedProvider>
    </SWRConfig>
  )
}
