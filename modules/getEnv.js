import assertEnvVar from '../modules/assertEnvVar'
import NextGlobalClientData from '../modules/NextGlobalClientData'

const getEnv = () => {
  // Accumulate the data server side
  if (!process.browser) {
    const githubClientId = assertEnvVar('GITHUB_CLIENT_ID')
    return { githubClientId }
  }

  // On the client grab it from a global
  return NextGlobalClientData.get('env')
}

export default getEnv
