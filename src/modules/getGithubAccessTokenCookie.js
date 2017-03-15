const getGithubAccessTokenCookie = (req, accessToken) => {
  const isSecure = req.headers['x-forwarded-proto'] === 'https'

  let cookie = `githubAccessToken=${accessToken}; SameSite=Strict; HttpOnly`

  if (isSecure) {
    cookie = `${cookie}; Secure`
  }

  return cookie
}

export default getGithubAccessTokenCookie
