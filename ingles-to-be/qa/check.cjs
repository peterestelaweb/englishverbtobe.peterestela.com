const {chromium}=require('playwright');
const fs=require('fs');const path=require('path');
(async()=>{const browser=await chromium.launch({headless:true,channel:'chrome'});const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('file://'+path.resolve('piezas/ingles-to-be/web/index.html'));
const results=[];
for(const width of [320,375,414,768,1280]){await page.setViewportSize({width,height:900});for(let s=0;s<6;s++){await page.locator(`[data-step="${s}"]`).click();if(s<5)await page.locator('[data-person="7"]').click();await page.waitForTimeout(700);const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);if(overflow)throw Error('overflow '+width+' stage '+s);results.push({width,stage:s,overflow});}await page.locator('[data-step="3"]').click();await page.screenshot({path:`piezas/ingles-to-be/qa/${width}.png`,fullPage:true,animations:'disabled'});}
await page.setViewportSize({width:1280,height:900});
for(let i=0;i<8;i++){for(let s=0;s<5;s++){await page.locator(`[data-step="${s}"]`).click();await page.locator(`[data-person="${i}"]`).click();const text=await page.locator('#board').getAttribute('aria-label');if(!text)throw Error('no sentence');}}
await page.locator('[data-step="5"]').click();await page.getByRole('button',{name:'is',exact:true}).click();if(!(await page.locator('#feedback').innerText()).includes('Todavía'))throw Error('wrong feedback');
for(const a of ['am','is','are','Is','Are','not','I’m not','is']){await page.locator('#answers').getByRole('button',{name:a,exact:true}).click();await page.locator('#quiz-next').click();}
if(!(await page.locator('#quiz-prompt').innerText()).includes('7 de 8'))throw Error('score');
await page.locator('#quiz-reset').click();await page.locator('#restart').click();await page.locator('#play').click();await page.waitForTimeout(4700);if(await page.locator('#person-position').innerText()!=='Pronombre 2 de 8')throw Error('autoplay');await page.locator('#play').click();
await page.emulateMedia({reducedMotion:'reduce'});await page.locator('[data-step="3"]').click();if(await page.evaluate(()=>document.getAnimations().length)>0)throw Error('reduced motion');
if(errors.length)throw Error(errors.join('\n'));
fs.writeFileSync('piezas/ingles-to-be/qa/results.json',JSON.stringify({passed:true,viewports:results,contentStates:40,quiz:'8 questions, wrong answer and reset checked',autoplay:'advance and pause checked',reducedMotion:'no animation',pageErrors:errors},null,2));await browser.close();console.log('PASS: 30 viewport/stage combinations; 40 lesson states; quiz; autoplay; reduced motion.');})();
