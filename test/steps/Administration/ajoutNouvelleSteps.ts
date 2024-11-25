import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";



Then('On ouvre l\'onglet NOUVEAUTES', async function () {

    await pageFixture.administrationPage.ouvrirOngletNouveautes();
    const image = await pageFixture.page.screenshot()
    image && (this.attach(image, 'image/png'));
});

Then('On clique sur le bouton d\'ajout d\'une nouvelle', async function () {
    await pageFixture.nouveautesPage.clicBtnAjouterActualite()
   await expect(await pageFixture.nouveautesPage.getTitrePopUpNouvelleActualite()).toBeVisible()
    const image = await pageFixture.page.screenshot()
    image && (this.attach(image, 'image/png'));
})

Then('PopUp : On vérifie la présence du champ input Titre', async function () {
    await expect(await pageFixture.nouveautesPage.getInputTitre()).toBeVisible()
})

Then('On vérifie la liste des modules sélectionnables', async function () {
    await pageFixture.nouveautesPage.verifListeModules()
})

Then('On créé une nouvelle', async function () {
    await pageFixture.nouveautesPage.creationNouvelle()
})

Then ('On vérifie la présence de la nouvelle dans le tableau', async function(){
 //Vérif présence de la nouvelle dans le tableau

 console.log('Titre : ', await pageFixture.nouveautesPage.getTitreNouvelle())
 console.log('titreDerniereActu : ', await pageFixture.nouveautesPage.getTitreNouvelle())

 await expect(await pageFixture.nouveautesPage.getTitreDerniereActualiteLocator()).toHaveText(await pageFixture.nouveautesPage.getTitreNouvelle())
 //await expect(await pageFixture.nouveautesPage.getTitreDerniereActualite()).toHaveText("AAA")
 const image = await pageFixture.page.screenshot()
 image && (this.attach(image, 'image/png'));
})

Then('On vérifie la présence de la nouvelle dans les dernières MAJ de la vue Métier', async function () {

    await pageFixture.bandeauBleuPage.clicLogoCarrefour()   //clic logo Carrefour
    await pageFixture.accueilPage.clicVueMetier()     //clic brique Métier
    await pageFixture.vueMetierPage.clicDernieresMisesAJour() //clic Dernières MAJ
    await expect(await pageFixture.vueMetierPage.getLibelleDerniereMiseAJourLocator()).toBeVisible();
    // vérif titre
    await (expect(await pageFixture.vueMetierPage.getLibelleDerniereMiseAJourLocator())).toHaveText(await pageFixture.nouveautesPage.getTitreNouvelle())

    //verif contenu
    console.log("Recup contenu : ", await pageFixture.nouveautesPage.getContenuNouvelle())
    await (expect(await pageFixture.vueMetierPage.getContenuDerniereMiseAJourLocator())).toHaveText(await pageFixture.nouveautesPage.getContenuNouvelle())

    const image = await pageFixture.page.screenshot()
    image && (this.attach(image, 'image/png'));
})


Then('On modifie la nouvelle', async function(){
    await pageFixture.bandeauBleuPage.ouvirPageAdministration()
    await pageFixture.administrationPage.ouvrirOngletNouveautes()
    await pageFixture.nouveautesPage.modificationNouvelle()
})

