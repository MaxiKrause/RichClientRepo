const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/login', (req, res) => {
  res.send({ express: 'Login Page' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));