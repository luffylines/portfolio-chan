const theme=document.querySelector('#theme');function applyTheme(dark){document.body.classList.toggle('dark',dark);theme.setAttribute('title',dark?'Switch to light mode':'Switch to dark mode');theme.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode')}try{applyTheme(localStorage.getItem('ca-theme')==='dark')}catch(e){}theme.addEventListener('click',()=>{const dark=!document.body.classList.contains('dark');applyTheme(dark);try{localStorage.setItem('ca-theme',dark?'dark':'light')}catch(e){}});let timeout;document.querySelector('#copy').addEventListener('click',async()=>{const toast=document.querySelector('#toast');try{await navigator.clipboard.writeText('@crstn.aring6');toast.textContent='Username copied!'}catch(e){toast.textContent='@crstn.aring6'}toast.style.display='block';clearTimeout(timeout);timeout=setTimeout(()=>toast.style.display='none',2600)});// Progressive motion: all content remains visible without JavaScript.
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
const intro=document.querySelector('.cinematic-intro');
if(intro){intro.addEventListener('animationend',event=>{if(event.target===intro)intro.remove()});setTimeout(()=>intro.remove(),2100);}
let revealObserver;
if(!motionPreference.matches&&'IntersectionObserver' in window){
 revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');revealObserver.unobserve(entry.target)}}),{threshold:.08});
 document.querySelectorAll('.section-head,.about-grid,.education-grid,.achievement-grid,.certificate-row,.skills-grid article,.project,.toolbox,.testimonials-panel,.contact-panel').forEach((el,i)=>{el.classList.add('motion-ready');el.style.setProperty('--reveal-delay',el.closest('.skills-grid')?(i%3)*65+'ms':'0ms');revealObserver.observe(el)});
}
motionPreference.addEventListener('change',event=>{if(event.matches){revealObserver?.disconnect();document.querySelectorAll('.motion-ready').forEach(el=>el.classList.add('in-view'));document.querySelector('.cinematic-intro')?.remove()}});
const progress=document.createElement('div');progress.className='scroll-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
let scheduled=false;function updateProgress(){const range=document.documentElement.scrollHeight-window.innerHeight;progress.style.transform='scaleX('+(range>0?Math.max(0,Math.min(1,window.scrollY/range)):0)+')';scheduled=false}window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateProgress)}},{passive:true});window.addEventListener('resize',updateProgress);updateProgress();
if(window.matchMedia('(hover: hover)').matches){document.querySelectorAll('.skills-grid article').forEach(card=>card.addEventListener('pointermove',event=>{if(motionPreference.matches)return;const rect=card.getBoundingClientRect();card.style.setProperty('--pointer-x',event.clientX-rect.left+'px');card.style.setProperty('--pointer-y',event.clientY-rect.top+'px')}))}

// Disclosure navigation: independent groups, keyboard-native buttons, inert closed panels.
const menuShell=document.querySelector('#navigation-shell');
const mobileMenu=document.querySelector('.mobile-nav-toggle');
const narrowScreen=window.matchMedia('(max-width: 850px)');
const groups=[...document.querySelectorAll('.nav-group')];
function setGroup(group,open){const button=group.querySelector('.nav-disclosure');const panel=group.querySelector('.submenu');button.setAttribute('aria-expanded',String(open));group.classList.toggle('is-open',open);panel.inert=!open;}
groups.forEach((group,index)=>{setGroup(group,false);group.querySelector('button').addEventListener('click',()=>setGroup(group,!group.classList.contains('is-open')))});
function setMobileMenu(open,returnFocus=false){mobileMenu.setAttribute('aria-expanded',String(open));menuShell.classList.toggle('mobile-open',open);menuShell.inert=narrowScreen.matches&&!open;if(returnFocus)mobileMenu.focus();}
setMobileMenu(!narrowScreen.matches);
mobileMenu.addEventListener('click',()=>setMobileMenu(mobileMenu.getAttribute('aria-expanded')!=='true'));
narrowScreen.addEventListener('change',()=>setMobileMenu(!narrowScreen.matches));
menuShell.addEventListener('keydown',event=>{if(event.key==='Escape'&&narrowScreen.matches){setMobileMenu(false,true)}});
const navLinks=[...document.querySelectorAll('nav a')];
function markActive(id){navLinks.forEach(link=>{const active=link.hash==='#'+id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')});groups.forEach(group=>group.classList.toggle('contains-active',!!group.querySelector('a.active')));}
navLinks.forEach(link=>link.addEventListener('click',()=>{markActive(link.hash.slice(1));if(narrowScreen.matches)setMobileMenu(false);const target=document.querySelector(link.hash);if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});target.addEventListener('blur',()=>target.removeAttribute('tabindex'),{once:true})}}));
const sectionTargets=[...new Set(navLinks.map(link=>document.querySelector(link.hash)).filter(Boolean))].sort((a,b)=>a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1);
let navFrame=false;function trackSection(){navFrame=false;let current=sectionTargets[0];const offset=narrowScreen.matches?190:window.innerHeight*.24;for(const target of sectionTargets){if(target.getBoundingClientRect().top<=offset)current=target;}if(current)markActive(current.id);}
window.addEventListener('scroll',()=>{if(!navFrame){navFrame=true;requestAnimationFrame(trackSection)}},{passive:true});
window.addEventListener('resize',trackSection);trackSection();
const initialLink=navLinks.find(link=>link.hash===location.hash);if(initialLink){const group=initialLink.closest('.nav-group');if(group)setGroup(group,true);markActive(location.hash.slice(1));}
document.documentElement.classList.add('navigation-enhanced');

