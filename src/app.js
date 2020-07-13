const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

    response.json(repositories);

});

app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body;

  const repositorie = { id: uuid(), title, url, techs, likes:0 };
  
  repositories.push(repositorie);

  return response.json(repositorie);

});

app.put("/repositories/:id", (request, response) => {

  const { id } = request.params;
  const { title, url, techs } = request.body;

   const indexRepositorie = repositories.findIndex((repo) => {return repo.id === id});

   if(indexRepositorie < 0){
    return response.status(400).json({error:'Repositore not found'});
   }

   const editedRepo = { id, title, url, techs, likes:repositories[indexRepositorie].likes};

   repositories[indexRepositorie] = editedRepo;

   return response.json(repositories[indexRepositorie]);

});

app.delete("/repositories/:id", (request, response) => {

  const { id } = request.params;
  
  const repoIndex = repositories.findIndex((repo) => {return repo.id === id});

  if(repoIndex < 0){
    return response.status(400).json({error: 'Repositorie not found'});
  }

  repositories.splice(repoIndex, 1);

  response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  
  const { id } = request.params;

  const repoIndex = repositories.findIndex((repo) => {return repo.id === id});

  if(repoIndex < 0){
    return response.status(400).json({error:'Repositorie not found'});
  }

  repositories[repoIndex].likes = repositories[repoIndex].likes + 1;

  return response.json(repositories[repoIndex]);

});

module.exports = app;
