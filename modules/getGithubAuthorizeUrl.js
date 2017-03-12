const githubAuthorizeUrl = 'https://github.com/login/oauth/authorize'

const queryStringFromObj = queryObj =>
  Object.keys(queryObj)
    .map(key => `${key}=${queryObj[key]}`)
    .join('&')

const getGithubAuthorizeUrl = githubClientId => {
  if (!githubClientId) {
    throw new Error('Client id is not defined')
  }
  const afterAuthUrl = `${window.location.origin}/sign-in`

  const githubAuthorizeParams = queryStringFromObj({
    client_id: githubClientId,
    redirect_uri: afterAuthUrl,
    scope: 'repo'
  })

  return `${githubAuthorizeUrl}?${githubAuthorizeParams}`
}

export default getGithubAuthorizeUrl
