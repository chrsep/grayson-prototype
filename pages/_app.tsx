import "../global.css"
import Layout from "../components/Layout/Layout"

const App = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
)

export default App
