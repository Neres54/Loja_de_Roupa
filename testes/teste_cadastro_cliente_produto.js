const { Builder, Browser, By, until } = require('selenium-webdriver');

async function execute() {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();

    try {
        // 1. Abre a aplicação
        await driver.manage().window().maximize();
        await driver.get('http://127.0.0.1:5500/frontend/');

        // 2. Preenche nome
        const inputNome = await driver.wait(
            until.elementLocated(By.id('nome')),
            5000
        );
        await driver.sleep(2000)
        await inputNome.sendKeys('Fulano');
        
        // 3. Preenche e-mail
        await driver.sleep(2000)
        const inputEmail = await driver.wait(
            until.elementLocated(By.id('email')),
            5000
        );
        await inputEmail.sendKeys('fulano@mail.com');

        // 4. Clica no botão de registrar cliente (primeiro .btn)
        const botoes = await driver.findElements(By.css('.btn'));
        await botoes[0].click();

        // 5. Aguarda o input de produto aparecer
        await driver.sleep(2000)
        const inputProduto = await driver.wait(
            until.elementLocated(By.id('produto')),
            5000
        );
        await inputProduto.sendKeys('Camisa');
        
        // 6. Preenche quantidade
        const inputQuantidade = await driver.wait(
            until.elementLocated(By.id('quantidade')),
            5000
        );
        await driver.sleep(2000)
        await driver.executeScript("arguments[0].scrollIntoView(true);", inputQuantidade);
        await inputQuantidade.sendKeys('2');
        
        // 7. Preenche preço
        await driver.sleep(2000)
        const inputPreco = await driver.wait(
            until.elementLocated(By.id('preco')),
            5000
        );
        await inputPreco.sendKeys('89.90');
        
        // 8. Envia pedido (segundo botão .btn)
        const botoes2 = await driver.findElements(By.css('.btn'));
        await botoes2[1].click();
        
        // 9. Só pra visualizar o resultado
        await driver.sleep(3000);
        
        const pesquisaPedido = await driver.wait(
            until.elementLocated(By.id('filtro-pedidos')),
            5000
        )
        await pesquisaPedido.sendKeys('camis')
        const listaPedidos = await driver.wait(until.elementLocated(By.id('lista-pedidos')), 2000)
        await driver.executeScript("arguments[0].scrollIntoView(true);", listaPedidos);
        await driver.sleep(5000)
        
    } catch (error) {
        console.error('Erro no teste:', error);
    } finally {
        await driver.quit();
    }
}

execute();
