import Head from "next/head"
import React from "react"
import Input from "../components/Input/Input"
import SearchIcon from "../icons/search.svg"

const Home = () => {
  return (
    <>
      <Head>
        <title>Grayson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="px-3">
        <label
          className="flex border rounded bg-white w-full block"
          aria-label="search"
        >
          <img alt="search icon" src={SearchIcon} className="m-3" />
          <Input className="w-full" />
        </label>
      </div>
    </>
  )
}

export default Home
