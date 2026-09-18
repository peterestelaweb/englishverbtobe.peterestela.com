'use strict';
(()=>{
 const el=id=>document.getElementById(id);
 const shuffle=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
 const pairs=[['I','Yo','am'],['You','Tú / usted','are'],['He','Él','is'],['She','Ella','is'],['It','Animal / cosa','is'],['We','Nosotros/as','are'],['You','Vosotros/as / ustedes','are'],['They','Ellos / ellas','are']];
 let memoryTimer=null;
 let memoryCards=[],flipped=[],found=new Set(),memoryErrors=false;
 let game='pairs',round=0,score=0,mistake=false,locked=false,selected=null,matched=new Set(),failedPairs=new Set(),deck=[],chosen=[];
 function button(text,fn,primary=false){const b=document.createElement('button');b.textContent=text;b.onclick=fn;if(primary)b.className='primary';return b;}
 function message(text){el('game-feedback').textContent=text;}
 function action(text,fn,primary=false){const b=button(text,fn,primary);el('game-actions').append(b);return b;}
 function reset(){clearTimeout(memoryTimer);memoryTimer=null;window.speechSynthesis?.cancel();window.matchGame.reset(game);round=0;score=0;mistake=false;locked=false;selected=null;matched=new Set();failedPairs=new Set();chosen=[];deck=game==='pairs'?shuffle(pairs.map((_,i)=>i)):game==='memory'?shuffle(window.englishBank.memory).slice(0,6):shuffle(window.englishBank[game]).slice(0,game==='order'?6:8);flipped=[];found=new Set();memoryErrors=false;if(game==='memory')memoryCards=shuffle(deck.flatMap((pair,i)=>pair.map((text,side)=>({text,pair:i,side}))));render();}
 function shell(title,help,progress){el('game-title').textContent=title;el('game-help').textContent=help;el('game-progress').textContent=progress;el('game-content').replaceChildren();el('game-actions').replaceChildren();message('');}
 function finish(total){window.matchGame.finish();shell('¡Partida completada!','Puedes repetir para seguir practicando o elegir otro juego.','RESULTADO');const p=document.createElement('p');p.className='game-result';p.textContent=`${score} de ${total}`;el('game-content').append(p);message(game==='detective'?'Respuestas correctas. Cada frase tenía su explicación.':'Respuestas correctas al primer intento. Has completado todas las rondas.');action('Volver a jugar',reset,true);}
 function advance(total){window.speechSynthesis?.cancel();round++;mistake=false;locked=false;chosen=[];if(round===total)finish(total);else render();el('game-title').focus({preventScroll:true});}
 function render(){if(game==='pairs')renderPairs();else if(game==='order')renderOrder();else if(game==='detective')renderDetective();else if(game==='memory')renderMemory();else if(game==='visual'||game==='listen')renderIllustrated();else renderChoice();}
 function renderPairs(){shell('Cada pronombre busca su verbo.','Toca un pronombre y después elige am, is o are.',`${matched.size} DE 8 PAREJAS`);const grid=document.createElement('div');grid.className='pair-pronouns';deck.forEach(i=>{const p=pairs[i];const b=button('',()=>{selected=i;renderPairs();el('game-content').querySelector('.verb-targets button').focus({preventScroll:true});message(`Has elegido ${p[0]} (${p[1]}). Ahora elige su verbo.`);});b.dataset.pair=i;b.setAttribute('aria-pressed',String(selected===i));const title=document.createElement('b');title.lang='en';title.textContent=matched.has(i)?`${p[0]} → ${p[2]} ✓`:p[0];const sub=document.createElement('small');sub.textContent=p[1];b.append(title,sub);b.disabled=matched.has(i);if(b.disabled)b.className='matched';grid.append(b);});el('game-content').append(grid);const targets=document.createElement('div');targets.className='verb-targets';['am','is','are'].forEach(v=>{const b=button(v,()=>{if(selected===null){message('Primero toca uno de los pronombres.');return;}const p=pairs[selected];if(v!==p[2]){failedPairs.add(selected);mistake=true;window.matchGame.fail();message(`Prueba otra vez: ${p[0]} se une a ${p[2]}.`);return;}window.matchGame.award(!failedPairs.has(selected));if(!failedPairs.has(selected))score++;matched.add(selected);selected=null;mistake=false;if(matched.size===8){finish(8);return;}renderPairs();el('game-content').querySelector('.pair-pronouns button:not(:disabled)').focus({preventScroll:true});message(`¡Pareja encontrada! ${p[0]} ${v}. Elige otro pronombre.`);});b.lang='en';targets.append(b);});el('game-content').append(targets);}
 function renderOrder(){const q=deck[round];shell('Construye la frase.',`Traduce: «${q.es}» Toca las palabras en orden. Puedes tocar una palabra colocada para devolverla.`,`FRASE ${round+1} DE 6`);const slot=document.createElement('div');slot.className='sentence-slot';slot.setAttribute('aria-label','Tu frase');slot.lang='en';const bank=document.createElement('div');bank.className='word-bank';bank.setAttribute('aria-label','Palabras disponibles');let pool=shuffle(q.words.map((_,i)=>i));if(pool.every((n,i)=>n===i))pool.reverse();
 function draw(){slot.replaceChildren();bank.replaceChildren();chosen.forEach(i=>{const b=button(q.words[i],()=>{chosen=chosen.filter(n=>n!==i);draw();});b.disabled=locked;b.setAttribute('aria-label',`Quitar ${q.words[i]}`);slot.append(b);});pool.forEach(i=>{const b=button(q.words[i],()=>{chosen.push(i);draw();(bank.querySelector("button:not(:disabled)")||el("game-actions").querySelector(".primary")).focus({preventScroll:true});});b.dataset.word=q.words[i];b.lang='en';b.disabled=locked||chosen.includes(i);bank.append(b);});}
 el('game-content').append(slot,bank);draw();action('Deshacer',()=>{if(!locked){chosen.pop();draw();message('Última palabra devuelta.');}});action('Vaciar',()=>{if(!locked){chosen=[];draw();message('Puedes empezar la frase de nuevo.');}});action('Pista',()=>{if(!locked){mistake=true;window.matchGame.fail();message(q.rule);}});const check=action('Comprobar',()=>{if(locked)return;if(chosen.length!==q.words.length){message('Coloca todas las palabras y el signo final.');return;}if(!chosen.every((i,n)=>q.words[i]===q.words[n])){mistake=true;window.matchGame.fail();message(`Todavía no. ${q.rule} Puedes quitar una palabra o vaciar la frase.`);return;}locked=true;window.matchGame.award(!mistake);if(!mistake)score++;draw();message(`¡Frase construida! ${q.rule}`);el('game-actions').replaceChildren();action(round===5?'Ver resultado':'Siguiente frase →',()=>advance(6),true).focus({preventScroll:true});},true);check.dataset.check='order';}
 function renderDetective(){const q=deck[round];shell('¿Está bien escrita?','Lee la frase y decide. Después verás la explicación.',`CASO ${round+1} DE 8`);const p=document.createElement('p');p.className='detective-sentence';p.lang='en';p.textContent=q.text;const options=document.createElement('div');options.className='detective-options';[true,false].forEach(v=>{const b=button(v?'Está bien':'Tiene un error',()=>{if(locked)return;locked=true;const correct=v===q.ok;window.matchGame.award(correct,correct);if(correct)score++;[...options.children].forEach(x=>x.disabled=true);message(`${correct?'¡Bien visto!':'Esta vez no.'} ${q.ok?'La frase es correcta.':`La forma correcta es: ${q.fix}`} ${q.why}`);action(round===7?'Ver resultado':'Siguiente caso →',()=>advance(8),true).focus({preventScroll:true});});b.dataset.verdict=v;options.append(b);});el('game-content').append(p,options);}

 const choiceTitles={gap:'La palabra perdida',short:'Respuestas cortas',transform:'Cambia la frase'};
 function renderChoice(){
  const q=deck[round];shell(choiceTitles[game],q.context,`RETO ${round+1} DE 8`);
  const prompt=document.createElement('p');prompt.className='detective-sentence';prompt.lang='en';prompt.textContent=q.prompt;
  const options=document.createElement('div');options.className='choice-options';
  shuffle(q.options).forEach(text=>{const b=button(text,()=>{
   if(locked)return;
   if(text!==q.answer){mistake=true;window.matchGame.fail();b.disabled=true;message(`Prueba otra vez. ${q.why}`);return;}
   locked=true;window.matchGame.award(!mistake);if(!mistake)score++;
   [...options.children].forEach(x=>x.disabled=true);b.classList.add('answer-correct');message(`¡Lo has conseguido! ${q.why}`);
   action(round===7?'Ver resultado':'Siguiente reto →',()=>advance(8),true).focus({preventScroll:true});
  });b.lang='en';options.append(b);});
  el('game-content').append(prompt,options);
 }
 function renderMemory(){
  shell('Memoria de parejas','Encuentra la frase en inglés y su significado en español. Voltea dos tarjetas. Las parejas acertadas desaparecen y los fallos se ocultan automáticamente.',`${found.size} DE 6 PAREJAS`);
  const grid=document.createElement('div');grid.className='memory-grid';
  memoryCards.forEach((card,i)=>{
   if(found.has(card.pair))return;
   const visible=flipped.includes(i)||found.has(card.pair);
   const b=button(visible?card.text:`${card.side===0?'EN':'ES'} · ${i+1}`,()=>{
    if(locked||found.has(card.pair)||flipped.includes(i))return;
    flipped.push(i);
    if(flipped.length===2){locked=true;const [a,b]=flipped.map(n=>memoryCards[n]);
     if(a.pair===b.pair){found.add(a.pair);window.matchGame.award(!memoryErrors);if(!memoryErrors)score++;memoryErrors=false;
      if(found.size===6){finish(6);return;}
      flipped=[];locked=false;renderMemory();message(`Correcto: ${a.text} y ${b.text} forman pareja. Sigue buscando.`);return;
     }
     memoryErrors=true;window.matchGame.fail();
    }
    renderMemory();
    if(locked){message('Incorrecto: estas tarjetas no forman pareja. Se ocultarán para que sigas.');el('game-title').focus({preventScroll:true});memoryTimer=setTimeout(()=>{memoryTimer=null;flipped=[];locked=false;const restoreFocus=document.activeElement===el('game-title')||el('game-content').contains(document.activeElement);renderMemory();if(restoreFocus)gridFocus();},1800);}
    else gridFocus();
   });
   b.dataset.card=i;b.lang=visible&&card.side===0?'en':'es';b.setAttribute('aria-label',visible?card.text:`Tarjeta ${i+1}, ${card.side===0?'inglés':'español'}, boca abajo`);
   b.setAttribute('aria-pressed',String(visible));b.disabled=found.has(card.pair)||flipped.includes(i)||locked;
   if(found.has(card.pair))b.className='memory-found';grid.append(b);
  });el('game-content').append(grid);
 }

 function renderIllustrated(){
  const q=deck[round], listening=game==='listen';
  shell(listening?'Escucha y encuentra':'Mira y completa',listening?'Pulsa Escuchar y elige la imagen. También puedes mostrar la frase.':'Mira la imagen y elige el verbo que completa la frase.',`RETO ${round+1} DE 8`);
  if(listening){
   const play=button('▶ Escuchar frase',()=>window.matchGame.speak(q.sentence),true);
   const hint=button('Mostrar frase',()=>{text.hidden=false;});
   const text=document.createElement('p');text.textContent=q.sentence;text.lang='en';text.className='detective-sentence';text.hidden=true;
   el('game-content').append(play,hint,text);
  }else{
   el('game-content').append(window.illustratedGames.picture(q));
   const p=document.createElement('p');p.className='detective-sentence';p.lang='en';p.textContent=q.prompt;el('game-content').append(p);
  }
  const options=document.createElement('div');options.className=listening?'picture-options':'choice-options';
  const choices=listening?shuffle(window.englishBank.visual.filter(x=>x.id!==q.id)).slice(0,3).concat(q):['am','is','are'];
  shuffle(choices).forEach(value=>{
   const correct=listening?value.id===q.id:value===q.answer;
   const b=button(listening?'':value,()=>{
    if(locked)return;
    if(!correct){mistake=true;window.matchGame.fail();b.disabled=true;message(listening?'Escucha de nuevo o muestra la frase y busca su imagen.':'Uno: is. Varios: are. Prueba otra vez.');return;}
    locked=true;window.speechSynthesis?.cancel();window.matchGame.award(!mistake);if(!mistake)score++;
    [...options.children].forEach(x=>x.disabled=true);b.classList.add('answer-correct');message('¡Bien! '+q.sentence);
    action(round===7?'Ver resultado':'Siguiente reto →',()=>advance(8),true).focus({preventScroll:true});
   });
   if(listening){b.append(window.illustratedGames.picture(value));b.setAttribute('aria-label',value.es);b.dataset.scene=value.id;}else b.lang='en';
   options.append(b);
  });el('game-content').append(options);
 }
 function gridFocus(){el('game-content').querySelector('button:not(:disabled)')?.focus({preventScroll:true});}
 document.querySelectorAll('[data-game]').forEach(b=>b.onclick=()=>{game=b.dataset.game;document.querySelectorAll('[data-game]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));reset();});
 el('game-restart').onclick=reset;reset();
})();
