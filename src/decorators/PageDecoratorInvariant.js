import React, { Component } from 'react'
import invariant from 'invariant'

const PageDecoratorInvariant = decoratorName => Page => {
  return class WrappedPage extends Component {
    static async getInitialProps (nextPageContext) {
      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps(nextPageContext)
        : {}

      return process.env.NODE_ENV === 'development'
        ? { ...pageProps, __isWrappingPageComponent: true }
        : pageProps
    }

    constructor (props) {
      super(props)
      invariant(
        props.__isWrappingPageComponent,
        `${decoratorName} decorator can only be used to wrap Next.js pages`
      )
    }

    render () {
      return <Page {...this.props} />
    }
  }
}

export default PageDecoratorInvariant
