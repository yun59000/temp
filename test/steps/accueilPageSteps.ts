import { Then } from "@cucumber/cucumber";
import { BandeauBleuPage } from "../../pages/BandeauBleuPage";
import { pageFixture } from "../hooks/pageFixture";

import {expect } from '@playwright/test'




//let bandeauBleuPage: BandeauBleuPage;

Then('On ouvre la page Administration', async function () {
  await pageFixture.bandeauBleuPage.ouvirPageAdministration()

  const image = await pageFixture.page.screenshot()
  image && (this.attach(image, 'image/png'));


})

Then('On ouvre la page Administration_Request', async function () {
  // Start waiting for request before clicking. Note no await.
  // const requestPromise = page.waitForRequest('https://example.com/resource');
  // await page.getByText('trigger request').click();
  // const request = await requestPromise;



  (await pageFixture.bandeauBleuPage.getBtnAdmin()).click()

  pageFixture.page.on("request", request => {
    if (request.resourceType() === "xhr" || request.resourceType() === "fetch") {
      console.log("Captured request", request.url());
    }
  });
  await expect(pageFixture.page).toHaveURL('https://ariane-rec.carrefour.com/administration/actualites')





})
