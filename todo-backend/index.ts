import express from 'express';
var bodyParser = require('body-parser')
import { DatabaseMongoDB } from './providers/Database.provider.mongodb';
// rest of the code remains same
const app = express();

const PORT = 8000;

DatabaseMongoDB.init();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// routes
var todoRoutes = require('./routes/todo.route');
app.use('/api/todo', todoRoutes);

app.get('/', (req, res) => res.send('TODO Server V1'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: TODO Server is running at http://localhost:${PORT}`);
});