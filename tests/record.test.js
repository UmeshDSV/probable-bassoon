const request = require('supertest')
const app = require('../src/app')
const mongoose = require('mongoose')
afterAll(async () => {
    await mongoose.disconnect()
})
test('Should fetch record successfully', async () => {
    var response = await request(app)
        .post('/records')
        .send({
            "startDate": "2016-01-26",
            "endDate": "2018-02-02",
            "minCount": 2700,
            "maxCount": 3000
        })
        .expect(200)
    expect(response.body.msg).toBe("Success")
    expect(response.body.code).toBe(0)
})

test('Should throw invalid arguments exception', async () => {
    var response = await request(app)
        .post('/records')
        .send({
            "endDate": "2018-02-02",
            "minCount": 2700,
            "maxCount": 3000
        })
        .expect(200)
    expect(response.body.msg).toBe("Invalid Arguments")
    expect(response.body.code).toBe(9)
})

test('Should throw no record found exception', async () => {
    var response = await request(app)
        .post('/records')
        .send({
            "startDate": "2016-01-26",
            "endDate": "2018-02-02",
            "minCount": 222700,
            "maxCount": 993000
        })
        .expect(200)
    expect(response.body.msg).toBe("No Record Found")
    expect(response.body.code).toBe(1)
})