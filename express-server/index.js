const express = require('express');
const app = express();

const PORT = 3001;

app.get('/', (req,res) => {
    res.send('<h1>Welcome to RF1 Batch!.....</h1>')
})

// starts server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})