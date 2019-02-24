import React from 'react'
import {Link} from 'gatsby'

interface Props {
  readonly title: string
  readonly children?: React.ReactNode[] | React.ReactNode
}

export default class Layout extends React.Component<Props> {
  render() {
    const {title, children} = this.props

    return (
      <div>
        <header>
          <h1>
            <Link to={`/`}>{title}</Link>
          </h1>
        </header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}
