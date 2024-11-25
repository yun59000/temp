import { config } from './config';
import { Before, BeforeAll, After, AfterAll, setDefaultTimeout, Status, ITestCaseHookParameter, BeforeStep } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, firefox, Page } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { LoginPage } from "../../pages/LoginPage";
import { BandeauBleuPage } from "../../pages/BandeauBleuPage";
import { AdministrationPage } from "../../pages/Administration/AdministrationPage";
import { NouveautesPage } from '../../pages/Administration/NouveautesPage';
import { AccueilPage } from '../../pages/AccueilPage';
import { VueMetierPage } from '../../pages/Metier/vueMetierPage';

import * as fs from 'fs';
import { getJson } from './vault';


let browser: Browser;
let context: BrowserContext;
let page: Page;

setDefaultTimeout(20 * 1000);



BeforeAll(async function () {
    console.log("config.browser : ", config.browser)
    switch (config.browser) {
        case 'firefox':
            browser = await firefox.launch(config.browserOptions);
            break;
        default:
           browser = await chromium.launch(config.browserOptions);

    }
    
    pageFixture.browser = browser
    pageFixture.userName = (await getJson()).id
    pageFixture.pwd = (await getJson()).pwd


})



Before(async function () {
    context = await browser.newContext({
        viewport: null,
        ignoreHTTPSErrors: true,
        recordVideo: {
            dir: './videos'
        }
    });

    pageFixture.context =  context;

    page = await context.newPage();
    
    pageFixture.page = page;
    pageFixture.loginPage = new LoginPage(page)
    pageFixture.bandeauBleuPage = new BandeauBleuPage(page)
    pageFixture.administrationPage = new AdministrationPage(page)
    pageFixture.nouveautesPage = new NouveautesPage(page)
    pageFixture.accueilPage = new AccueilPage(page)
    pageFixture.vueMetierPage = new VueMetierPage(page)
   

})

After(async function ({ pickle, result }: ITestCaseHookParameter) {
    //this.log("blabla") //==> fichier en PJ dans le reporting

    if (result?.status == Status.FAILED) {
        let image: Buffer;
        image = await pageFixture.page.screenshot()
        image && (this.attach(image, 'image/png'));
    }

    console.log(`\r\n ${pickle.name} : ${result.status === Status.PASSED ? "Passed ✅" : "Failed ❌"}`)

    await page.close();

    if (config.video=='true') {
        //wait for video to be completly loaded
        await new Promise(resolve => setTimeout(resolve, 5 * 1000))
        const video = fs.readFileSync(await page.video().path())
        video && (this.attach(video, "video/webm"))
    }

   await context.close()

});

AfterAll(async function () {
    browser.close();

})