import { configureSignIn } from 'next-github-auth'

// Note: See README for simpler approach if you don't need to configure the
// sign in page.
const SignIn = configureSignIn({ scope: 'repo' })
export default SignIn
