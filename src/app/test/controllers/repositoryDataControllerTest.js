/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const { describe, it } = require('mocha');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

chai.should();
chai.use(chaiHttp);

describe('RepositoryDataController', () => {
    describe('/GET /', () => {
        it('it should check if app is running', (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/GET api/:owner/:repository/issues', () => {
        it('it should return a object with somes properties ', (done) => {
            chai.request(app)
                .get('/api/angular/angular/issues?user=HyagoHirai')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('openIssues');
                    res.body.should.have.property('avg');
                    res.body.should.have.property('stdDeviation');
                    done();
                });
        });
    });

    describe('/GET api/:owner/:repository/statistics', () => {
        it('it should return a object with data array ', (done) => {
            chai.request(app)
                .get('/api/angular/angular/statistics?user=HyagoHirai')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data.should.be.a('array');
                    done();
                });
        });
    });
});
