/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {
    getRepositoryOpenIssues, getRepositoryIssues, getRepositoryIssuesInfo, getRepositoryMetrics, getRepositoryStatistics,
} = require('../../services/githubService');
require('dotenv').config();

chai.use(chaiAsPromised);
const { expect } = chai;

describe('GithubService', () => {
    describe('#getRepositoryOpenIssues()', () => {
        it('should return number of open issues', async () => {
            const openIssues = await getRepositoryOpenIssues('angular', 'angular');
            expect(openIssues).to.be.a('number');
        });
    });

    describe('#getRepositoryIssues()', () => {
        it('should return array of open issues from page 1', async () => {
            const issues = await getRepositoryIssues('angular', 'angular', 1, 'open');
            expect(issues).to.be.a('array').and.to.have.property(0).that.includes.all.keys(['created_at']);
        });
    });

    describe('#getRepositoryIssuesInfo()', () => {
        it('should return an array open issues dates', async () => {
            const openIssues = await getRepositoryOpenIssues('angular', 'angular');
            const issues = await getRepositoryIssuesInfo('angular', 'angular', openIssues, 'open');
            expect(issues).to.be.a('array').and.to.have.length(openIssues);
        });
    });

    describe('#getRepositoryMetrics()', () => {
        it('should return average and standartd deviation of open issues', async () => {
            const openIssues = await getRepositoryOpenIssues('angular', 'angular');
            const data = await getRepositoryMetrics('angular', 'angular', openIssues);
            expect(data).to.be.a('object');
            expect(data).to.have.property('avg').and.to.be.a('number');
            expect(data).to.have.property('stdDeviation').and.to.be.a('number');
        });
    });

    describe('#getRepositoryStatistics()', () => {
        it('should return an array open issues dates', async () => {
            const openIssues = await getRepositoryOpenIssues('angular', 'angular');
            const issues = await getRepositoryStatistics('angular', 'angular', openIssues);
            expect(issues).to.be.a('object');
        });
    });
});
