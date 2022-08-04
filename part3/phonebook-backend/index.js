const express = require('express')
const app = express()

let persons = [

    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }


]

app.get('/api/person/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === Number(id))
    if (person) {
        res.json(person)
    } else {
        res.statusMessage = 'Person id not found'
        res.status(404).end()
    }
})

app.get('/info', (request, response) => {
    const currentTime = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people.</p><p>${currentTime.toString()}</p>`)
})


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})