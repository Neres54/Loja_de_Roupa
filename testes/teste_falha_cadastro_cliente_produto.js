const { Builder, Browser, By, until } = require('selenium-webdriver');

async function runTest(driver, testName, testFunction) {
    console.log("\n=== Iniciando teste:", testName, "===\n");

    await driver.get('http://127.0.0.1:5500/frontend/');
    await driver.manage().window().maximize();
    await driver.sleep(1000);

    try {
        await testFunction(driver);
        console.log(`✔ Teste concluído: ${testName}`);
    } catch (err) {
        console.error(`✖ Erro durante o teste ${testName}:`, err.message);
    }

    console.log("\n=== Fim do teste:", testName, "===\n");
    await driver.sleep(1500);
}

async function execute() {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();

    try {
        // ================================
        // TESTE 1 – Nome não preenchido
        // ================================
        await runTest(driver, "Nome vazio", async (driver) => {
            await driver.findElement(By.id('email')).sendKeys('teste@mail.com');
            const btn = await driver.findElements(By.css('.btn'));
            await btn[0].click(); // tentar registrar sem nome
            await driver.sleep(1500);
        });

        // ================================
        // TESTE 2 – Email não preenchido
        // ================================
        await runTest(driver, "Email vazio", async (driver) => {
            await driver.findElement(By.id('nome')).sendKeys('Fulano');

            const btn = await driver.findElements(By.css('.btn'));
            await btn[0].click(); // tentar registrar sem email
            await driver.sleep(1500);
        });

        // ================================
        // TESTE 3 – Cliente não selecionado ao cadastrar produto
        // ================================
        await runTest(driver, "Cliente não selecionado", async (driver) => {
            // não cadastra cliente — vai direto para produto
            await driver.findElement(By.id('produto')).sendKeys('Camisa');
            const btn = await driver.findElements(By.css('.btn'));
            await btn[1].click(); // tentar enviar pedido sem cliente
            await driver.sleep(1500);
        });

        // ================================
        // TESTE 4 – Produto não preenchido
        // ================================
        await runTest(driver, "Produto vazio", async (driver) => {
    // cadastra cliente válido
    await driver.findElement(By.id('nome')).sendKeys('Rodolfo');
    await driver.findElement(By.id('email')).sendKeys('Rodolfo@mail.com');
    const btn = await driver.findElements(By.css('.btn'));
    await btn[0].click(); // registrar cliente

    await driver.sleep(1000);

    // selecionar o cliente recém cadastrado
    await driver.findElement(By.css('#cliente-id option:nth-child(1)')).click();

    const btn2 = await driver.findElements(By.css('.btn'));
    await btn2[1].click(); // tentar enviar pedido sem produto
    await driver.sleep(1500);
});

        // ================================
        // TESTE 5 – Quantidade vazia ou negativa
        // ================================
        await runTest(driver, "Quantidade vazia/negativa", async (driver) => {
            await driver.findElement(By.id('nome')).sendKeys('Rodolfo');
            await driver.findElement(By.id('email')).sendKeys('Rodolfo@mail.com');

            const btn = await driver.findElements(By.css('.btn'));
            await btn[0].click();

            await driver.sleep(1000);

            await driver.findElement(By.id('produto')).sendKeys('Teclado');

            // ❌ quantidade negativa
            await driver.findElement(By.id('quantidade')).sendKeys('-5');

            const btn2 = await driver.findElements(By.css('.btn'));
            await btn2[1].click(); 
            await driver.sleep(1500);
        });

        // ================================
        // TESTE 6 – Preço vazio ou negativo
        // ================================
        await runTest(driver, "Preço vazio/negativo", async (driver) => {
            await driver.findElement(By.id('nome')).sendKeys('Rodolfo');
            await driver.findElement(By.id('email')).sendKeys('Rodolfo@mail.com');

            const btn = await driver.findElements(By.css('.btn'));
            await btn[0].click();

            await driver.sleep(1000);

            await driver.findElement(By.id('produto')).sendKeys('Monitor');
            await driver.findElement(By.id('quantidade')).sendKeys('1');

            // ❌ preço negativo
            await driver.findElement(By.id('preco')).sendKeys('-100');

            const btn2 = await driver.findElements(By.css('.btn'));
            await btn2[1].click();
            await driver.sleep(1500);
        });

    } catch (error) {
        console.error('Erro geral no teste:', error);
    }

    // ❗ NÃO FECHA O DRIVER AUTOMATICAMENTE
    console.log("\n🚫 O navegador continuará aberto para análise.\n");
}

execute();
