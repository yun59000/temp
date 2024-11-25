import { LaunchOptions } from '@playwright/test';



const browserOptions: LaunchOptions = {
  slowMo: 0,


  //--start-maximized : pour Chrome
  // --kiosk : firefox
  //  !!!!  il faut viewport: null dans le Before du hooks.ts pour le start-maximized soit effectif
  //args: ["--start-maximized", "--kiosk", "--remote-debugging-port=9222"], 
  args: ["--start-maximized","--remote-debugging-port=9222"],  
  headless: (process.env.HEADLESS === 'true') ? true : false,

};

export const config = {
  browser: process.env.BROWSER || 'chromium',
  browserOptions,
  URL: 'https://google.fr',
  video: process.env.VIDEO || 'false'
};

