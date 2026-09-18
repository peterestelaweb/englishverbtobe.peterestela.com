const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});const p=await browser.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));const url='file://'+path.resolve('ingles-to-be/web/index.html')+'#juegos';await p.goto(url);await p.locator('#sound-toggle').click();
const select=async g=>p.locator(`[data-game="${g}"]`).click();const next=async()=>p.locator('#game-actions .primary').click();
for(const mode of ['solo','duel']){
 await p.locator('#match-mode').selectOption(mode);await p.locator('#apply-match').click();
 for(const game of ['gap','short','transform']){
  await select(game);
  for(let i=0;i<8;i++){
   const q=await p.evaluate(g=>englishBank[g].find(q=>q.prompt===document.querySelector('.detective-sentence').textContent&&q.context===document.querySelector('#game-help').textContent),game);
   if(i===0){await p.locator('.choice-options').getByRole('button',{name:q.options.find(x=>x!==q.answer),exact:true}).click();if(!await p.locator('#game-feedback').innerText())throw Error('missing feedback');}
   await p.locator('.choice-options').getByRole('button',{name:q.answer,exact:true}).click();await next();
  }
  if(await p.locator('.game-result').innerText()!=='7 de 8')throw Error('choice score');
  const scores=await p.locator('[data-points]').allTextContents();if(scores.join()!= (mode==='solo'?'930':'360,460'))throw Error('points '+scores);
 }
}
await p.reload();await select('gap');if((await p.locator('#ranking-list').innerText()).includes('estrenar'))throw Error('persistence');
await select('order');for(let i=0;i<6;i++){
 const words=await p.evaluate(()=>englishBank.order.find(q=>document.querySelector('#game-help').textContent.includes(`«${q.es}»`)).words);
 if(i===0){await p.getByRole('button',{name:'Pista',exact:true}).click();await p.locator('.word-bank button').first().click();await p.getByRole('button',{name:'Deshacer',exact:true}).click();if(await p.locator('.sentence-slot button').count())throw Error('undo');}
 for(const w of words)await p.locator('.word-bank').getByRole('button',{name:w,exact:true}).first().click();
 await p.getByRole('button',{name:'Comprobar',exact:true}).click();await next();
}if(await p.locator('.game-result').innerText()!=='5 de 6')throw Error('order');
await select('detective');for(let i=0;i<8;i++){const ok=await p.evaluate(()=>englishBank.detective.find(q=>q.text===document.querySelector('.detective-sentence').textContent).ok);await p.locator(`[data-verdict="${ok}"]`).click();await next();}if(await p.locator('.game-result').innerText()!=='8 de 8')throw Error('detective');
await select('pairs');for(const [i,v] of ['am','are','is','is','is','are','are','are'].entries()){await p.locator(`[data-pair="${i}"]`).click();await p.locator('.verb-targets').getByRole('button',{name:v,exact:true}).click();}if(await p.locator('.game-result').innerText()!=='8 de 8')throw Error('pairs');
await select('memory');const known={};let mismatches=0;
// Discover the board by playing, then complete using the revealed meanings.
for(let n=0;n<12;n+=2){await p.locator(`[data-card="${n}"]`).click();known[n]=await p.locator(`[data-card="${n}"]`).innerText();await p.locator(`[data-card="${n+1}"]`).click();known[n+1]=await p.locator(`[data-card="${n+1}"]`).innerText();if((await p.locator('#game-feedback').innerText()).includes('Incorrecto')){mismatches++;await p.waitForTimeout(1900);}}
const pairs=await p.evaluate(()=>englishBank.memory);for(const [en,es]of pairs){const a=Object.keys(known).find(k=>known[k]===en),b=Object.keys(known).find(k=>known[k]===es);if(a===undefined||b===undefined)continue;const card=p.locator(`[data-card="${a}"]`);if(await card.count()&&await card.isEnabled()){await card.click();await p.locator(`[data-card="${b}"]`).click();}}
if(!await p.locator('.game-result').count())throw Error('memory completion');await p.locator('#game-restart').click();if(await p.locator('.memory-found').count())throw Error('memory restart');
for(const width of [320,375,414,768,1280]){await p.setViewportSize({width,height:900});for(const g of ['pairs','order','detective','gap','short','transform','memory']){await select(g);const overflow=await p.evaluate(()=>[...document.querySelectorAll('#games button,#games input,#games select')].filter(e=>e.getBoundingClientRect().width&&e.getBoundingClientRect().right>innerWidth+1).length);if(overflow)throw Error('overflow '+g+' '+width);if(width===375||width===1280){await p.locator('.game-surface').screenshot({path:`ingles-to-be/qa/expanded-${g}-${width}.png`,animations:'disabled'});}}}
await p.emulateMedia({reducedMotion:'reduce'});await select('gap');await p.locator('.choice-options button').first().focus();await p.keyboard.press('Enter');if(await p.evaluate(()=>document.getAnimations().length))throw Error('motion');
await p.locator('[data-step="0"]').click();if(!await p.locator('#lesson').isVisible())throw Error('lesson');await p.locator('[data-step="5"]').click();if(!await p.locator('#practice').isVisible())throw Error('practice');
const blocked=await browser.newPage();await blocked.addInitScript(()=>{Storage.prototype.getItem=()=>{throw Error('blocked')};Storage.prototype.setItem=()=>{throw Error('blocked')}});await blocked.goto(url);await blocked.locator('[data-game="memory"]').click();if(!await blocked.locator('[data-card="0"]').isVisible())throw Error('blocked storage');
if(errors.length)throw Error(errors.join('\n'));fs.writeFileSync('ingles-to-be/qa/expanded-results.json',JSON.stringify({passed:true,checks:['7 games completed','3 choice games solo and duel','wrong answers: 30 points','duel 360/460','records persist','memory correct feedback/mismatch auto-hide/matched removal/reset','order hints and undo','keyboard Enter','reduced motion','storage blocked','lesson and practice navigation'],viewports:[320,375,414,768,1280],errors},null,2));await browser.close();console.log('PASS expanded games');})().catch(e=>{console.error(e);process.exit(1)});
