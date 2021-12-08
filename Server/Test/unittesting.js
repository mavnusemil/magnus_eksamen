const chai = require("chai");
const app = require('../data.js');
const {expect} = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe(`POST /products`, () => {
    it('The POST command should post a new product', (done) => {
        chai
            .request(app)
            .get('/products')
            .end((err, res) => {

                // Check if the errormessage is not set
                expect(err).to.be.null;

                // Check if status code is 200
                expect(res.status).to.equal(200);

                // Check if response body is an object
                expect(res.body).to.be.an('object');

                // Check if response body is NOT an array
                expect(res.body).to.not.be.an('array');

                
                done();
            });
            
    });
});
