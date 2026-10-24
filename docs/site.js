import {readRelease} from './download.js';
const $ = id => document.getElementById(id);
const audio=$('station-audio'), sound=$('sound-toggle');
audio.volume=.16;
sound.addEventListener('click',async()=>{
  if(!audio.paused){audio.pause();sound.setAttribute('aria-pressed','false');sound.innerHTML='<span aria-hidden="true">♫</span> LISTEN TO THE STATION';return;}
  try{await audio.play();sound.setAttribute('aria-pressed','true');sound.innerHTML='<span aria-hidden="true">Ⅱ</span> SILENCE THE STATION';}
  catch{sound.textContent='AUDIO UNAVAILABLE';}
});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&!audio.paused){audio.pause();sound.setAttribute('aria-pressed','false');sound.innerHTML='<span aria-hidden="true">♫</span> LISTEN TO THE STATION';}});
$('share').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(new URL('./',import.meta.url).href);$('share').textContent='Link copied ✓';$('share-status').textContent='Playtest link copied to clipboard.';setTimeout(()=>{$('share').textContent='Copy playtest link ↗';},4000);}
  catch{$('share-status').textContent='Copy the website address from your browser to share the alpha.';$('share').textContent='Copy the address from your browser';}
});
readRelease(AbortSignal.timeout(15000)).then(release=>{
  const installerUrl=`https://github.com/RyanVerWey/the-hollow-below-alpha/releases/download/v${release.version}/The-Hollow-Below-Alpha-Setup.exe`;
  if(release.installerUrl!==installerUrl || !Number.isSafeInteger(release.installerSize) || release.installerSize<=0) return;
  document.querySelectorAll('[data-installer-download]').forEach(link=>{ link.href=installerUrl; });
  $('release-version').textContent='BUILD '+release.version;
  document.querySelector('.build-number').textContent='/ '+release.version;
  $('download-facts').textContent=`Windows 10 / 11, 64-bit · Full installer: ${(release.installerSize/1000000).toFixed(1)} MB`;
}).catch(()=>{ /* The native launcher handles release availability and offline play. */ });
