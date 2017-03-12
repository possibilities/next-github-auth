const setGithubAccessTokenCookie = (res, accessToken) => {
  res.setHeader(
    'Set-Cookie',
    `githubAccessToken=${accessToken}; SameSite=Strict; HttpOnly; Secure`
  )
}

export default setGithubAccessTokenCookie
