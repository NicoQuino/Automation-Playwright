import { expect, Locator, Page } from "@playwright/test";

export class LoginBPage{
    readonly page:Page;
    readonly phoneNumber:Locator;
    readonly sendBtn:Locator;
    readonly errorMsg:Locator;
    readonly errorMsg1:Locator;
    readonly homeBtn:Locator;
    

    constructor(page:Page){
        this.page = page;
        this.phoneNumber = page.locator("#nrolinea");
        this.sendBtn = page.locator("#btn-enviar");
        this.errorMsg = page.locator("text=ERROR");
        this.errorMsg = page.locator("#errorNoActiva > span");
        this.homeBtn = page.locator(".header-holder > a");
    }
    //----------------------------------------------------------------------------------

    // Ingresa por número de teléfono
    async signIn(phone:string){
        await this.phoneNumber.fill(phone);
        this.sendBtn.click();
    }
    //----------------------------------------------------------------------------------

    // Valida que se esté respondiendo con error de numero inválido
    async assertErrorMsg(){
        //await expect(errorMsg1).toHaveText("Ingresá una línea Movistar activa.");
        await expect(this.errorMsg).toContainText(`"ERROR 777 - No pudimos validar tu identidad - Necesitamos comprobar tus datos"`);
    }
    //----------------------------------------------------------------------------------

    // Visita la home page
    async clickOnHomeBtn(){
        await this.homeBtn.click();
    }
}