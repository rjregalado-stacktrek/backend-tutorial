const express = require('express');
const app = express();

const PORT = 3001;

let  products =  [
    {
      "id": 1,
      "setup": "Why did the tomato turn red?",
      "punchline": "Because it saw the salad dressing!"
    },
    {
      "id": 2,
      "setup": "Why did the chicken cross the playground?",
      "punchline": "To get to the other slide!"
    },
    {
      "id": 3,
      "setup": "What do you call a fake noodle?",
      "punchline": "An impasta!"
    }
  ]

// console.log(`id_${jokes[2].id}: ${jokes[2].id}`)
// console.log(`setup_${jokes[2].id}: ${jokes[2].setup}`)
// console.log(`punchline_${jokes[2].id}: ${jokes[2].punchline}`)

app.use(express.json()); // is a middleware used to parse JSON-encoded data in the request body.
app.use(express.urlencoded({ extended: true }));  // is a middleware used to parse URL-encoded data in the request body.

// responds to requests on root URL '/', e.g. localhost:3001/
app.get('/', (req,res) => {
    res.send('<h1>Welcome to RF1 Batch</h1>')
})

// get all the contents in database
app.get('/api/products', (req,res) => {
    res.json(jokes)
})

// get a single entry by id
app.get('/api/jokes/:id', (req,res) => {
	const id = Number(req.params.id) // const req.params = { id:1, body: "This is body"}
    const joke = jokes.find(joke => joke.id === id)
    res.json(joke)
})

// delete an entry, returns status 204 with no response
app.delete('/api/jokes/:id', (req,res) => {
    const id  = Number(req.params.id)
    jokes = jokes.filter(joke => joke.id !== id)
    res.send('Deleted successfully!').end()
})

// // add a new entry
// app.post('/api/jokes', (req,res) => {
//     const maxId = jokes.length > 0
//         ? Math.max(...jokes.map(n => n.id))
//         : 0
//     const joke = req.body
//     res.json(joke)
// })

app.post('/api/jokes', (req, res) => {
    const maxId = jokes.length > 0
        ? Math.max(...jokes.map(n => n.id))
        : 0;
    const joke = req.body;
    //joke.id = maxId + 1; // Assign a new ID to the joke

    jokes.push(joke); // Add the joke to the array

    res.json(joke);
});

app.patch('/api/jokes/:id', (req, res) => {
    const id = Number(req.params.id);
    const updatedJoke = req.body;
    jokes = jokes.map(joke => {
        if (joke.id === id) {
            return { ...joke, ...updatedJoke };
        }
        return joke;
    });
    res.json(jokes.find(joke => joke.id === id));
});

app.put('/api/jokes/:id', (req, res) => {
  const id = Number(req.params.id);
  const updatedJoke = req.body;
  jokes = jokes.map((joke) => {
    if (joke.id === id) {
      return { ...joke, ...updatedJoke };
    }
    return joke;
  });
  res.json(jokes.find((joke) => joke.id === id));
});

// starts server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

