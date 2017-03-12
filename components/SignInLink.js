import Link from 'next/link'

const githubAuthorizeUrl = 'https://github.com/login/oauth/authorize'

const queryStringFromObj = queryObj =>
  Object.keys(queryObj)
    .map(key => `${key}=${queryObj[key]}`)
    .join('&')

const handleSignIn = githubClientId => event => {
  const afterAuthUrl = `${window.location.origin}/sign-in`

  const githubAuthorizeParams = queryStringFromObj({
    client_id: githubClientId,
    redirect_uri: afterAuthUrl,
    scope: 'repo'
  })

  window.location = `${githubAuthorizeUrl}?${githubAuthorizeParams}`
  event.preventDefault()
}

export default ({ githubClientId }) => (
  <a href='#' onClick={handleSignIn(githubClientId)}>sign in</a>
)
