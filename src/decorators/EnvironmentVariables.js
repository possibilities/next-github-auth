import React, { Component } from 'react'
import NextGlobalClientStore from '../modules/NextGlobalClientStore'
import demandEnvVar from '../modules/demandEnvVar'

const loadEnvironmentVars = namesToAliases => {
  let environment = {}
  Object.keys(namesToAliases).forEach(key => {
    const value = demandEnvVar(key)
    const alias = namesToAliases[key]
    environment[alias] = value
  })

  return environment
}

const EnvironmentVariables = namesToAliases => Page => {
  return class EnvironmentVariablesWrapper extends Component {
    static async getInitialProps (pageContext) {
      const env = process.browser
        ? NextGlobalClientStore.get('env')
        : loadEnvironmentVars(namesToAliases)

      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps({ ...pageContext, env })
        : {}

      return { ...pageProps, env }
    }

    constructor (props) {
      super(props)
      if (process.browser) {
        NextGlobalClientStore.set('env', props.env)
      }
    }

    render () {
      return <Page {...this.props} />
    }
  }
}

export default EnvironmentVariables
