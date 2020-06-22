import "../global.css"
import { AppProps } from "next/app"
import Layout from "../components/Layout/Layout"

const App = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
)

export default App
