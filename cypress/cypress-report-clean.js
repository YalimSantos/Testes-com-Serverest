// Small script to make sure we always clean the report directory before running "npm run test"

const fs = require("fs");

const reports = './cypress/reports';
const mocha = 'mocha'
const mochareports = "mochareports"

let createReportDir = (dir1,dir2)  => {

    fs.mkdirSync(`${dir1}/${dir2}`, { recursive: true })

    console.log(`Created directory: ${dir1}/${dir2}.`);
}

// check if directory exists

if (fs.existsSync(reports))
{
    fs.rm(reports, { recursive: true }, (err) => {

        if (err)
        {
            throw err;
        }

        console.log(`Cleaning ${reports} directory.`);

        createReportDir(reports,mocha)
        createReportDir(reports,mochareports)

    });
}
else
{
    createReportDir(reports,mocha)
    createReportDir(reports,mochareports)
}