import { expect, Locator, Page } from "@playwright/test";

export class ProductDetailPage{
    readonly page:Page;
    readonly itemProductName:Locator;
    readonly productName:Locator;
    readonly installments:Locator;

    constructor(page:Page){
        this.page = page;
        this.itemProductName = page.locator("li.item.product");
        this.productName = page.locator('span[data-ui-id="page-title-wrapper"]');
        this.installments = page.locator("#tab_card .price_information");
    }
    //----------------------------------------------------------------------------------

    // Verifica que sea el producto buscado en el breadcrum y en el título del producto
    async assertCorrectProduct(product:string){
        await this.itemProductName.waitFor({state:"visible"});
        await expect(this.itemProductName).toHaveText(new RegExp(product,"i"));

        await this.productName.waitFor({state:"visible"});   
        await expect(this.productName).toHaveText(new RegExp(product,"i"));
    }
    //----------------------------------------------------------------------------------

    // Verifica que la cantidad de cuotas sea la esperada 
    // (busca por texto, MEJORA: hacer un trim para extrer sólo el numero = más escalable y flexible)
    async assertInstallments(numOfInstalments:string){
        await expect(this.installments).toHaveText(new RegExp(numOfInstalments,"i"));
    }
}