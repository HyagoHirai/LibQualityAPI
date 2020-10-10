/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {
    insertUserRepository, deleteUserRepository, getAllDistinctRepositories, getAllUserRepositories,
} = require('../../services/repositoryUserService');

chai.use(chaiAsPromised);
const { expect } = chai;

describe('RepositoryStatisticsService', () => {
    describe('#insertUserRepository()', () => {
        it('it should return a object with stored data', async () => {
            const response = await insertUserRepository('angular', 'angular', 'HyagoHirai');
            expect(response).to.be.a('object');
            expect(response).to.have.property('id');
            expect(response).to.have.property('owner');
            expect(response).to.have.property('repository');
            expect(response).to.have.property('user');
            expect(response).to.have.property('updatedAt');
            expect(response).to.have.property('createdAt');
        });
    });

    describe('#deleteUserRepository()', () => {
        it('it should return number of deleted data', async () => {
            await insertUserRepository('angular', 'angular', 'HyagoHirai');
            const response = await deleteUserRepository('angular', 'angular', 'HyagoHirai');
            expect(response).to.be.above(0);
        });
    });

    describe('#getAllDistinctRepositories()', () => {
        it('it should return all distinct repositories', async () => {
            await insertUserRepository('angular', 'angular', 'HyagoHirai');
            await insertUserRepository('facebook', 'react', 'HyagoHirai');
            const response = await getAllDistinctRepositories();
            expect(Object.keys(response).length).to.equal(2);
        });
    });

    describe('#getAllUserRepositories()', () => {
        it('it should return all distinct repositories of specific user', async () => {
            await insertUserRepository('angular', 'angular', 'HyagoHirai');
            await insertUserRepository('facebook', 'react', 'HyagoHirai');
            const response = await getAllUserRepositories('HyagoHirai');
            expect(response).to.be.a('array').and.to.have.length(2);
        });
    });
});
