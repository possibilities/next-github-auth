const { spawn } = require('child_process')

const run = spawn('./run-example.sh')
run.on('exit', process.exit)

run.stdout.pipe(process.stdout)
run.stderr.pipe(process.stderr)

run.stdout.on('data', data => {
  if (data.toString().includes('Ready on http://localhost:3000')) {
    const test = spawn('yarn', ['test'])
    test.on('exit', process.exit)
    test.stdout.pipe(process.stdout)
    test.stderr.pipe(process.stderr)
  }
})
