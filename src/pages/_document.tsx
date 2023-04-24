import { getCssText } from '@ignite-ui/react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import React, { ReactElement } from 'react'

interface MyDocumentProps {
  styles: ReactElement
}

function MyDocument({ styles }: MyDocumentProps) {
  return (
    <Html lang="pt-br">
      <Head>{styles}</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx)
  const cssText = getCssText()

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      <style
        key="stitches"
        id="stitches"
        dangerouslySetInnerHTML={{ __html: cssText }}
      />,
    ],
  }
}

export default MyDocument
