import { Locator } from "@playwright/test";
import { Page } from "@playwright/test";





 export class AccueilPage{
    page: Page;
    TUILE_VUE_METIER: Locator
    TUILE_INFRASCTRUCTURE: Locator;
    TUILE_VUE_APPLICATIVE_TECHNIQUE: Locator;

    constructor(page: Page){
        this.page = page;
        this.TUILE_VUE_METIER = page.locator('xpath=//app-tile//span[text()="Vue Métier"]')
        this.TUILE_INFRASCTRUCTURE = page.locator('xpath=//app-tile//span[text()="Vue Infrastructure"]')
        this.TUILE_VUE_APPLICATIVE_TECHNIQUE = page.locator('xpath=//app-tile//span[text()="Vue Applicative et Technique"]')
    }

     
    // clicVueInfrastructure(){    
    //     cy.xpath(TUILE_INFRASCTRUCTURE).click()
    // }


    async clicVueMetier(){
        this.TUILE_VUE_METIER.click()
    }

    // clicVueApplicativeEtTechnique(){
    //     cy.xpath(TUILE_VUE_APPLICATIVE_TECHNIQUE).click().then(() =>cy.wait(2000))
    // }

  

}



