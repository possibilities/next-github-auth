const githubAuthorizeUrl = 'https://github.com/login/oauth/authorize'

const queryStringFromObj = queryObj =>
  Object.keys(queryObj)
    .filter(key => queryObj[key] !== undefined)
    .map(key => `${key}=${queryObj[key]}`)
    .join('&')

const getRedirectUri = (githubClientId, afterSignInUrl) => {
  if (!process.browser) {
    return
  }

  let afterAuthUrl = `${window.location.origin}/sign-in`

  if (afterSignInUrl && afterSignInUrl !== '/sign-in') {
    afterAuthUrl = `${afterAuthUrl}?afterSignInUrl=${afterSignInUrl}`
  }

  return encodeURIComponent(afterAuthUrl)
}

const getGithubAuthorizeUrl = (githubClientId, githubScope, afterSignInUrl) => {
  if (!githubClientId) {
    throw new Error('Client id is not defined')
  }

  const githubAuthorizeParams = queryStringFromObj({
    client_id: githubClientId,
    redirect_uri: getRedirectUri(githubClientId, afterSignInUrl),
    scope: githubScope
  })

  return `${githubAuthorizeUrl}?${githubAuthorizeParams}`
}

export default getGithubAuthorizeUrl
