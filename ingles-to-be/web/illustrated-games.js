'use strict';
(()=>{
 const shapes={
  cat:'<path d="M25 47 22 15 43 30Q60 23 77 30L98 15 95 47Q110 95 60 100 10 95 25 47" fill="#e9ad45" stroke="#553117" stroke-width="3"/><circle cx="43" cy="58" r="4"/><circle cx="77" cy="58" r="4"/><path d="m54 72 6 5 6-5M24 72H5m21 8L7 88m89-16h20m-22 8 20 8" fill="none" stroke="#553117" stroke-width="3"/>',
  ball:'<circle cx="60" cy="60" r="44" fill="#e46d53" stroke="#81321f" stroke-width="3"/><path d="M16 60h88M60 16q-35 44 0 88M60 16q35 44 0 88" fill="none" stroke="#fff8e7" stroke-width="6"/>',
  tree:'<path d="M52 65h16v47H52z" fill="#825331"/><circle cx="60" cy="38" r="30" fill="#26754d"/><circle cx="35" cy="60" r="25" fill="#368658"/><circle cx="85" cy="60" r="25" fill="#368658"/>',
  star:'<path d="m60 8 15 33 36 4-27 25 8 36-32-18-32 18 8-36L9 45l36-4z" fill="#f2c44b" stroke="#826416" stroke-width="3"/>'
 };
 const nouns={cat:['cat','cats','gato','gatos'],ball:['ball','balls','pelota','pelotas'],tree:['tree','trees','árbol','árboles'],star:['star','stars','estrella','estrellas']};
 const scenes=Object.keys(shapes).flatMap(kind=>[1,2].map(count=>{const n=nouns[kind];return {id:kind+count,kind,count,answer:count===1?'is':'are',prompt:count===1?`It ___ a ${n[0]}.`:`They ___ ${n[1]}.`,sentence:count===1?`It is a ${n[0]}.`:`They are ${n[1]}.`,es:count===1?`${['ball','star'].includes(kind)?'Una':'Un'} ${n[2]}`:`Dos ${n[3]}`};}));
 window.englishBank.visual=scenes;window.englishBank.listen=scenes;
 window.illustratedGames={picture(q){const figure=document.createElement('div');figure.className='scene-picture';
  figure.innerHTML=`<svg viewBox="0 0 300 145" role="img"><title>${q.es}</title><rect width="300" height="145" rx="18" fill="#f8f2dc"/>${q.count===1?`<g transform="translate(90 12)">${shapes[q.kind]}</g>`:`<g transform="translate(20 12)">${shapes[q.kind]}</g><g transform="translate(160 12)">${shapes[q.kind]}</g>`}</svg>`;return figure;}};
})();
