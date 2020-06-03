import Head from "next/head"
import React from "react"

const Home = () => {
  return (
    <>
      <Head>
        <title>Grayson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="title px-3">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
    </>
  )
}

export default Home
