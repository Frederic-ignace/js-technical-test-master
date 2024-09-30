import request from 'supertest';
import app from '../utils/server';

describe('Astronaut API Tests', () => {
//declaration des variables
  let server: any;
  let astronautId: number;
  
  beforeAll(() => {
    server = app.start()
  });

   // beforeEach : Réinitialise les variables ou états avant chaque test
   beforeEach(() => {
    console.log('Setup before each test');
    // Réinitialisation ou préparation avant chaque test
    astronautId=0
  });

  afterAll(() => {
    console.log('Clean up after all tests');
    server.close(); // Ferme le serveur après tous les tests
  });

//GET :  Test de récupération de tous les astronaut
  it('should return all astronaut data', async () => {
    const response = await request(server).get('/astronauts/allAstros');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(4);
  });

 // POST: Test d'ajout d'un nouvel astronaut
 it('should create a new astronaut', async () => {
  const newAstronaut= { firstname: 'John', lastname: 'Smith', originPlanetId: 1 };
  const response = await request(server)
    .post('/astronauts/create')
    .send(newAstronaut);
  
  expect(response.status).toBe(200);
  expect(response.body.name).toBe('John');
  astronautId = response.body.id; // Sauvegarde de l'ID pour les tests suivants
});

//GET :  Test de récupération d'astronaut
it('should return astronaut data', async () => {
  const response = await request(server).get(`/astronauts/:${astronautId}`);
  expect(response.status).toBe(200);
  expect(response.body.length).toBe(1);
});

 //GET :  Test de récupération de tous les astronaut
 it('should return message Astronaut not found', async () => {
  const id = 2333
  const response = await request(server).get(`/astronauts/:${id}`);
  expect(response.status).toBe(404);
  expect(response.body).toEqual({ error: 'Astronaut not found' });
});

// PUT: Test de mise à jour d'un astronaut
it('should update an existing astronaut', async () => {
  const updatedUser = { firstname: 'John', lastname: 'Smith Updated', originPlanetId: 1 };
  const response = await request(server)
    .put(`/astronauts/update/:${astronautId}`)
    .send(updatedUser);
  
  expect(response.status).toBe(200);
  expect(response.body.name).toBe('Mark Updated');
});

// DELETE: Test de suppression d'un astronaut
it('should delete a astronaut', async () => {
  const response = await request(server).delete(`/astronauts/delete/${astronautId}`);
  expect(response.status).toBe(200);
  expect(response.body.message).toBe('User deleted');

  // Vérifier si l'astronaut est vraiment supprimé
  const getResponse = await request(server).get('/astronauts/allAstros');
  expect(getResponse.body.length).toBe(3); // Retour à 3 utilisateurs après suppression
});
});