const axios = require('axios');
const _ = require('lodash');
const { mean, std } = require('mathjs');
const { diffDatesByDay } = require('../utils/date');
const log = require('../utils/logger')(module);

const issuesPerPage = 100;

/**
 * Get numbers of open issues
 * @param {String} owner - Repository owner name
 * @param {String} repository - Repository name
 * @returns {Number} Numbers of open issues
 * @author Hyago Hirai <hyaghirai@gmail.com>
 */
async function getRepositoryOpenIssues(owner, repository) {
    try {
        const parameters = {
            method: 'GET',
            url: `${process.env.GITHUB_URL}/repos/${owner}/${repository}`,
            auth: {
                username: process.env.GITHUB_USERNAME,
                password: process.env.GITHUB_TOKEN,
            },
        };
        const response = await axios(parameters);
        return response.data.open_issues;
    } catch (error) {
        log.error(error.response.data.message);
        throw error;
    }
}

/**
 * Get all issues of a specific state passed by parameter
 * @param {String} owner - Repository owner name
 * @param {String} repository - Repository name
 * @param {String} page - Number page
 * @param {String} state - Indicates the state of the issues to return. Can be either open or closed
 * @returns {Array} All issues of a specific page and state
 * @author Hyago Hirai <hyaghirai@gmail.com>
 */
async function getRepositoryIssues(owner, repository, page, state = 'open') {
    try {
        const parameters = {
            method: 'GET',
            url: `${process.env.GITHUB_URL}/repos/${owner}/${repository}/issues?state=${state}&per_page=${issuesPerPage}&page=${page}`,
            auth: {
                username: process.env.GITHUB_USERNAME,
                password: process.env.GITHUB_TOKEN,
            },
        };
        const response = await axios(parameters);
        const issues = response.data;
        return issues;
    } catch (error) {
        log.error(error.response.data.message);
        throw error;
    }
}

/**
 * Iterate over pages to get all issues of a specific state passed by parameter
 * @param {String} owner - Repository owner name
 * @param {String} repository - Repository name
 * @param {String} numberOfIssues - Number of issues used to calculate the number of pages
 * @param {String} state - Indicates the state of the issues to return. Can be either open or closed
 * @returns {Array} All issues of a specific state
 * @author Hyago Hirai <hyaghirai@gmail.com>
 */
async function getRepositoryIssuesInfo(owner, repository, numberOfIssues, state = 'open') {
    try {
        const numberOfPages = Math.ceil(numberOfIssues / issuesPerPage);
        const pages = [...Array(numberOfPages).keys()].map((i) => i + 1);
        const issuesDate = (await Promise.all(pages.map(async (page) => getRepositoryIssues(owner, repository, page, state)))).flat();
        return issuesDate;
    } catch (error) {
        log.error(error.response.data.message);
        throw error;
    }
}

/**
 * Get average and standard deviation of repository issues
 * @param {String} owner - Repository owner name
 * @param {String} repository - Repository name
 * @param {String} numberOfIssues - Number of issues used to calculate the number of pages
 * @param {String} state - Indicates the state of the issues to return. Can be either open or closed
 * @returns {Object} Average and standard deviation
 * @author Hyago Hirai <hyaghirai@gmail.com>
 */
async function getRepositoryMetrics(owner, repository, numberOfIssues, state = 'open') {
    const openIssues = await getRepositoryIssuesInfo(owner, repository, numberOfIssues, state);
    const issuesDate = openIssues.map((issue) => diffDatesByDay(issue.created_at, Date.now()));
    const avg = mean(issuesDate);
    const stdDeviation = std(issuesDate);
    return {
        avg,
        stdDeviation,
    };
}

/**
 * Get statistics of repository issues
 * @param {String} owner - Repository owner name
 * @param {String} repository - Repository name
 * @param {String} numberOfIssues - Number of issues used to calculate the number of pages
 * @param {String} state - Indicates the state of the issues to return. Can be either open or closed
 * @returns {Array} Return all issues grouped by date
 * @author Hyago Hirai <hyaghirai@gmail.com>
 */
async function getRepositoryStatistics(owner, repository, numberOfIssues, state = 'open') {
    const openIssues = await getRepositoryIssuesInfo(owner, repository, numberOfIssues, state);
    const openIssuesDate = openIssues.map((issue) => (new Date(issue.created_at)).toISOString().slice(0, 10));
    const result = _.countBy(openIssuesDate);
    return result;
}

/**
 * Get statistics of repository issues by date
 * @param {String} owner - Repository owner name
 * @param {String} repository - Repository name
 * @param {String} date - Date created
 * @param {String} state - Indicates the state of the issues to return. Can be either open or closed
 * @returns {Number} Return issues count since date
 * @author Hyago Hirai <hyaghirai@gmail.com>
 */
async function getRepositoryStatisticsByDate(owner, repository, date, state = 'open') {
    try {
        const parameters = {
            method: 'GET',
            url: `${process.env.GITHUB_URL}/search/issues?q=repo:${owner}/${repository}+created:>=${date}+state:${state}`,
            auth: {
                username: process.env.GITHUB_USERNAME,
                password: process.env.GITHUB_TOKEN,
            },
        };
        const response = await axios(parameters);
        return response.data.total_count;
    } catch (error) {
        log.error(error.response.data.message);
        throw error;
    }
}

module.exports = {
    getRepositoryOpenIssues,
    getRepositoryIssues,
    getRepositoryIssuesInfo,
    getRepositoryMetrics,
    getRepositoryStatistics,
    getRepositoryStatisticsByDate,
};
