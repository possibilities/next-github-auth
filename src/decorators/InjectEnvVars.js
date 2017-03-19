import { Component } from 'react'
import NextGlobalClientStore from '../modules/NextGlobalClientStore'
import getAndAssertEnvVar from '../modules/getAndAssertEnvVar'

const loadEnvironmentVars = namesToAliases => {
  let environment = {}
  Object.keys(namesToAliases).forEach(key => {
    const value = getAndAssertEnvVar(key)
    const alias = namesToAliases[key]
    environment[alias] = value
  })

  return environment
}

const InjectEnvVars = namesToAliases => Page => {
  return class InjectEnvVarsWrapper extends Component {
    static async getInitialProps (context) {
      const env = process.browser
        ? NextGlobalClientStore.get('env')
        : loadEnvironmentVars(namesToAliases)

      const pageProps = Page.getInitialProps
        ? await Page.getInitialProps({ ...context, env })
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

export default InjectEnvVars