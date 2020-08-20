import "../global.css"
import { AppProps } from "next/app"
import Head from "next/head"
import Layout from "../components/Layout/Layout"
import ErrorBoundary from "../components/ErrorBoundary"

const App = ({ Component, pageProps }: AppProps) => (
  <ErrorBoundary>
    <Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ErrorBoundary>
)

export default App
