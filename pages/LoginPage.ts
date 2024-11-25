import { Page, Locator } from '@playwright/test'

//const { env } = require('node:process');  // CJS  (CommonJS) : les modules sont chargés de manière synchrone au moment de l'exécution
//import { env } from 'node:process';     //ESM  ECMAScript Modules : les modules sont chargés de manière asynchrone au moment de l'analyse

export class LoginPage {
    page: Page;
    username_input: Locator;
    pwd_input: Locator;
    connexion_button: Locator;
    version: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username_input = page.getByPlaceholder('Utilisateur');
        this.pwd_input = page.getByPlaceholder('Mot de passe');
        this.connexion_button = page.getByRole('button', { name: 'Connexion' });
        this.version = page.getByText('Version');
       

    }

    // async goto(url: string) {
    //     await this.page.goto('/');
    // }

    async getVersion() {
        return await this.version.textContent();
    }

    async setuserName(username: string){
        await this.username_input.fill(username);
    }

    async setuserPwd(pwd: string){
        await this.pwd_input.fill(pwd);
    }

    async clicBtnConnexion() {
        await this.connexion_button.click()
    }

    async connexion(username: string, pwd: string) {
        await this.username_input.fill(username);
        await this.pwd_input.fill(pwd);
        await this.connexion_button.click();
        await this.page.locator('span').filter({ hasText: 'Vue Applicative et Technique' }).innerText()

    }


}