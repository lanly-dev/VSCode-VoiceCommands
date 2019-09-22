import * as shell from 'shelljs'

// clean out file
console.log(`Run task ${process.argv[2]}`)
if (process.argv[2] === 'clean'){
  console.log('Remove out directory')
  shell.rm('-rf', 'out')
}
else if (process.argv[2] === 'copy') {
  console.log('Copy jar and exe files to out directory')
  shell.mkdir('-p', 'out')
  shell.cp('src/WordsListener.jar', 'out')
  shell.cp('src/WordsMatching.exe', 'out')
}