const url = require("url");
const { sendResponse, parseData } = require("./helpers.js");

//This is an in-memory object in place of a database. Do not do this in practice.
const lists = {
  'To Do List': []
};

const routes = {
  "/api/todolist": {
    OPTIONS: (req, res) => {
      sendResponse(res, null, 200);
    },
    GET: (req, res) => {
      const query = url.parse(req.url, true).query;
      const { listName } = query;
      // console.log(listName);
      if (listName in lists) {
        sendResponse(res, lists[listName], 200);
      } else {
        sendResponse(res, "List not found", 404);
      }
    },
    POST: (req, res) => {
      parseData(req, data => {
        const { todo, listName } = data;
        lists[listName].push(todo);
        sendResponse(res, lists[listName], 201);
      });
    },
    DELETE: (req, res) => {
      // console.log(req.url);
      const query = url.parse(req.url, true).query;
      // console.log(query);
      const { index, listName } = query;
      lists[listName].splice(+index, 1);
      sendResponse(res, lists[listName], 202);
    }
  }
};

module.exports = (req, res) => {
  let pathname = url.parse(req.url).pathname;
  console.log('Serving request type', req.method, 'to path', pathname);
  const handler = routes[pathname][req.method];
  if (handler) {
    handler(req, res);
  } else {
    sendResponse(res, "Page not found", 404);
  }
};
