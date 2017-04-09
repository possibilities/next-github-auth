import React, { Component } from 'react'
import invariant from 'invariant'

const PageDecoratorInvariant = decoratorName => Page => {
  return class WrappedPage extends Component {
    static async getInitialProps (pageContext) {
      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps(pageContext)
        : {}

      return { ...pageProps, __isWrappingPageComponent: true }
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
