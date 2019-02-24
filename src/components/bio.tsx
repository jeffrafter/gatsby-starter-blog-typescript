import React from 'react'
import {StaticQuery, graphql} from 'gatsby'

type StaticQueryData = {
  site: {
    siteMetadata: {
      author: {
        name: string
      }
      social: {
        twitter: string
      }
    }
  }
}

export default function() {
  return (
    <StaticQuery
      query={graphql`
        query StaticQuery {
          site {
            siteMetadata {
              author {
                name
              }
              social {
                twitter
              }
            }
          }
        }
      `}
      render={(data: StaticQueryData) => {
        const {author, social} = data.site.siteMetadata
        return (
          <div>
            <p>
              Written by <strong>{author.name}</strong> who lives and works in San Francisco
              building useful things.
              {` `}
              <a href={social.twitter}>You should follow him on Twitter</a>
            </p>
          </div>
        )
      }}
    />
  )
}
