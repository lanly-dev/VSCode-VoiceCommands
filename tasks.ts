import * as shell from 'shelljs'

// clean out file
console.log(`Run task ${process.argv[2]}`)
if (process.argv[2] === 'clean'){
  console.log('Remove out and dist directories')
  shell.rm('-rf', './out')
  shell.rm('-rf', './dist')
}
else console.log(`Unknown task ${process.argv[2]}`)