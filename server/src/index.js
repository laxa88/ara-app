const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const port = 3000;

// ==================================================
// middleware
// ==================================================

// Required to parse form and json data in req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ==================================================
// paths
// ==================================================

app.use('/api', routes);

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/foo', (req, res) => {
  console.log('###', req.body);
  console.log('###', req.params);
  console.log('###', req.query);

  const { myVal } = req.body;

  res.status(200).json({
    returnVal: myVal,
  });
});

// ==================================================
// entry
// ==================================================

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
