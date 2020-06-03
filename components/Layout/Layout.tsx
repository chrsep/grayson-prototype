import { FC } from "react"

const Layout: FC = ({ children }) => {
  return (
    <div>
      <nav className="p-3">Grayson</nav>
      {children}
    </div>
  )
}

export default Layout
