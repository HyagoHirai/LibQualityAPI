/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const { describe, it } = require('mocha');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

chai.should();
chai.use(chaiHttp);

describe('RepositoryUserController', () => {
    describe('/POST api/:owner/:repository/user', () => {
        it('it should return a object with the stored data', (done) => {
            chai.request(app)
                .post('/api/angular/angular/user')
                .send({ user: 'HyagoHirai' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('response');
                    res.body.response.should.be.a('object');
                    res.body.response.should.have.property('id');
                    res.body.response.should.have.property('owner');
                    res.body.response.should.have.property('user');
                    res.body.response.should.have.property('updatedAt');
                    res.body.response.should.have.property('createdAt');
                    done();
                });
        });
    });

    describe('/DELETE api/:owner/:repository/user', () => {
        it('it should returns an object with a number of deleted repositories', (done) => {
            chai.request(app)
                .delete('/api/angular/angular/user?user=HyagoHirai')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('response');
                    res.body.response.should.be.a('number');
                    done();
                });
        });
    });
});
