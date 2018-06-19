import supertest from 'supertest';
import server from '../../../server';

describe('Customer API service', () => {
  let customerId = '';
  const customerName = 'Spongebob';
  const customerEmail = 'spongebob@squarepants.org';
  const existingEmail = 'cherio@gmail.com'; // Our seed data contains this email

  afterAll(() => {
    server.close();
  });

  describe('GET /v1/customers', () => {
    it('should return all customers', (done) => {
      supertest(server)
        .get('/v1/customers')
        .then((response) => {
          // Given if there is no customer profile found, we should still return 200
          expect(response.statusCode).toBe(200);
          expect(response.body.length).toBeGreaterThanOrEqual(0);
          done();
        });
    });

    it('should return customers that match the search term', (done) => {
      supertest(server)
        .get(`/v1/customers?term=${existingEmail}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body.length).toBeGreaterThan(0);
          done();
        });
    });
  });

  describe('POST /v1/customers', () => {
    it('should not be able to create customer without name', (done) => {
      supertest(server)
        .post('/v1/customers')
        .send({ email: customerEmail })
        .then((response) => {
          expect(response.statusCode).toBe(400);
          done();
        });
    });

    it('should not be able to create customer without email', (done) => {
      supertest(server)
        .post('/v1/customers')
        .send({ name: customerName })
        .then((response) => {
          expect(response.statusCode).toBe(400);
          done();
        });
    });

    it('should not be able to create customer with invalid email', (done) => {
      supertest(server)
        .post('/v1/customers')
        .send({ name: customerName, email: 'hellospongebob.com' })
        .then((response) => {
          expect(response.statusCode).toBe(400);
          done();
        });
    });

    it('should not be able to create customer with existing email', (done) => {
      supertest(server)
        .post('/v1/customers')
        .send({ name: customerName, email: existingEmail })
        .then((response) => {
          expect(response.statusCode).toBe(400);
          done();
        });
    });

    it('should be able to create customer with name and email', (done) => {
      supertest(server)
        .post('/v1/customers')
        .send({ name: customerName, email: customerEmail })
        .then((response) => {
          expect(response.statusCode).toBe(201);
          expect(response.body.name).toBe(customerName);
          expect(response.body.email).toBe(customerEmail);
          expect(response.body.id).not.toBeFalsy();
          customerId = response.body.id;
          done();
        });
    });
  });

  describe('GET /v1/customers/:id', () => {
    it('should return customer with ID specified on the params', (done) => {
      supertest(server)
        .get(`/v1/customers/${customerId}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body.name).toBe(customerName);
          expect(response.body.email).toBe(customerEmail);
          expect(response.body.id).toBe(customerId);
          done();
        });
    });

    it('should return not found response if no customer profile found', (done) => {
      supertest(server)
        .get('/v1/customers/42')
        .then((response) => {
          expect(response.statusCode).toBe(404);
          done();
        });
    });
  });

  describe('PUT /v1/customers/:id', () => {
    it('should not be able to update customer profile if no matching ID found', (done) => {
      supertest(server)
        .put('/v1/customers/42')
        .send({ name: 'Chardy', email: 'chardy.lima@gmail.com' })
        .then((response) => {
          expect(response.statusCode).toBe(400);
          done();
        });
    });

    it('should not be able to update customer profile if no data is provided', (done) => {
      supertest(server)
        .put(`/v1/customers/${customerId}`)
        .send({})
        .then((response) => {
          expect(response.statusCode).toBe(400);
          done();
        });
    });

    it('should return response with updated customer detail', (done) => {
      const nameUpdate = 'Spongebob Squarepants';
      const emailUpdate = 'spongebob.pants@me.com';
      supertest(server)
        .put(`/v1/customers/${customerId}`)
        .send({ name: nameUpdate, email: emailUpdate })
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body.name).toBe(nameUpdate);
          expect(response.body.email).toBe(emailUpdate);
          expect(response.body.id).toBe(customerId);
          done();
        });
    });
  });

  describe('DELETE /v1/customers/:id', () => {
    it('should be able to delete customer profile', (done) => {
      supertest(server)
        .delete(`/v1/customers/${customerId}`)
        .then((response) => {
          expect(response.statusCode).toBe(204);
          done();
        });
    });
  });
});
