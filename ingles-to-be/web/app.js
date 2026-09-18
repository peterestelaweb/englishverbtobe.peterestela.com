'use strict';
const people = [
 {p:'I',es:'Yo',v:'am',tr:'Estoy preparado/a.',q:'¿Estoy preparado/a?',n:'No estoy preparado/a.',short:"I’m",neg:"I’m not",hint:'La persona que habla.'},
 {p:'You',es:'Tú / usted',v:'are',tr:'Estás preparado/a.',q:'¿Estás preparado/a?',n:'No estás preparado/a.',short:"You’re",neg:"You aren’t",hint:'La persona con la que hablas. También puede significar «usted».'},
 {p:'He',es:'Él',v:'is',tr:'Él está preparado.',q:'¿Está él preparado?',n:'Él no está preparado.',short:"He’s",neg:"He isn’t",hint:'Un hombre o un chico del que hablas.'},
 {p:'She',es:'Ella',v:'is',tr:'Ella está preparada.',q:'¿Está ella preparada?',n:'Ella no está preparada.',short:"She’s",neg:"She isn’t",hint:'Una mujer o una chica de la que hablas.'},
 {p:'It',es:'Animal / cosa',v:'is',tr:'Está listo. (El desayuno)',q:'¿Está listo? (El desayuno)',n:'No está listo. (El desayuno)',short:"It’s",neg:"It isn’t",hint:'Una cosa o un animal. Aquí hablamos del desayuno: «it» lo sustituye.'},
 {p:'We',es:'Nosotros/as',v:'are',tr:'Estamos preparados/as.',q:'¿Estamos preparados/as?',n:'No estamos preparados/as.',short:"We’re",neg:"We aren’t",hint:'Tú y una o más personas: el grupo incluye a quien habla.'},
 {p:'You',es:'Vosotros/as',v:'are',tr:'Estáis preparados/as.',q:'¿Estáis preparados/as?',n:'No estáis preparados/as.',short:"You’re",neg:"You aren’t",hint:'Varias personas con las que hablas. También significa «ustedes».'},
 {p:'They',es:'Ellos / ellas',v:'are',tr:'Están preparados/as.',q:'¿Están preparados/as?',n:'No están preparados/as.',short:"They’re",neg:"They aren’t",hint:'Varias personas, animales o cosas de las que hablas.'}
];
const stages = [
 ['Pronombres','Empieza por la persona.','Cada pronombre nos dice de quién hablamos. Elige uno y mira su significado.'],
 ['Unir','Cada pronombre tiene su verbo.','To be cambia según quién hable. Une el pronombre con am, is o are.'],
 ['Afirmativo','Ya tienes una frase.','Añade ready («preparado/a» o «listo/a»). Aquí, to be significa estar.'],
 ['Interrogativo','El verbo pasa delante.','Intercambia el pronombre y el verbo para hacer una pregunta.'],
 ['Negativo','Añade not después del verbo.','Vuelve al orden de la afirmación y añade not para decir que no.'],
 ['Practicar','Ahora te toca a ti.',''],
 ['Juegos','Aprende jugando.','']
];
const $=id=>document.getElementById(id);
let person=0,stage=0,timer=null,quizIndex=0,firstTry=0,attempted=false,solved=false;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
$('steps').innerHTML=stages.map((s,i)=>`<button data-step="${i}"><span class="step-number">0${i+1}</span>${s[0]}</button>`).join('');
$('pronouns').innerHTML=people.map((p,i)=>`<button class="person" data-person="${i}" aria-pressed="false"><span class="english" lang="en">${p.p}</span><span class="spanish">${p.es}</span></button>`).join('');
function stop(){clearInterval(timer);timer=null;$('play').textContent='▷ Reproducir';$('play').setAttribute('aria-pressed','false');}
function render(animate=true){
 const p=people[person];
 // FLIP keeps the same word elements while showing their real change of position.
 const nodes=['subject','verb','not','complement','punctuation'].map($);
 nodes.forEach(n=>n.getAnimations().forEach(a=>a.cancel()));
 const old=new Map(nodes.filter(n=>!n.hidden).map(n=>[n,n.getBoundingClientRect()]));
 document.querySelectorAll('[data-step]').forEach((b,i)=>{if(i===stage)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
 document.querySelectorAll('[data-person]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===person)));
 $('lesson').hidden=stage>=5;$('practice').hidden=stage!==5;$('games').hidden=stage!==6;
 if(stage===6)return;
 if(stage===5){renderQuiz();return;}
 $('stage-count').textContent=`PASO 0${stage+1} / 05`;
 $('stage-title').textContent=stages[stage][1];$('instruction').textContent=stages[stage][2];
 $('subject').textContent=stage===3&&p.p!=='I'?p.p.toLowerCase():p.p;
 $('verb').textContent=stage===3?p.v[0].toUpperCase()+p.v.slice(1):p.v;
 $('subject').hidden=false;$('verb').hidden=stage===0;$('not').hidden=stage!==4;
 $('complement').hidden=stage<2;$('punctuation').hidden=stage<2;$('punctuation').textContent=stage===3?'?':'.';
 const order=stage===3?['verb','subject','not','complement','punctuation']:['subject','verb','not','complement','punctuation'];
 order.forEach(id=>$('tiles').appendChild($(id)));
 $('translation').textContent=stage===0?p.es:stage===1?'ser / estar':stage===3?p.q:stage===4?p.n:p.tr;
 const sentence=order.filter(id=>!$(id).hidden).map(id=>$(id).textContent).join(' ').replace(/ ([.?])/,'$1');
 $('board').setAttribute('aria-label',`${sentence}. ${$('translation').textContent}`);
 const rules=[p.hint,`<strong lang="en">${p.p} + ${p.v}</strong> · ${p.v==='am'?'Am solo se usa con I.':p.v==='is'?'He, she e it se unen a is.':'You, we y they se unen a are.'}`,`<strong>Pronombre + verbo + resto de la frase.</strong> Así afirmamos algo.`,`<strong>Verbo + pronombre + resto de la frase + ?</strong> Con to be no añadimos do ni does.`,`<strong>Pronombre + verbo + not + resto de la frase.</strong> Not va justo después de ${p.v}.`];
 $('rule').innerHTML=rules[stage];
 $('contraction').textContent=stage===2?`También puedes decir: ${p.short} ready.`:stage===4?`Forma corta: ${p.neg} ready.${p.v==='am'?' Usamos I’m not; no amn’t.':` También: ${p.short} not ready.`}`:stage===0&&person===4?'Para personas usamos he o she; para animales conocidos también se pueden usar.':stage===3?'En inglés, el signo de interrogación solo se escribe al final.':'';
 $('person-position').textContent=`Pronombre ${person+1} de 8`;
 $('previous-person').disabled=person===0;$('next-person').disabled=person===7;
 $('next').textContent=['Unir al verbo →','Crear una frase →','Hacer una pregunta →','Pasar a negativo →','Practicar →'][stage];
 if(animate&&!reduced.matches){
  nodes.filter(n=>!n.hidden).forEach(n=>{const before=old.get(n),after=n.getBoundingClientRect();
   if(before&&before.width&&before.height)n.animate([{transform:`translate(${before.x-after.x}px,${before.y-after.y}px)`},{transform:'translate(0,0)'}],{duration:650,easing:'cubic-bezier(.2,.75,.2,1)'});
   else n.animate([{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,easing:'ease-out'});
  });
 }
}
$('steps').addEventListener('click',e=>{const b=e.target.closest('[data-step]');if(!b)return;stop();stage=Number(b.dataset.step);render();});
$('pronouns').addEventListener('click',e=>{const b=e.target.closest('[data-person]');if(!b)return;stop();person=Number(b.dataset.person);render();});
$('next').onclick=()=>{stop();stage=Math.min(5,stage+1);render();};
$('previous-person').onclick=()=>{stop();person=Math.max(0,person-1);render();};
$('next-person').onclick=()=>{stop();person=Math.min(7,person+1);render();};
$('repeat').onclick=()=>{stop();if(stage>0){const target=stage;stage=target>=3?2:target-1;render(false);stage=target;render(true);}else if(!reduced.matches){$('tiles').animate([{opacity:.2,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:600,easing:'ease-out'});}};
$('play').onclick=()=>{if(timer){stop();return;} $('play').textContent='Ⅱ Pausar';$('play').setAttribute('aria-pressed','true');timer=setInterval(()=>{if(person<7)person++;else {person=0;stage++;}if(stage===5)stop();render();},4500);};
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
$('restart').onclick=()=>{stop();stage=0;person=0;resetQuiz();render();};
const questions=[
 {prompt:'Completa la afirmación.',sentence:'I ___ ready.',options:['is','am','are'],answer:'am',why:'I siempre se une a am.'},
 {prompt:'Completa la afirmación.',sentence:'She ___ happy.',options:['is','are','am'],answer:'is',why:'She se une a is. She is happy: ella está contenta.'},
 {prompt:'Completa la afirmación.',sentence:'They ___ at home.',options:['am','is','are'],answer:'are',why:'They se une a are. They are at home: están en casa.'},
 {prompt:'Completa la pregunta.',sentence:'___ he ready?',options:['Are','Is','Am'],answer:'Is',why:'Is pasa delante de he: Is he ready?'},
 {prompt:'Completa la pregunta.',sentence:'___ you happy?',options:['Are','Am','Is'],answer:'Are',why:'You se une a are, tanto en singular como en plural.'},
 {prompt:'Completa la negación.',sentence:'We are ___ ready.',options:['no','not','do'],answer:'not',why:'Para negar añadimos not después del verbo: We are not ready.'},
 {prompt:'Elige la forma corta de «I am not ready».',sentence:'___ ready.',options:['I amn’t','I isn’t','I’m not'],answer:'I’m not',why:'La contracción correcta es I’m not.'},
 {prompt:'Completa la negación.',sentence:'It ___ not ready.',options:['are','is','am'],answer:'is',why:'It se une a is. It is not ready: no está listo.'}
];
function resetQuiz(){quizIndex=0;firstTry=0;attempted=false;solved=false;}
function renderQuiz(){
 $('quiz-next').hidden=true;$('quiz-reset').hidden=true;$('feedback').textContent='';
 if(quizIndex>=questions.length){$('quiz-count').textContent='PRÁCTICA COMPLETADA';$('quiz-prompt').textContent=`${firstTry} de ${questions.length} respuestas correctas al primer intento.`;$('quiz-sentence').textContent='I am. You are. She is.';$('answers').replaceChildren();$('feedback').textContent='Ya has repasado afirmaciones, preguntas y negaciones. Puedes repetir la práctica o volver a cualquier paso.';$('quiz-reset').hidden=false;return;}
 const q=questions[quizIndex];$('quiz-count').textContent=`PREGUNTA ${quizIndex+1} DE ${questions.length}`;$('quiz-prompt').textContent=q.prompt;$('quiz-sentence').textContent=q.sentence;
 $('answers').replaceChildren();q.options.forEach(option=>{const b=document.createElement('button');b.textContent=option;b.lang='en';b.onclick=()=>answer(option,b);$('answers').appendChild(b);});
 if(solved){[...$('answers').children].forEach(b=>{b.disabled=true;if(b.textContent===q.answer)b.classList.add('correct');});$('feedback').textContent=`Correcto. ${q.why}`;$('quiz-next').hidden=false;}
}
function answer(option,b){if(solved)return;const q=questions[quizIndex];if(option===q.answer){if(!attempted)firstTry++;solved=true;b.classList.add('correct');$('feedback').textContent=`Correcto. ${q.why}`;[...$('answers').children].forEach(a=>a.disabled=true);$('quiz-next').hidden=false;$('quiz-next').focus({preventScroll:true});}else{attempted=true;$('feedback').textContent='Todavía no. Piensa en el pronombre y vuelve a intentarlo.';b.setAttribute('aria-label',`${option}: respuesta incorrecta, prueba otra`);}}
$('quiz-next').onclick=()=>{quizIndex++;attempted=false;solved=false;renderQuiz();if(quizIndex<questions.length)$('answers').firstElementChild.focus({preventScroll:true});else $('quiz-reset').focus({preventScroll:true});};
$('quiz-reset').onclick=()=>{resetQuiz();renderQuiz();$('answers').firstElementChild.focus({preventScroll:true});};
render(false);
if(location.hash==='#juegos'){stage=6;render(false);}
