const mongoose = require('mongoose')

if (process.argv.length < 5) {
  console.log('Please provide the password as well as the Name & Number to add ' +
    'to DB as command-line arguments: node mongo.js <password> <name> <number>');
  process.exit(1)
}

//set this via command line when starting node: node mongo.js <password>
const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-updxb.mongodb.net/phonebook-app?retryWrites=true&w=majority`
  
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: newName,
  number: newNumber
})

person.save().then(result => {
  console.log('person saved!', result)
  mongoose.connection.close()
})

