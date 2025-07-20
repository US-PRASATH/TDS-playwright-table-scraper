const { chromium } = require('playwright');

const seeds = [79,80,81,82,83,84,85,86,87,88];

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    let totalSum = 0;

    for (let seed of seeds) {
        const url = `https://www.random.org/integers/?num=10&min=1&max=100&col=5&base=10&format=html&rnd=new&seed=${seed}`;
        await page.goto(url);
        
        const pageSum = await page.evaluate(() => {
            let sum = 0;
            const tables = document.querySelectorAll('table');
            tables.forEach(table => {
                table.querySelectorAll('td').forEach(td => {
                    const value = parseInt(td.textContent.trim(), 10);
                    if (!isNaN(value)) sum += value;
                });
            });
            return sum;
        });

        console.log(`Seed ${seed} sum:`, pageSum);
        totalSum += pageSum;
    }

    console.log("✅ Total Sum of All Tables:", totalSum);
    await browser.close();
})();
