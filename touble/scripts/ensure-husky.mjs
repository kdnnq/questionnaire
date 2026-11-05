import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const hookRunner = path.join('.husky', '_', 'pre-commit')

if (!existsSync(hookRunner)) {
  process.exit(0)
}

const gitExecPath = execFileSync('git', ['--exec-path'], { encoding: 'utf8' }).trim()
const gitUsrBin = path.resolve(gitExecPath, '../../..', 'usr', 'bin')
const shellPath = gitUsrBin
  .replaceAll('\\', '/')
  .replace(/^([A-Za-z]):/, (_, drive) => `/${drive.toLowerCase()}`)
const pathExport = `PATH="${shellPath}:$PATH"`
const hook = readFileSync(hookRunner, 'utf8')

if (!hook.includes(pathExport)) {
  writeFileSync(hookRunner, hook.replace('#!/usr/bin/env sh', `#!/usr/bin/env sh\n${pathExport}`))
}
