import { Given, When, Then } from "@cucumber/cucumber";

import {config } from '../hooks/config'
import { LoginPage } from "../../pages/LoginPage";

import * as fs from 'fs';
import { pageFixture } from "../hooks/pageFixture";

import { playAudit } from 'playwright-lighthouse';
import { lighthouseDesktopConfig } from 'lighthouse/lighthouse-core/config/lr-desktop-config';

import {lighthouseDesktopConfig2} from 'lighthouse/lighthouse-core/config/desktop-config';



import { AllureRuntime} from 'allure-js-commons'




let loginPage: LoginPage;




Given('Le user est connecté à l\'appli', async function () {

  await pageFixture.page.goto(config.URL)
  loginPage = pageFixture.loginPage;
  console.log(await loginPage.getVersion())

  const recupVersion = async () => {
    const version = await loginPage.getVersion()
    //return "Version=" + version
    return version

  }

  console.log("process.env.BROWSER = ", process.env.BROWSER)

 

  const runtime = new AllureRuntime({ resultsDir: './allure-results' }); // Chemin vers le répertoire des résultats Allure
  runtime.writeEnvironmentInfo({
    ENV: 'RECETTE',
    VERSION: await recupVersion(),
    BROWSER: process.env.BROWSER + " - " + pageFixture.browser.version(),
    PLAYWRIGHT: require('@playwright/test/package.json').version

  })


  console.log("LoginPage : Connexion")
  await loginPage.setuserName(pageFixture.userName);
  await loginPage.setuserPwd(pageFixture.pwd);
  await loginPage.clicBtnConnexion()
  console.log("LoginPage : Apres clic btn Connexion")

  console.log("screen Height : ", await pageFixture.page.evaluate("window.screen.height") )
  console.log("screen Width : ", await pageFixture.page.evaluate("window.screen.width") )

  await pageFixture.page.waitForURL('**/accueil')
  console.log("Page Accueil")

  

  await pageFixture.page.waitForTimeout(3000);
  const image = await pageFixture.page.screenshot()
  image && (this.attach(image, 'image/png'));


})

Given('On teste sur un autre site', async function () {
  await pageFixture.page.goto('https://www.carrefour.fr/');

  await pageFixture.page.waitForTimeout(3000);

})




