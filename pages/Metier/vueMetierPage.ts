import { Locator, Page } from "@playwright/test";

export class VueMetierPage{

    private SELECT_DERNIERES_MISES_A_JOUR: Locator;
    private LIBELLE_DERNIERE_MISE_A_JOUR: Locator;
    private CONTENU_DERNIERE_MISE_A_JOUR: Locator;

    constructor(page: Page){
        this.SELECT_DERNIERES_MISES_A_JOUR = page.locator('xpath=//mat-expansion-panel-header')
        this.LIBELLE_DERNIERE_MISE_A_JOUR = page.locator('xpath=//div[@class="last-news-content"]/app-news[1]/div[1]/span[2]')
        this.CONTENU_DERNIERE_MISE_A_JOUR = page.locator('xpath=//div[@class="last-news-content"]/app-news[1]/div[2]')
    }

  
    async clicDernieresMisesAJour(){
        this.SELECT_DERNIERES_MISES_A_JOUR.click()
    }

    async getLibelleDerniereMiseAJourLocator(){
        return this.LIBELLE_DERNIERE_MISE_A_JOUR;
    }

    async getContenuDerniereMiseAJourLocator(){
        return this.CONTENU_DERNIERE_MISE_A_JOUR;
    }
}