import { Component } from 'react'
import Navigation from '../components/Navigation'
import SignInOrProfileLink from '../components/SignInOrProfileLink'
import InjectEnv from '../pageWrappers/InjectEnv'
import InjectGithubToken from '../pageWrappers/InjectGithubToken'
import InjectGithubUser from '../pageWrappers/InjectGithubUser'

const Home = ({
  githubUser,
  githubToken,
  githubClientId
}) => {
  return (
    <div>
      <Navigation />

      <SignInOrProfileLink
        githubUser={githubUser}
        githubClientId={githubClientId} />

      <br />

      <div>home page!</div>

      <br />

      {githubToken && <div>token: {githubToken}</div>}
      {githubUser && <div>user: {githubUser.login}</div>}
    </div>
  )
}

export default InjectEnv(InjectGithubToken(InjectGithubUser(Home)))
