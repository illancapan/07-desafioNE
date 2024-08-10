const request = require('supertest')
const server = require('../index.js')

describe('Operaciones CRUD de cafes', () => {
    it('Debería devolver un status 200 y un array con al menos un café en GET /cafes', async () => {
        const response = await request(server).get('/cafes').send()
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toBeGreaterThan(0)
    })
    it('Debería devolver un status 404 al intentar eliminar un café con un id inexistente', async () => {
        const response = await request(server)
            .delete('/cafes/999')
            .set('Authorization', 'Bearer some_token')
        expect(response.statusCode).toBe(404)
    })

    it('Debería agregar un nuevo café y devolver un status 201 en POST /cafes', async () => {
        const nuevoCafe = { id: 5, nombre: 'Latte' }
        const response = await request(server).post('/cafes').send(nuevoCafe)
        expect(response.statusCode).toBe(201)
        expect(response.body).toContainEqual(nuevoCafe)
    })

    it('Debería devolver un status 400 si el id del parámetro no coincide con el id del payload en PUT /cafes/:id', async () => {
        const cafe = { id: 6, nombre: 'Flat White' }
        const response = await request(server).put('/cafes/3').send(cafe)
        expect(response.statusCode).toBe(400)
    })
})
