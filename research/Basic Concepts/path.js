const path = require('path');

const notes = '/users/joe/notes.txt'

console.log(`
${path.dirname(notes)} 
${path.basename(notes)} 
${path.extname(notes)} 
`)

// join path 
const name = 'joe'
console.log(path.join('/', 'users', name, 'notes.txt'))

// get absolute path
console.log(path.resolve('./Input.txt'))

// normalize
console.log(path.normalize('/users/joe/..//test.txt'))