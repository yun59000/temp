
import { World } from '@cucumber/cucumber';
import { Page, Locator, expect } from '@playwright/test'
import { pageFixture } from '../../test/hooks/pageFixture';




export class NouveautesPage {
    page: Page;
    private BTN_AJOUT_ACTUALITE: Locator;
    private BTN_ANNULER: Locator;
    private NOUVELLE_ACTUALITE_TITRE: Locator;
    private INPUT_TITRE: Locator;
    private SELECT_MODULE: Locator;
    private CHAMP_CONTENU_NOUVELLE: Locator;
    private BTN_ENREGISTRER: Locator;
    private TITRE_DERNIERE_NOUVELLE: Locator;
    private BTN_MODIF_DERNIERE_NOUVELLE_PUBLIEE: Locator;

    private titreNouvelle: string;
    private contenuNouvelle: string;


    constructor(page: Page) {
        this.page = page;

        this.BTN_AJOUT_ACTUALITE = this.page.locator("xpath=//mat-icon[@mattooltip='Ajouter une nouvelle actualité']/../..")
        this.BTN_ANNULER = this.page.locator("xpath=//span[text()='ANNULER']")
        this.NOUVELLE_ACTUALITE_TITRE = this.page.locator('xpath=//md-toolbar/div[text()="Nouvelle actualité"]')
        this.INPUT_TITRE = this.page.locator('xpath=//input[@formcontrolname="title"]')
        this.SELECT_MODULE = this.page.locator("xpath=//mat-label[text()='Module']//ancestor::div[1]/select")
        this.CHAMP_CONTENU_NOUVELLE = this.page.locator("xpath=//div[@class='angular-editor-textarea']")
        this.BTN_ENREGISTRER  = this.page.locator("xpath=//span[contains(text(),'SAUVEGARDER')]/..")
        this.TITRE_DERNIERE_NOUVELLE = this.page.locator("xpath=//app-news//tbody/tr[2]/td[2]/span")
        this.BTN_MODIF_DERNIERE_NOUVELLE_PUBLIEE = this.page.locator("xpath=//app-news//tbody/tr[2]/td[3]//mat-icon[text()='edit']/..")
    }


    async getTableauNouvelles() {
        return this.page.locator('xpath=//app-news/table')
    }

    async clicBtnAjouterActualite() {
        await this.BTN_AJOUT_ACTUALITE.click()
    }

    async getTitrePopUpNouvelleActualite() {
        return this.page.locator("xpath=//h3[text()='Déclarer une nouvelle']")
    }

    async getInputTitre() {
        //await expect(this.page.locator(this.INPUT_TITRE)).toBeVisible
        return this.INPUT_TITRE
    }


    async verifListeModules() {
        // équivalent de verifListeModules mais d'une autre façon

        const listeModules = await this.SELECT_MODULE.innerText();
      //  console.log('Liste Modules :\n', listeModules)
        expect(listeModules.includes('Module global'))
        expect(listeModules.includes('Vue Métier'))
        expect(listeModules.includes('Vue architecture applicative'))
        expect(listeModules.includes('Vue fonctionnelle'))
        expect(listeModules.includes('Vue infrastructure'))
        expect(listeModules.includes('Vue Données sensibles'))
        expect(listeModules.includes('Vue Téléchargement'))
        expect(listeModules.includes('Vue Processus sensibles'))
        expect(listeModules.includes('Vue Indicateurs de qualité et pilotage'))

        await this.BTN_ANNULER.click()


    }


    async creationNouvelle() {
        let today = new Date().toISOString().  //2021-10-06T15:05:44.247Z
            replace(/T/, ' ').      // replace T with a space
            replace(/\..+/, '');
        this.titreNouvelle = 'Robot_Cypress_' + today;
        this.contenuNouvelle =  'TEST CYPRESS '+ today;

        console.log('this.titreNouvelle = ', this.titreNouvelle)

        await this.BTN_AJOUT_ACTUALITE.click()
        await this.INPUT_TITRE.fill(this.titreNouvelle)
        await this.SELECT_MODULE.selectOption('Vue Métier')

        //saisie contenu de la nouvelle
        await this.CHAMP_CONTENU_NOUVELLE.fill(this.contenuNouvelle)

        //sauvegarde de la nouvelle
        await this.BTN_ENREGISTRER.click()
        await this.page.waitForTimeout(2*1000)
        await this.page.reload()

        
    }

    async modificationNouvelle(){
        this.titreNouvelle = this.titreNouvelle + " : modif";
        this.contenuNouvelle =  this.contenuNouvelle + " : modif";
        console.log('this.titreNouvelle = ', this.titreNouvelle)

        await this.clicBtnModifierDerniereNouvellePubliee()
        await this.INPUT_TITRE.fill(this.titreNouvelle)
        await this.CHAMP_CONTENU_NOUVELLE.fill(this.contenuNouvelle)

         //sauvegarde de la nouvelle
         await this.BTN_ENREGISTRER.click()
         await this.page.waitForTimeout(2*1000)
         await this.page.reload()
   
    }

    async clicBtnModifierDerniereNouvellePubliee(){
        this.BTN_MODIF_DERNIERE_NOUVELLE_PUBLIEE.click()
    }

    async getTitreNouvelle() {
        return  this.titreNouvelle
    }

    async getTitreDerniereActualiteLocator(){
         return  this.TITRE_DERNIERE_NOUVELLE
    }

    async getContenuNouvelle() {
        return  this.contenuNouvelle
    }

  



   



    }
