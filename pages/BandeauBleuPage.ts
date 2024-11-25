import { Page, Locator, expect } from '@playwright/test'
import { TIMEOUT } from 'dns';




export class BandeauBleuPage{
    page: Page;
    lienAdministration: Locator;
    LOGO_CARREFOUR: Locator;
    BANDEAU_ROUGE: Locator;
    COUNT_BANDEAU_ROUGE: Locator;
    BTN_CONTACT: Locator;
    LBL_ADMINISTRATION: Locator;


    constructor(page: Page) {
        this.page = page;
        this.lienAdministration = page.locator('xpath=//mat-icon[text()="settings"]/..')
        this.LOGO_CARREFOUR = page.locator('xpath=//img[@mattooltip="Accueil"]/..')
        this.BANDEAU_ROUGE = page.locator('xpath=//div[@class="maintenance-plan-msg ng-star-inserted"]/p')
        this.COUNT_BANDEAU_ROUGE = page.locator('xpath=count(//div[@class="maintenance-plan-msg ng-star-inserted"]/p')
        this.BTN_CONTACT = page.locator('xpath=//mat-icon[text()="mail_outline"]/..')
        this.LBL_ADMINISTRATION = page.locator('xpath=//span[text()="Administration"]')
    }

    async ouvirPageAdministration(){
        await this.lienAdministration.click()       
       // await this.LBL_ADMINISTRATION.isVisible()
        await expect(this.LBL_ADMINISTRATION).toBeVisible()
    }

   async getBtnAdmin(){
      return   this.lienAdministration
   }
    

    async clicLogoCarrefour(){
        await this.LOGO_CARREFOUR.click()
        await this.page.waitForTimeout(5*1000);
    }

// async clicBtnContact(){
//    await this.BTN_CONTACT.click({force: true});
//     if(this.page.locator('xpath=count(//app-mail-contact)') ==0)  {this.BTN_CONTACT.click()};
//     await this.page.waitForTimeout(1000);
// }

// async getBandeauRouge(){
//    return  cy.scrollTo('top', { ensureScrollable: false }).then (()=>  cy.xpath(BANDEAU_ROUGE) )
// }

// async getBandeauRougeText(){
//    return  cy.xpath(BANDEAU_ROUGE).invoke('text').then ((txt) => txt)
//  }

//  async getCountBandeauRouge(){
//     return cy.xpath(COUNT_BANDEAU_ROUGE)
// }

}