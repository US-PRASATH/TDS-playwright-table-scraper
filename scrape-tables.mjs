import { chromium } from 'playwright';

const seeds = Array.from({ length: 10 }, (_, i) => 79 + i);
let grandTotal = 0;

const browser = await chromium.launch();
const page = await browser.newPage();

for (const seed of seeds) {
  const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
  await page.goto(url);
  
  const sum = await page.$$eval('table tr td', cells =>
    cells.reduce((acc, td) => acc + Number(td.textContent.trim()), 0)
  );

  console.log(`Seed ${seed} sum: ${sum}`);
  grandTotal += sum;
}

console.log(`Total sum of all seeds: ${grandTotal}`);

await browser.close();
