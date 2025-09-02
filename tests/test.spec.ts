import { expect, test } from "@playwright/test"
import { HomePage } from "../page-objects/HomePage";
import { LoginSelectionPage } from "../page-objects/LoginSelectionPage";
import { LoginBPage } from "../page-objects/LoginBPage";
import { ProductDetailPage } from "../page-objects/ProductDetailPage";

test.describe("", () => {
    let homePage:HomePage;
    let loginSelectionPage:LoginSelectionPage;
    let loginBPage:LoginBPage;
    let productDetailPage:ProductDetailPage;

    test.beforeEach(async({page}) => {
        homePage = new HomePage(page);
        await homePage.visit();
    });

    test("Ingreso correcto a la página", async ({page}) => {
        await homePage.assertHomePage();
    });

    test("Número de teléfono inválido", async ({page}) => {
        loginSelectionPage = new LoginSelectionPage(page);
        loginBPage = new LoginBPage(page);

        await homePage.clickOnMyMovistarBtn();
        loginSelectionPage.clickLoginB();

        loginBPage.signIn("12345");
        loginBPage.assertErrorMsg();
    });

    test("Volver a la pantalla de inicio despues de teléfono inválido", async({page}) => {        
        loginSelectionPage = new LoginSelectionPage(page);
        loginBPage = new LoginBPage(page);

        await homePage.clickOnMyMovistarBtn();
        loginSelectionPage.clickLoginB();
        loginBPage.clickOnHomeBtn();
        homePage.assertHomePage();
    });

    test("caso 1", async ({page}) => {
        productDetailPage = new ProductDetailPage(page);

        await homePage.searchProduct("A15");
        await homePage.selectFirstProduct();
        
        await productDetailPage.assertCorrectProduct("A15");
        await productDetailPage.assertInstallments("Hasta 6 cuotas sin interés de");
    })

    test("caso 2", async ({page}) => {
        const memoryValue = "128", minPriceValue = "300.000", maxPriceValue = "600.000";

        await homePage.selectFilter("Memoria");
        await homePage.assertfilterSelected(memoryValue);

        await homePage.selectFilter("Precio");
        await homePage.assertfilterSelected(minPriceValue);
        await homePage.assertfilterSelected(maxPriceValue);
        // extraer en otro caso
        await homePage.assertMemoryAndPriceFilter(memoryValue, minPriceValue, maxPriceValue);
    });
});