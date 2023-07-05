const express = require('express');
const app = express();

const PORT = 3001;

let  jokes =  [
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
app.get('/api/jokes', (req,res) => {
    res.json(jokes)
})

//get a single entry by id

// app.get('/api/jokes/:id', (req,res) => { // :id -> parameters
// 	const id = Number(req.params.id) // const params = { id:1, body: "This is body"}
//     const joke = jokes.find(joke => (joke.id === id));
//       console.log(joke.id, typeof joke.id, id, typeof id, joke.id === id)
//       //return joke ? res.json(joke) : res.status(404).send('Nothing to display!')
    
//     return joke ? res.json(joke) : res.send('Nothing to display!')
//     })
    
//     //res.json(joke)


//get a single entry by id

app.get('/api/jokes/:id', (req, res) => {
  const id = Number(req.params.id);
  const joke = jokes.find(joke => joke.id === id);

  if (joke) {
    res.json(joke);
  } else {
    res.status(404).send('Nothing to display!');
  }
});


// // delete an entry, returns status 204 with no response
// app.delete('/api/jokes/:id', (req,res) => {
//     const id  = Number(req.params.id)
//     jokes = jokes.filter(joke => joke.id !== id)
//     res.send('Deleted successfully!').end()
// })

app.delete('/api/jokes/:id', (req, res) => {
  const id = Number(req.params.id);

  // Find the index of the joke with the specified ID
  const jokeIndex = jokes.findIndex(joke => joke.id === id);

  if (jokeIndex !== -1) {
    // Remove the joke from the array
    jokes.splice(jokeIndex, 1);
    res.send('Joke deleted successfully');
  } else {
    res.status(404).send('Joke not found');
  }
});


// POST endpoint to add a new entry

app.post('/api/jokes', (req, res) => {
  const joke = req.body;
  
  const existingJoke = jokes.find(j => j.id === joke.id);
  if (existingJoke) {
    return res.status(409).json({ error: 'Id must be unique' });
  }

  // Validate the required fields
  if (!joke.id || !joke.setup || !joke.punchline) {
    return res.status(400).json({ Error: 'Id, setup and punchline are required fields' });
  }

  // Add the product to the array
  jokes.push(joke);

  // Send a JSON response
  res.json(joke);
});


// app.post('/api/jokes', (req, res) => {
//   const maxId = jokes.length > 0
//     ? Math.max(...jokes.map(n => n.id))
//     : 0;
//   const joke = req.body;
  
//   if (joke.id > maxId && joke.setup && joke.punchline) {
//     jokes.push(joke);
//     res.json(joke);
//   } else {
//     res.send('Invalid input!');
//   }
// });


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

