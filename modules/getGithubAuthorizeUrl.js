const githubAuthorizeUrl = 'https://github.com/login/oauth/authorize'

const queryStringFromObj = queryObj =>
  Object.keys(queryObj)
    .map(key => `${key}=${queryObj[key]}`)
    .join('&')

const getGithubAuthorizeUrl = (githubClientId, nextUrl) => {
  if (!githubClientId) {
    throw new Error('Client id is not defined')
  }

  let afterAuthUrl = `${window.location.origin}/sign-in`

  if (nextUrl) {
    afterAuthUrl = `${afterAuthUrl}?nextUrl=${nextUrl}`
  }

  const githubAuthorizeParams = queryStringFromObj({
    client_id: githubClientId,
    redirect_uri: encodeURIComponent(afterAuthUrl),
    scope: 'repo'
  })

  return `${githubAuthorizeUrl}?${githubAuthorizeParams}`
}

export default getGithubAuthorizeUrl