// Gentle portrait parallax, bounded to mouse/pen hover and motion preferences.
const portrait=document.querySelector('.portrait-card');
const portraitHover=window.matchMedia('(hover: hover) and (pointer: fine)');
if(portrait){let portraitFrame=0;let portraitPoint;const resetPortrait=()=>{cancelAnimationFrame(portraitFrame);portraitFrame=0;portrait.classList.remove('portrait-interacting');['--portrait-tilt-x','--portrait-tilt-y','--portrait-px','--portrait-py','--portrait-light-x','--portrait-light-y'].forEach(key=>portrait.style.removeProperty(key));};portrait.addEventListener('pointermove',event=>{if(motionPreference.matches||!portraitHover.matches||event.pointerType==='touch')return;portraitPoint={x:event.clientX,y:event.clientY};if(portraitFrame)return;portraitFrame=requestAnimationFrame(()=>{portraitFrame=0;const rect=portrait.getBoundingClientRect();const x=Math.max(0,Math.min(1,(portraitPoint.x-rect.left)/rect.width));const y=Math.max(0,Math.min(1,(portraitPoint.y-rect.top)/rect.height));portrait.classList.add('portrait-interacting');portrait.style.setProperty('--portrait-tilt-x',(0.5-y)*6+'deg');portrait.style.setProperty('--portrait-tilt-y',(x-0.5)*8+'deg');portrait.style.setProperty('--portrait-px',(x-0.5)*7+'px');portrait.style.setProperty('--portrait-py',(y-0.5)*7+'px');portrait.style.setProperty('--portrait-light-x',x*100+'%');portrait.style.setProperty('--portrait-light-y',y*100+'%');});});portrait.addEventListener('pointerleave',resetPortrait);portrait.addEventListener('pointercancel',resetPortrait);motionPreference.addEventListener('change',resetPortrait);portraitHover.addEventListener('change',resetPortrait);}

// Each project owns its gallery state; rapid clicks keep the newest selection.
document.querySelectorAll('.crm-gallery').forEach(gallery=>{
 const preview=gallery.querySelector('img');const caption=gallery.querySelector('figcaption');const announcement=gallery.querySelector('.crm-announcement');const buttons=[...gallery.querySelectorAll('.crm-view')];let changeId=0;let animation;
 buttons.forEach(button=>button.addEventListener('click',async()=>{
  if(button.getAttribute('aria-pressed')==='true')return;
  const id=++changeId;buttons.forEach(item=>{const selected=item===button;item.classList.toggle('selected',selected);item.setAttribute('aria-pressed',String(selected))});
  const candidate=new Image();candidate.src=button.dataset.image;
  try{await candidate.decode();}catch(error){if(id===changeId){announcement.textContent='This preview could not load. Please select another view.';buttons.forEach(item=>{const selected=item.dataset.image===preview.getAttribute('src');item.classList.toggle('selected',selected);item.setAttribute('aria-pressed',String(selected))});}return;}
  if(id!==changeId)return;animation?.cancel();preview.src=button.dataset.image;preview.alt=button.dataset.alt;caption.textContent=button.dataset.caption;announcement.textContent=button.dataset.caption;
  if(!motionPreference.matches&&preview.animate){animation=preview.animate([{opacity:.25,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:320,easing:'cubic-bezier(.22,1,.36,1)'});}
 }));
});
if(!motionPreference.matches&&revealObserver){document.querySelectorAll('.crm-project').forEach(card=>{card.classList.add('motion-ready');revealObserver.observe(card)});}

const feedbackDialog=document.querySelector('#feedback-dialog');
const feedbackForm=document.querySelector('#feedback-form');
const feedbackStatus=document.querySelector('#feedback-status');
document.querySelector('#open-feedback').addEventListener('click',()=>{feedbackStatus.textContent='';feedbackDialog.showModal();document.querySelector('#feedback-name').focus()});
document.querySelector('#close-feedback').addEventListener('click',()=>feedbackDialog.close());
feedbackDialog.addEventListener('click',event=>{if(event.target===feedbackDialog){const r=feedbackDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)feedbackDialog.close()}});
function feedbackDraft(){return 'Hi Christian,\n\n'+document.querySelector('#feedback-message').value.trim()+'\n\nFrom: '+document.querySelector('#feedback-name').value.trim();}
feedbackForm.addEventListener('submit',event=>{event.preventDefault();if(!feedbackForm.reportValidity())return;const url=new URL('https://mail.google.com/mail/');url.search=new URLSearchParams({view:'cm',fs:'1',to:'christianaring6@gmail.com',su:'Portfolio feedback',body:feedbackDraft()}).toString();window.open(url.href,'_blank','noopener,noreferrer');feedbackStatus.textContent='Gmail was requested in a new tab. Review and send your message there. If no tab opened, use Copy message. Nothing has been sent from this website.';});
document.querySelector('#copy-feedback').addEventListener('click',async()=>{if(!feedbackForm.reportValidity())return;const text='To: christianaring6@gmail.com\nSubject: Portfolio feedback\n\n'+feedbackDraft();try{await navigator.clipboard.writeText(text);feedbackStatus.textContent='Copied the recipient, subject, and message. Paste them into your email app to send.';}catch(error){feedbackStatus.textContent='Clipboard access is unavailable. Select and copy your message below; send it to christianaring6@gmail.com.';document.querySelector('#feedback-message').focus();document.querySelector('#feedback-message').select();}});
