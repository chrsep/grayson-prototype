import Head from "next/head"
import React from "react"

const Home = () => {
  return (
    <div className="container">
      <Head>
        <title>Grayson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>

      <footer className="p-3">Grayson</footer>
    </div>
  )
}

export default Home
