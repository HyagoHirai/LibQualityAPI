/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const moxios = require('moxios');
const sinon = require('sinon');
const {
    getRepositoryOpenIssues, getRepositoryIssues, getRepositoryIssuesInfo, getRepositoryMetrics, getRepositoryStatistics,
} = require('../../services/githubService');
require('dotenv').config();

chai.use(chaiAsPromised);
const { expect } = chai;

describe('GithubService', () => {
    beforeEach(function () {
        // import and pass your custom axios instance to this method
        moxios.install();
        moxios.stubRequest(`${process.env.GITHUB_URL}/repos/angular/angular`, {
            status: 200,
            response: { open_issues: 6 }
        });
        moxios.stubRequest(`${process.env.GITHUB_URL}/repos/angular/angular/issues?state=open&per_page=100&page=1`, {
            status: 200,
            response: [{ created_at: '2020-10-10T14:22:51Z' }, { created_at: '2020-10-09T14:22:51Z' }, { created_at: '2020-10-08T14:22:51Z' }]
        });
        moxios.stubRequest(`${process.env.GITHUB_URL}/repos/angular/angular/issues?state=open&per_page=100&page=2`, {
            status: 200,
            response: [{ created_at: '2020-10-07T14:22:51Z' }, { created_at: '2020-10-06T14:22:51Z' }, { created_at: '2020-10-05T14:22:51Z' }]
        });
        sinon.stub(Date, 'now').returns(new Date('2020-10-11T00:00:00Z'));
    })

    afterEach(function () {
        // import and pass your custom axios instance to this method
        moxios.uninstall();
        sinon.restore();
    })

    describe('#getRepositoryOpenIssues()', () => {
        it('should return number of open issues', async () => {
            const openIssues = await getRepositoryOpenIssues('angular', 'angular');
            expect(openIssues).to.be.a('number').and.to.be.equal(6);
        });
    });

    describe('#getRepositoryIssues()', () => {
        it('should return array of open issues from page 1', async () => {
            const issues = await getRepositoryIssues('angular', 'angular', 1, 'open');
            expect(issues).to.be.a('array').to.have.lengthOf(3);
        });
    });

    describe('#getRepositoryIssuesInfo()', () => {
        it('should return an array open issues dates', async () => {
            const issues = await getRepositoryIssuesInfo('angular', 'angular', 200, 'open');
            expect(issues).to.be.a('array').and.to.have.length(6);
        });
    });

    describe('#getRepositoryMetrics()', () => {
        it('should return average and standartd deviation of open issues', async () => {
            const data = await getRepositoryMetrics('angular', 'angular', 200);
            expect(data).to.be.a('object');
            expect(data).to.have.property('avg').and.to.be.a('number').and.to.be.equal(2.9007986111111106);
            expect(data).to.have.property('stdDeviation').and.to.be.a('number').and.to.be.equal(1.8708286933869707);
        });
    });

    describe('#getRepositoryStatistics()', () => {
        it('should return an array open issues dates', async () => {
            const issues = await getRepositoryStatistics('angular', 'angular', 200);
            expect(issues).to.be.a('object');
        });
    });
});
