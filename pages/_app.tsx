import "../global.css"
import { AppProps } from "next/app"
import Layout from "../components/Layout/Layout"
import ErrorBoundary from "../components/ErrorBoundary"

const App = ({ Component, pageProps }: AppProps) => (
  <ErrorBoundary>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ErrorBoundary>
)

export default App
