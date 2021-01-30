import "../global.css"
import { AppProps } from "next/app"
import Head from "next/head"
import { QueryClient, QueryClientProvider } from "react-query"
import Layout from "../components/Layout/Layout"
import ErrorBoundary from "../components/ErrorBoundary"

const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppProps) => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  </ErrorBoundary>
)

export default App
