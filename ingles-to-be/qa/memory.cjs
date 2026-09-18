const {chromium}=require('playwright');
const path=require('path');

(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const page=await browser.newPage();
 await page.addInitScript(()=>{const nativeSetTimeout=window.setTimeout;window.setTimeout=(fn,ms,...args)=>nativeSetTimeout(fn,Math.min(ms,300),...args);});
 const url='file://'+path.resolve('ingles-to-be/web/index.html')+'#juegos';
 async function start(){await page.goto(url);await page.locator('[data-game="memory"]').click();if(await page.getByRole('button',{name:'Ocultar y seguir',exact:true}).count())throw Error('manual control remains');}
 let wrongSeen=false,correctSeen=false;
 for(let attempt=0;attempt<20&&!wrongSeen;attempt++){
  await start();const cards=page.locator('[data-card]:not(:disabled)');
  await cards.nth(0).click();await page.locator('[data-card]:not(:disabled)').nth(0).click();
  if((await page.locator('#game-feedback').innerText()).startsWith('Incorrecto')){wrongSeen=true;if(await page.locator('[data-card][aria-pressed="true"]').count()!==2)throw Error('wrong pair not revealed');await page.waitForTimeout(400);if(await page.locator('[data-card][aria-pressed="true"]').count())throw Error('wrong pair not hidden');}
 }
 for(let attempt=0;attempt<20&&!correctSeen;attempt++){
  await start();const cards=page.locator('[data-card]:not(:disabled)');const before=await cards.count();
  await cards.nth(0).click();await page.locator('[data-card]:not(:disabled)').nth(0).click();
  if((await page.locator('#game-feedback').innerText()).startsWith('Correcto')){correctSeen=true;if(await page.locator('[data-card]:not(:disabled)').count()!==before-2)throw Error('matched cards not removed');}
 }
 if(!wrongSeen||!correctSeen)throw Error('missing correct or incorrect flow');
 await page.locator('#game-restart').click();if(await page.locator('.memory-found').count())throw Error('memory restart left matches');
 console.log('PASS memory feedback, auto-hide and removal');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
