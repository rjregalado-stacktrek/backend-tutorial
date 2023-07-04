//console.log('Hello Batch RF1');

// ================== SIMPLE WEB SERVER ======================

// const http = require('http'); // NodeJs

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/plain' }) // application/json
//   response.end('Hello Batch RF1!')
// })

// const PORT = 3001 // 5000, 8000 // localhost:3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)

// solution: nodemon


const http = require('http'); // NodeJs

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(notes))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

// // Examples:

// // const notes = { id: 1, title: "My Note", content: "This is my first note" };

// // const jsonString = JSON.stringify(notes);
// // console.log(jsonString);

// // Output: {"id":1,"title":"My Note","content":"This is my first note"} // JSON format


// // const app = http.createServer((request, response) => {
// //   response.writeHead(200, { 'Content-Type': 'text/plain' })
// //   response.end('Hello World')
// // })



