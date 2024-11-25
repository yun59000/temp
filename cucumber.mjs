//const path = require("path");
//import {path} from 'path';
import * as path from 'path';



const config = {
   paths: ["./src/test/features/**/*.feature"],
   requireModule: ['ts-node/register'],
   require: ['./src/test/**/*.ts', './src/test/steps/*.ts', './src/test/steps/**/*.ts'],
   setDefaultTimeout: 20 * 1000,
   format: [
      'summary',
      'progress-bar',
      'json:reports/cucumber-report.json',
      'html:reports/report.html',
      './reporter.js',


   ],
   formatOptions: { snippetInterface: 'async-await' },
};


export default config;