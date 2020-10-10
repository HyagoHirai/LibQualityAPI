/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {
    getRepositoryStatistics, insertRepositoryStatistics, truncateRepositoryStatistics, updateRepositoryStatistics,
} = require('../../services/repositoryStatisticsService');

chai.use(chaiAsPromised);
const { expect } = chai;

describe('RepositoryStatisticsService', () => {
    describe('#insertRepositoryStatistics()', () => {
        it('it should return a object with stored data', async () => {
            const response = await insertRepositoryStatistics('angular', 'angular', '2020/10/08', 10);
            expect(response).to.be.a('object');
            expect(response).to.have.property('id');
            expect(response).to.have.property('owner');
            expect(response).to.have.property('repository');
            expect(response).to.have.property('date');
            expect(response).to.have.property('open_issues');
            expect(response).to.have.property('updatedAt');
            expect(response).to.have.property('createdAt');
        });
    });

    describe('#getRepositoryStatistics()', () => {
        it('it should return a array of statistics repositories', async () => {
            await insertRepositoryStatistics('angular', 'angular', '2020-10-08', 10);
            const response = await getRepositoryStatistics('angular', 'angular');
            expect(response).to.be.a('array').and.to.have.property(0);
            expect(response[0]).to.have.property('id');
            expect(response[0]).to.have.property('owner');
            expect(response[0]).to.have.property('repository');
            expect(response[0]).to.have.property('date');
            expect(response[0]).to.have.property('open_issues');
            expect(response[0]).to.have.property('createdAt');
            expect(response[0]).to.have.property('updatedAt');
        });
    });

    describe('#truncateRepositoryStatistics()', () => {
        it('it should truncate repository_statistics table', async () => {
            await insertRepositoryStatistics('angular', 'angular', '2020-10-09', 10);
            const response = await truncateRepositoryStatistics();
            expect(response).to.equal(0);
        });
    });

    describe('#updateRepositoryStatistics()', () => {
        it('it should update values in repository_statistics table', async () => {
            await insertRepositoryStatistics('angular', 'angular', '2020-10-09', 10);
            const [response] = await updateRepositoryStatistics('angular', 'angular', '2020-10-09', 20);
            expect(response).to.be.above(0);
        });
    });
});
