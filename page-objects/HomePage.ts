import { Page, Locator, expect } from "@playwright/test"

export class HomePage{
    readonly page:Page;
    readonly title:Locator;
    readonly myMovistarBtn:Locator;
    readonly searchBtn:Locator;
    readonly installments:Locator;
    readonly memoryFilter:Locator;
    readonly priceFilter:Locator;
    readonly filtersSelected:Locator;
    readonly productList:Locator;

    constructor(page:Page){
        this.page = page;
        this.title = page.locator(".category-title");
        this.myMovistarBtn = page.locator(".my-movistar-button");
        this.searchBtn = page.locator("#search_action");
        this.installments = page.locator("#tab_card .price_information");
        this.memoryFilter = page.locator("#filters-items > .filter-item.memory");
        this.priceFilter = page.locator("#filters-items > .filter-item >> text=Precio");
        this.filtersSelected = page.locator("#filters-items");
        this.productList = page.locator("ol > .product-item:visible");
    }
    //----------------------------------------------------------------------------------

    // Visita la home page
    async visit(){
        await this.page.goto("https://tiendaonline.movistar.com.ar");
    }
    //----------------------------------------------------------------------------------

    // Verifica que se esté en la home page
    async assertHomePage(){
        await expect(this.page).toHaveURL("https://tiendaonline.movistar.com.ar");
        await expect(this.title).toHaveText("Celulares");
    }
    //----------------------------------------------------------------------------------
    
    // Se redirige a la sección "Mi Movistar" de la app web
    async clickOnMyMovistarBtn(){
        await this.myMovistarBtn.click();
        await expect(this.page).toHaveURL("https://app.movistar.com.ar/productLine");
    }
    //----------------------------------------------------------------------------------

    // Realiza la búsqueda por texto de un producto
    async searchProduct(productToFind:string){
        await this.searchBtn.click();
        //await page.fill("#search","A15");
        await this.page.keyboard.insertText(productToFind);
        await this.page.keyboard.press("Enter");
    }
    //----------------------------------------------------------------------------------

    // Selecciona el primer producto de la lista visible
    async selectFirstProduct(){
        
        const itemsAmount = await this.productList.count();
        expect(itemsAmount).toBeGreaterThan(0);

        if (itemsAmount > 0){
            const firstItem = await this.productList.first();
            await firstItem.waitFor({state: "visible"});
            await firstItem.click();
        } 
    }
    //----------------------------------------------------------------------------------

    // Selecciona el filtro para desplegar sus opciones
    async selectFilter(filterName:string){
        switch(filterName){
            case "Memoria":
                this.memoryFilter.click();
                break;
            case "Precio":
                this.priceFilter.click();
                break;
        }
    }
    //----------------------------------------------------------------------------------
    
    // Verifica que el filtro aparece seleccionado
    async assertfilterSelected(filterValue:string){
        await expect(this.filtersSelected).toHaveText(new RegExp(filterValue,"i"));
    }
    //----------------------------------------------------------------------------------

    // Verifica que los filtros de 'memoria' y 'pecio' se haya aplicado en los productos
    async assertMemoryAndPriceFilter(memory:string, minPriceText:string, maxPriceText:string){
        // normalizar el string
        const minPrice = parseInt(minPriceText.replace(/\D/g, ''), 10);
        const maxPrice = parseInt(maxPriceText.replace(/\D/g, ''), 10);

        const itemsCount = await this.productList.count();
        await expect(itemsCount).toBeGreaterThan(0);

        for (let i = 0; i < itemsCount; i++) {
            const item = this.productList.nth(i);

            await expect(item).toHaveText(new RegExp(memory,"i"));
            
            const price = item.locator(".special-price");
            const priceText = await price.innerText();
            const priceNumber = parseInt(priceText.replace(/\D/g, ''), 10);
            
            expect(priceNumber).toBeGreaterThanOrEqual(minPrice);
            expect(priceNumber).toBeLessThanOrEqual(maxPrice);
        }
    }
    //----------------------------------------------------------------------------------
}