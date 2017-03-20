const githubAuthorizeUrl = 'https://github.com/login/oauth/authorize'

const queryStringFromObj = queryObj =>
  Object.keys(queryObj)
    .filter(key => queryObj[key] !== undefined)
    .map(key => `${key}=${queryObj[key]}`)
    .join('&')

const getRedirectUri = (githubClientId, nextUrl) => {
  if (!process.browser) {
    return
  }

  let afterAuthUrl = `${window.location.origin}/sign-in`

  if (nextUrl && nextUrl !== '/sign-in') {
    afterAuthUrl = `${afterAuthUrl}?nextUrl=${nextUrl}`
  }

  return encodeURIComponent(afterAuthUrl)
}

const getGithubAuthorizeUrl = (githubClientId, nextUrl) => {
  if (!githubClientId) {
    throw new Error('Client id is not defined')
  }

  const githubAuthorizeParams = queryStringFromObj({
    client_id: githubClientId,
    redirect_uri: getRedirectUri(githubClientId, nextUrl),
    scope: 'repo'
  })

  return `${githubAuthorizeUrl}?${githubAuthorizeParams}`
}

export default getGithubAuthorizeUrl
