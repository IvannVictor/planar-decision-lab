'use strict';
(() => {
  const slides = [...document.querySelectorAll('[data-slide]')];
  const slideLabels = ['THE DECISION','WHERE WE ARE','ROUTE A / DC-e','ROUTE B / MEI','THE COMPARISON','SCENARIO LAB','THE DECISION'];
  const $ = id => document.getElementById(id);
  const money = n => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(n);
  const clamp = (n,a,b) => Math.min(b,Math.max(a,n));
  const initial = Number(new URLSearchParams(location.search).get('slide')) || 1;
  let current = clamp(initial - 1,0,slides.length-1);
  let previousFocus = null;
  const backdrop = $('modalBackdrop');
  const dialog = backdrop.querySelector('.dialog');
  const compareText = {
    cost:['Emissão potencialmente gratuita em remessa elegível.','Não elimina tributos devidos e não autoriza vendas comerciais.','Abertura gratuita e DAS de R$ 82,05/mês ou R$ 87,05/mês em 2026.','Pagamento mensal mesmo sem faturamento.'],
    legal:['Não substitui documento fiscal exigido para uma venda.','Uso comercial da Planar ainda sem fundamento específico homologado.','Permite estruturar emissão fiscal conforme regras aplicáveis.','Exige atividade permitida, cadastro adequado e obrigações acessórias.'],
    ops:['Documento de transporte para casos legalmente elegíveis.','Postagem aceita não significa operação regularizada.','NFF pode simplificar a emissão gratuita de NF-e em SP.','Habilitação, integração logística e processos da loja precisam ser validados.'],
    growth:['Não oferece estrutura empresarial para vendas continuadas.','A habitualidade ou volume comercial aumenta o risco de desenquadramento.','Oferece CNPJ e rotina fiscal escalável dentro dos limites do MEI.','Crescimento exige monitorar faturamento, ocupações e limites legais.']
  };
  function navigate(index, focus=false){
    const next=clamp(index,0,slides.length-1);
    if(next===current && slides[next].classList.contains('is-active'))return;
    slides[current].classList.remove('is-active');slides[current].setAttribute('aria-hidden','true');
    current=next;slides[current].classList.add('is-active');slides[current].removeAttribute('aria-hidden');
    $('slideIndex').textContent=String(current+1).padStart(2,'0');$('slideName').textContent=slideLabels[current];
    $('progressFill').style.width=((current+1)/slides.length*100)+'%';
    $('prevBtn').disabled=current===0;$('nextBtn').disabled=current===slides.length-1;
    window.scrollTo({top:0,behavior:'instant'});
    if(focus){const head=slides[current].querySelector('h1,h2');head.setAttribute('tabindex','-1');head.focus({preventScroll:true});}
  }
  slides.forEach((slide,i)=>{slide.setAttribute('aria-roledescription','tela');slide.setAttribute('aria-label',`${i+1} de ${slides.length}`);if(i!==current)slide.setAttribute('aria-hidden','true');});
  $('prevBtn').addEventListener('click',()=>navigate(current-1,true));$('nextBtn').addEventListener('click',()=>navigate(current+1,true));
  $('exploreBtn').addEventListener('click',()=>navigate(1,true));$('restartBtn').addEventListener('click',()=>navigate(0,true));
  function openModal(type){previousFocus=document.activeElement;const sources=type==='sources';$('dialogKicker').textContent=sources?'REFERENCES / 2026':'LEGAL CONTEXT / 2026';$('dialogTitle').textContent=sources?'FONTES E CRITÉRIOS.':'POR QUE A DC-e EXIGE CUIDADO?';$('dialogContent').replaceChildren($(sources?'sourcesContent':'dceContent').content.cloneNode(true));backdrop.hidden=false;document.body.style.overflow='hidden';dialog.focus();}
  function closeModal(){if(backdrop.hidden)return;backdrop.hidden=true;document.body.style.overflow='';previousFocus?.focus();}
  $('sourcesBtn').addEventListener('click',()=>openModal('sources'));document.querySelectorAll('[data-modal]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.modal)));
  $('closeModal').addEventListener('click',closeModal);backdrop.addEventListener('click',e=>{if(e.target===backdrop)closeModal();});
  document.addEventListener('keydown',e=>{
    if(!backdrop.hidden){if(e.key==='Escape'){e.preventDefault();closeModal();}else if(e.key==='Tab'){const els=[...dialog.querySelectorAll('button:not([disabled]),a[href],select,input')];const first=els[0],last=els.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}return;}
    if(e.key==='Escape'&&document.fullscreenElement){document.exitFullscreen?.();return;}
    if(['INPUT','SELECT','TEXTAREA'].includes(document.activeElement?.tagName))return;
    if(e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();navigate(current+1,true);}
    else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();navigate(current-1,true);}
    else if(e.key==='Home'){e.preventDefault();navigate(0,true);}
    else if(e.key==='End'){e.preventDefault();navigate(slides.length-1,true);}
  });
  let touchX=0,touchY=0;
  document.querySelector('.stage').addEventListener('touchstart',e=>{if(!backdrop.hidden)return;touchX=e.changedTouches[0].screenX;touchY=e.changedTouches[0].screenY;},{passive:true});
  document.querySelector('.stage').addEventListener('touchend',e=>{if(!backdrop.hidden||e.target.closest('input,select,button,a'))return;const dx=e.changedTouches[0].screenX-touchX,dy=e.changedTouches[0].screenY-touchY;if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.3)navigate(current+(dx<0?1:-1),true);},{passive:true});
  const fs=$('fullscreenBtn');if(!document.documentElement.requestFullscreen)fs.hidden=true;
  fs.addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch(e){fs.title='Tela cheia indisponível neste navegador';}});
  document.addEventListener('fullscreenchange',()=>{fs.setAttribute('aria-label',document.fullscreenElement?'Sair da tela cheia':'Entrar em tela cheia');});
  $('salesSelect').addEventListener('change',e=>{$('quickGross').textContent=money(Number(e.target.value)*59.99);});
  document.querySelectorAll('[data-topic]').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('[data-topic]').forEach(x=>{const yes=x===button;x.classList.toggle('is-selected',yes);x.setAttribute('aria-pressed',String(yes));});
    const [a,ad,b,bd]=compareText[button.dataset.topic];$('aHighlight').textContent=a;$('aDetail').textContent=ad;$('bHighlight').textContent=b;$('bDetail').textContent=bd;
  }));
  function updateLab(){const quantity=Number($('quantity').value),margin=Number($('margin').value),das=Number($('das').value);const gross=quantity*59.99,contribution=quantity*margin,balance=contribution-das,breakEven=Math.ceil(das/margin);$('quantityLabel').textContent=quantity+' un.';$('marginLabel').textContent=money(margin);$('gross').textContent=money(gross);$('contribution').textContent=money(contribution);$('tax').textContent=money(das);$('balance').textContent=money(balance);$('balance').classList.toggle('negative',balance<0);$('breakEven').innerHTML=`${breakEven} <small>un.</small>`;}
  ['quantity','margin','das'].forEach(id=>$(id).addEventListener('input',updateLab));
  updateLab();navigate(current);$('slideIndex').textContent=String(current+1).padStart(2,'0');$('slideName').textContent=slideLabels[current];$('progressFill').style.width=((current+1)/slides.length*100)+'%';$('prevBtn').disabled=current===0;$('nextBtn').disabled=current===slides.length-1;
  window.PlanarDecisionLab={navigate,calculate:(q,m,d)=>({gross:q*59.99,contribution:q*m,das:d,balance:q*m-d,breakEven:Math.ceil(d/m)})};
})();
