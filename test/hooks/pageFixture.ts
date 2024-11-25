import { Browser, BrowserContext, Page } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { BandeauBleuPage } from "../../pages/BandeauBleuPage";
import { AdministrationPage } from "../../pages/Administration/AdministrationPage";
import { NouveautesPage } from "../../pages/Administration/NouveautesPage";
import { AccueilPage } from '../../pages/AccueilPage';
import { VueMetierPage } from "../../pages/Metier/vueMetierPage";



export const pageFixture = {
    // @ts-ignore
    userName: undefined as unknown as string,
    pwd: undefined as unknown as string,
    browser: undefined as Browser,
    page: undefined as Page,
    context: undefined as BrowserContext,
    currentUrl: undefined as string,


    loginPage: undefined as unknown as LoginPage,
    bandeauBleuPage: undefined as unknown as BandeauBleuPage,
    administrationPage: undefined as unknown as AdministrationPage,
    nouveautesPage: undefined as unknown as NouveautesPage,
    accueilPage: undefined as unknown as AccueilPage,
    vueMetierPage: undefined as unknown as VueMetierPage,    
    
 
} 