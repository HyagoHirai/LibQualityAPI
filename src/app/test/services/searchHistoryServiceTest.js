/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { insertSearchHistory } = require('../../services/searchHistoryService');

chai.use(chaiAsPromised);
const { expect } = chai;

describe('SearchHistoryService', () => {
    describe('#insertSearchHistory()', () => {
        it('it should return a object with stored data', (done) => {
            insertSearchHistory('angular', 'angular', 'HyagoHirai').then((data) => {
                expect(data).to.be.a('object');
                expect(data).to.have.property('id');
                expect(data).to.have.property('owner');
                expect(data).to.have.property('repository');
                expect(data).to.have.property('user');
                expect(data).to.have.property('createdAt');
                expect(data).to.have.property('updatedAt');
                done();
            });
        });
    });

    describe('#insertSearchHistory()', () => {
        it('it should throw error', async () => {
            const response = insertSearchHistory('angular', 'angular', null);
            await expect(response).to.eventually.be.rejected;
        });
    });
});
