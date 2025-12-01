import { JSX } from 'react'
import { Html, Head, Main, NextScript } from 'next/document'
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core'

export default function Document(): JSX.Element {
  return (
    <Html lang="en" {...mantineHtmlProps}>
      <Head>
        <ColorSchemeScript />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
