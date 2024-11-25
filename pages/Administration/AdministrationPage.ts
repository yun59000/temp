
import { Locator, Page, expect } from "@playwright/test"
import { TIMEOUT } from "dns";
        
const URL_IFRAME ={src:'/angular-js/admin'}
//const IFRAME_2 = '#v2-iframe'

export class AdministrationPage{
    page: Page;
    ONGLET_PLANIFICATION_MAINTENANCE: Locator;
    ONGLET_FORMULAIRES_APPLICATION: Locator;
    ONGLET_FORMULAIRES_APPLICATION_ANCRE: Locator;
    ONGLET_EXTRACTIONS: Locator;
    ONGLET_NOUVEAUTES: Locator;

    constructor(page: Page){
        this.page = page;
        this.ONGLET_PLANIFICATION_MAINTENANCE = page.locator('xpath=//div[contains(text(),"Planification maintenance")]')
        this.ONGLET_FORMULAIRES_APPLICATION = page.locator('xpath=//div[contains(text(),"Formulaires applications")]')
        this.ONGLET_FORMULAIRES_APPLICATION_ANCRE = page.locator('xpath=//div[contains(text(),"Formulaires applications")]//ancestor::a[1]')
        this.ONGLET_EXTRACTIONS = page.locator('xpath=//div[contains(text(),"Extractions")]')
        this.ONGLET_NOUVEAUTES = page.locator('xpath=//div[contains(text(),"Nouveautés")]')
    }

    // getIframe2(){
    //     return cy.frameLoaded(URL_IFRAME).iframeCustom().find(IFRAME_2).iframeCustom();
    // }
    async ouvrirOngletExtractions(){
       await this.ONGLET_EXTRACTIONS.click();
       await this.page.waitForTimeout(2000);
    }

    async ouvrirOngletPlanificationMaintenance(){
        this.ONGLET_PLANIFICATION_MAINTENANCE.click();
        await this.page.waitForTimeout(2000);
    }

    

    // ouvrirOngletNouvelles(){
        // cy.frameLoaded(URL_IFRAME)
        // cy.iframe(URL_IFRAME).xpath(ONGLET_NOUVELLES).click().then(() => cy.wait(5000));
       
    //}

   async ouvrirOngletNouveautes(){
       await this.ONGLET_NOUVEAUTES.click()
       // await this.page.locator('xpath=//app-news/table').isVisible()
        await expect(this.page.locator('xpath=//app-news/table')).toBeVisible()
    }

  
    // ouvrirOngletFormulairesApplications(){  
    //     cy.xpath(ONGLET_FORMULAIRES_APPLICATION).click()
    // }
    // getOngletFormulaireApplications(){
    //    return  cy.xpath(ONGLET_FORMULAIRES_APPLICATION) 

    // }

    // getFormulaireApplication_Ancre(){
    // return cy.xpath(ONGLET_FORMULAIRES_APPLICATION_ANCRE)
    // }





}
