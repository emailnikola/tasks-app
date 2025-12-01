import '../styles/globals.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { JSX } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { Notifications } from '@mantine/notifications'
import { AppShell, MantineProvider } from '@mantine/core'
import { theme } from '../theme'
import { ReduxProvider } from '../providers/ReduxProvider'
import Header from '../components/Header'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ReduxProvider>
      <MantineProvider theme={theme}>
        <Head>
          <title>Tasks App</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <link rel="shortcut icon" href="/favicon.svg" />
        </Head>
        <AppShell padding="md" header={{ height: 60 }}>
          <AppShell.Header>
            <Header />
          </AppShell.Header>
          <AppShell.Main>
            <Notifications position="top-right" />
            <Component {...pageProps} />
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </ReduxProvider>
  )
}
