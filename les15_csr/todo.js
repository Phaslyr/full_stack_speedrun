import express from "express";

const app = express();

var port = process.env.PORT || 8080;

var router = express.Router();

import bodyParser from "body-parser";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// The method of the root url. Be friendly and welcome our user :)
router.get('/', function (req, res) {
  res.json({ message: 'Welcome to the TODO app.' });
});

// All HTTP methods under the /todos URL.
router
  .route('/todos')
  // This GET method is in charge of returnning all the todos.
  .get((req, res) => {
    res.json({ message: 'Return all todos.' });
  })
  // This POST methods is used to create a new todo.
  // Its request will have a body, containing the content of the new todo.
  .post((req, res) => {
    res.json({
      message: 'Create a new todo: ' + '1' + ' - ' + req.body.content,
      todo_id: '1',
      content: req.body.content,
    });
  });

// All HTTP methods under the /todos/:todo_id URL.
// The /:todo_id is a parameter within the URL that specifies a particular todo.
router
  .route('/todos/:todo_id')
  // This GET method is used to get the content from a specific todo.
  .get((req, res) => {
    res.json({ message: 'Get the content from a todo.' });
  })
  // We use PUT method to update a todo's content.
  .put((req, res) => {
    res.json({
      message:
        'Update the todo: ' + req.params.todo_id + ' - ' + req.body.content,
      todo_id: req.params.todo_id,
      content: req.body.content,
    });
  })
  // DELETE method is used to delete a todo.
  .delete((req, res) => {
    res.json({ message: 'Delete a todo.' });
  });

app.use('/api', router); // API Root url at: http://localhost:8080/api

app.listen(port);
console.log('Server listenning on port ' + port);