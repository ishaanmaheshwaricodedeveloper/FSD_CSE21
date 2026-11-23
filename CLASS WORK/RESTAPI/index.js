import express from 'express';
const app = express();

let users = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com' }
];
app.use(express.json());


app.get('/users', (req, res) => {
  res.json(users);
});


app.post('/users', (req, res) => {
  let user = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(user);
  res.json(user);
});

app.put('/users/:id', (req, res) => {
  let user = users.find(u => u.id === parseInt(req.params.id));
  user.name = req.body.name;
  user.email = req.body.email;
  res.send("user updated successfully");
  res.json(user);
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
