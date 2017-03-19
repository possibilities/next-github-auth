const getAndAssertEnvVar = envVarName => {
  if (!process.browser && !process.env[envVarName]) {
    console.error(`${envVarName} environment variable is required`)
    process.exit(1)
  }

  return process.env[envVarName]
}

export default getAndAssertEnvVar
