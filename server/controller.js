//This is an in-memory object in place of a database. Do not do this in practice.
const lists = {
  'To Do List': []
};

module.exports = {
  todolist: {
    fetch: (req, res) => {
      const { listName } = req.query;
      if (listName in lists) {
        res.status(200).send(lists[listName]);
      } else {
        res.status(404).send("List not found");
      }
    },
    post: (req, res) => {
      const { todo, listName } = req.body;
      lists[listName].push(todo);
      res.status(201).send(lists[listName]);
    },
    delete: (req, res) => {
      const { index, listName } = req.query;
      lists[listName].splice(+index, 1);
      res.status(202).send(lists[listName]);
    }
  }
};