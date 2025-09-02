import { Locator, Page } from "@playwright/test";

export class LoginSelectionPage{
    readonly page:Page;
    readonly lineaMovilBtn: Locator;

    constructor(page:Page){
        this.page = page;
        this.lineaMovilBtn = page.locator("text=Una línea móvil");
    }
    //----------------------------------------------------------------------------------

    // Visita la pagina de login por numero de telefono
    async clickLoginB(){
        this.lineaMovilBtn.click();
    }
}