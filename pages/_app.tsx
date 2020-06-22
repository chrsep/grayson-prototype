import "../global.css"
import { useEffect } from "react"
import { AppProps } from "next/app"
import Layout from "../components/Layout/Layout"

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
    // NOTE: set skipWaiting to false in next.config.js pwa object
    // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
    window.workbox.addEventListener("waiting", () => {
      if (
        // eslint-disable-next-line no-alert
        window.confirm(
          "A new version is installed, reload to use the new version immediately?"
        )
      ) {
        window.workbox.addEventListener("controlling", () => {
          window.location.reload()
        })
        window.workbox.messageSW({ type: "SKIP_WAITING" })
      } else {
        // User rejected, new verion will be automatically load when user open the app next time.
      }
    })
  }, [])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
