import express from 'express';
import { DatabaseMongoDB } from './providers/Database.provider.mongodb';
// rest of the code remains same
const app = express();
const PORT = 8000;

DatabaseMongoDB.init();

// routes
var todoRoutes = require('./routes/todo.route');
app.use('/api/todo', todoRoutes);

app.get('/', (req, res) => res.send('TODO Server V1'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: TODO Server is running at http://localhost:${PORT}`);
});