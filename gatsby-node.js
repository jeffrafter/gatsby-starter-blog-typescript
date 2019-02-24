'use strict'

const path = require('path')

exports.onCreateNode = ({node, actions, getNode}) => {
  const {createNodeField} = actions

  switch (node.internal.type) {
    case 'MarkdownRemark': {
      let {slug, permalink, layout} = node.frontmatter
      let {relativePath} = getNode(node.parent)

      slug = slug || permalink || `/${relativePath.replace('.md', '')}/`

      // Used to generate URL to view this content.
      createNodeField({
        node,
        name: 'slug',
        value: slug,
      })

      // Used to determine a page layout.
      createNodeField({
        node,
        name: 'layout',
        value: layout || '',
      })
    }
  }
}

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions

  const allMarkdown = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              layout
              slug
            }
          }
        }
      }
    }
  `)

  if (allMarkdown.errors) {
    console.error(allMarkdown.errors)
    throw new Error(allMarkdown.errors)
  }

  allMarkdown.data.allMarkdownRemark.edges.forEach(({node}) => {
    const {slug, layout} = node.fields

    createPage({
      // This will automatically resolve the template to a corresponding
      // `layout` frontmatter in the Markdown.
      //
      // Feel free to set any `layout` as you'd like in the frontmatter, as
      // long as the corresponding template file exists in src/templates.
      // If no template is set, it will fall back to the default `post`
      // template.
      //
      // Note that the template has to exist first, or else the build will fail.
      component: path.resolve(`./src/templates/${layout || 'post'}.tsx`),
      path: slug,
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug,
      },
    })
  })
}
