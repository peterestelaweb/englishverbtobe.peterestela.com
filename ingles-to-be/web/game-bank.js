'use strict';
(()=>{
 const subjects=[['I','am','Yo'],['You','are','Tú'],['He','is','Él'],['She','is','Ella'],['It','is','Eso'],['We','are','Nosotros/as'],['They','are','Ellos/as']];
 const states=[['at home','en casa'],['at school','en el colegio'],['in the park','en el parque'],['in class','en clase'],['in the garden','en el jardín'],['in the kitchen','en la cocina'],['here','aquí'],['there','allí']];
 const esVerbs=['estoy','estás','está','está','está','estamos','están'];
 const cap=s=>s[0].toUpperCase()+s.slice(1),lower=s=>s==='I'?s:s.toLowerCase();
 const order=[],detective=[],gap=[],short=[],transform=[];
 subjects.forEach(([s,v,es],i)=>states.forEach(([place,translation])=>{
  const base=`${s} ${v} ${place}.`,neg=`${s} ${v} not ${place}.`,question=`${cap(v)} ${lower(s)} ${place}?`,rule=`${s} se une a ${v}.`,wrong=v==='is'?'are':'is';
  for(const form of ['yes','no','ask']){
   const text=form==='yes'?base:form==='no'?neg:question;
   const tr=form==='ask'?`¿${cap(esVerbs[i])} ${es.toLowerCase()} ${translation}?`:`${es} ${form==='no'?'no ':''}${esVerbs[i]} ${translation}.`;
   order.push({words:text.slice(0,-1).split(' ').concat(text.slice(-1)),es:tr,rule:rule+(form==='ask'?' Para preguntar, el verbo va delante.':form==='no'?' Not va después del verbo.':'')});
  }
  detective.push({text:base,ok:true,fix:base,why:rule},{text:`${s} ${wrong} ${place}.`,ok:false,fix:base,why:rule},{text:neg,ok:true,fix:neg,why:'Not va después del verbo.'},{text:`${s} not ${v} ${place}.`,ok:false,fix:neg,why:'Not va después del verbo.'});
  gap.push({prompt:`${s} ___ ${place}.`,context:`${es} ${esVerbs[i]} ${translation}.`,answer:v,options:['am','is','are'],why:rule});
  transform.push({prompt:base,context:'Conviértela en pregunta.',answer:question,options:[question,`${s} ${v} ${place}?`,`${cap(wrong)} ${lower(s)} ${place}?`],why:'Para preguntar, coloca am, is o are delante del sujeto.'},
  {prompt:base,context:'Conviértela en negativa.',answer:neg,options:[neg,`${s} not ${v} ${place}.`,`${s} ${wrong} not ${place}.`],why:rule+' Para negar, añade not después del verbo.'});
  // Tercera persona y plural: el contexto determina sí/no sin cambiar el interlocutor.
  if(['He','She','It','They'].includes(s))for(const yes of [true,false]){
   const answer=yes?`Yes, ${lower(s)} ${v}.`:`No, ${lower(s)} ${v} not.`;
   short.push({prompt:question,context:`La pista dice: «${yes?base:neg}» Responde según la pista.`,answer,options:[answer,yes?`No, ${lower(s)} ${v} not.`:`Yes, ${lower(s)} ${v}.`,yes?`Yes, ${lower(s)} ${wrong}.`:`No, ${lower(s)} ${wrong} not.`],why:`La pista es ${yes?'afirmativa':'negativa'}: responde ${yes?'Yes':'No'}. ${rule}`});
  }
 }));
 const memory=[['I am','Yo soy / estoy'],['You are','Tú eres / estás'],['He is','Él es / está'],['She is','Ella es / está'],['It is','Eso es / está'],['We are','Nosotros/as somos / estamos'],['They are','Ellos/as son / están'],['I am not','Yo no soy / no estoy'],['She is not','Ella no es / no está'],['We are not','Nosotros/as no somos / no estamos'],['They are not','Ellos/as no son / no están'],['You are not','Tú no eres / no estás']];
 window.englishBank={order,detective,gap,short,transform,memory};
})();
