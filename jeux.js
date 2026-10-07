(() => {
  'use strict';
  const P = ListeningGames, $ = id => document.getElementById(id);
  const copy = {
    fr: {
      skip:'Aller au contenu', portfolio:'↖ Portfolio', eyebrow:'SoundLab / Ateliers d’écoute', title:'Ateliers d’écoute<span>.</span>',
      intro:'Quatre ateliers pour exercer l’écoute et relier la perception aux propriétés physiques du son.', introNote:'Cinq essais par atelier. Comparez, proposez une réponse et consultez l’explication.',
      frequency:'Fréquence', frequencyCard:'Reconnaître la hauteur d’un son pur.', location:'Localisation', locationCard:'Retrouver la direction d’une source.', locationTag:'02 / Casque stéréo', harmonics:'Harmoniques', harmonicsCard:'Reconstruire un timbre à l’oreille.', harmonicsTag:'03 / Synthèse',
      round:'Essai', score:'Score', best:'Meilleure série', yourGuess:'Votre proposition', answer:'Réponse', listenTarget:'Écouter le son à identifier', listenGuess:'Écouter votre proposition', stop:'Arrêter le son', submit:'Valider la réponse', hint:'Indice (−20 points)', replace:'Son inaudible : changer', change:'Changer de son', result:'Résultat', next:'Manche suivante', restart:'Nouvelle série', volume:'Volume d’écoute', understand:'Comprendre le résultat', rules:'Principe de l’atelier', series:'Bilan de la série',
      method:'Les sons sont générés dans le navigateur, uniquement à votre demande. La réponse apparaît après validation. Les meilleurs scores sont conservés sur cet appareil. Ces ateliers sont des exercices pédagogiques, pas un test d’audition.', sources:'Pour approfondir :', backLab:'↖ Retour au SoundLab', language:'Langue', games:'Ateliers d’écoute', game:'Atelier', physicsTab:'Physique du son', listeningTab:'Ateliers d’écoute', soundlabSections:'Sections SoundLab',
      beats:'Battements',beatsCard:'Retrouver le rythme de deux fréquences proches.',beatsTag:'04 / Superposition',proposalRate:'Cadence proposée',beatsGap:'Écart de cadence',beatsHint:'La cadence se situe entre',beatsStage:'Enveloppe de votre proposition · 2 secondes',
      beatsTask:'Écoutez deux sons purs proches de 220 Hz. Leur superposition produit des variations de niveau. Retrouvez le nombre de battements par seconde en comparant votre proposition.',
      beatsGesture:'Déplacez le repère sur la règle pour régler la cadence, ou utilisez le curseur. Flèches gauche / droite : 0,5 Hz ; Maj : 1 Hz.',
      beatsLearning:'Deux fréquences proches donnent une amplitude qui augmente et diminue régulièrement. La cadence des battements est égale à leur différence : 220 Hz et 224 Hz produisent 4 battements par seconde. Le tracé représente l’enveloppe de niveau, pas la fréquence aiguë des oscillations.',
      beatsRules:'La réponse est une cadence de 1 à 12 Hz. Chaque écoute dure huit secondes, pour laisser le temps de compter. La fréquence de référence reste à 220 Hz ; la seconde fréquence sera dévoilée après validation. Le score dépend de l’écart entre les deux cadences.',
      beatsNote:'Les deux fréquences sont envoyées ensemble aux deux oreilles. Comparez le rythme des fluctuations, avec un volume modéré.',
      proposalFrequency:'Fréquence proposée', proposalAngle:'Direction proposée', fundamental:'Fondamentale H1', amplitude:'Amplitude', isolate:'Écouter seulement H', resetPartials:'Repartir du son pur', left:'Gauche', right:'Droite', centre:'Centre', listener:'Auditeur', logarithmic:'Échelle logarithmique', front:'Sources situées devant vous', synthesis:'Amplitudes relatives à H1',
      listenFirst:'Écoutez d’abord le son à identifier, puis proposez une réponse.', invalid:'Saisissez une fréquence entre 20 et 15 000 Hz.', invalidOther:'Vérifiez les valeurs de votre proposition.', audioError:'L’écoute n’est pas disponible dans ce navigateur.', ready:'Vous pouvez maintenant comparer votre proposition et valider.', changed:'Nouveau son, même manche et même score. Écoutez-le avant de répondre.', hinted:'L’indice est appliqué à cette manche : −20 points.', exact:'Correspondance exacte', hintPenalty:'L’indice retire 20 points à cette manche.', points:'points',
      frequencyTask:'Écoutez un son pur tiré au hasard entre 20 et 15 000 Hz. Trouvez sa fréquence en comparant votre proposition au son original.',
      frequencyGesture:'Déplacez le repère bleu sur la règle, ou utilisez le curseur et la saisie en Hz. Sur la règle : flèches gauche / droite, Maj pour un pas plus grand.',
      frequencyLearning:'La fréquence correspond au nombre d’oscillations par seconde. Le jugement porte sur la hauteur du son : doubler la fréquence monte d’une octave. La règle est logarithmique, pour donner le même espace aux mêmes rapports de fréquence.',
      frequencyRules:'Le score dépend de l’écart de hauteur : 100 cents correspondent à un demi-ton, 1 200 cents à une octave. Une octave d’écart vaut environ 14 points. Un son inaudible peut être remplacé sans perdre une manche ; ne montez pas le volume pour tenter de l’entendre.',
      frequencyNote:'Commencez à faible volume. Aux extrémités de la plage, l’audibilité dépend de l’écoute et du matériel.',
      locationTask:'Au casque stéréo, écoutez une source située devant vous. Placez le repère bleu dans la direction d’où vous percevez le son, puis comparez.',
      locationGesture:'Déplacez le repère sur l’arc. 0° correspond au centre ; un angle négatif est à gauche. Flèches gauche / droite : 1°, ou 5° avec Maj.',
      locationLearning:'La localisation repose notamment sur les différences de temps d’arrivée et de niveau entre les oreilles, ainsi que sur le filtrage par la tête. Ici, un modèle HRTF simule une source sur un arc frontal, à distance constante.',
      locationRules:'Le score dépend de l’écart angulaire : 100 points pour la direction exacte, environ 37 pour un écart de 25°. Le même bruit filtré sert aux deux écoutes. Ce modèle de tête générique ne correspond pas exactement à chaque personne.',
      locationNote:'Casque stéréo recommandé, avec les côtés gauche et droit respectés. Sur des haut-parleurs, la comparaison des directions devient moins fiable.',
      harmonicsTask:'La fréquence fondamentale est connue. Écoutez le timbre à reproduire, puis réglez H2 à H6 pour reconstruire sa composition. Chaque harmonique peut être écoutée séparément.',
      harmonicsGesture:'Faites glisser les barres bleues verticalement. La barre H1 est fixe. Au clavier : gauche / droite pour choisir H2 à H6, haut / bas pour régler son amplitude.',
      harmonicsLearning:'Une harmonique est un multiple entier de la fréquence fondamentale : H2 = 2 × f, H3 = 3 × f. Leurs amplitudes changent le timbre tout en gardant la même fondamentale. La courbe représente la somme de ces composantes.',
      harmonicsRules:'Le score compare les cinq amplitudes à retrouver, avec une pénalité progressive selon leur écart. Les deux synthèses ont la même énergie moyenne avant réglage du volume ; cela ne garantit pas une sensation de volume identique. La phase est fixe dans cet exercice.',
      harmonicsNote:'Comparez le son complet et votre synthèse. Les boutons H2 à H6 permettent d’écouter chaque composante seule, à un niveau fixe.',
      frequencyHint:'La fréquence se situe entre', locationHint:'La source est du côté :', harmonicsHint:'L’harmonique la plus présente après H1 est', actual:'Son original', submitted:'Proposition', pitchGap:'Écart de hauteur', angleGap:'Écart angulaire', amplitudeGap:'Écart moyen des amplitudes', amplitudeUnit:'points de pourcentage', inspect:'Comparez les repères bleus et orange, puis réécoutez les deux sons.', stronger:'à augmenter de', weaker:'à réduire de', selected:'Sélection', percentUnit:'%',
    },
    en: {
      skip:'Skip to content', portfolio:'↖ Portfolio', eyebrow:'SoundLab / Listening workshops', title:'Listening workshops<span>.</span>',
      intro:'Four workshops to train listening and connect perception with the physical properties of sound.', introNote:'Five attempts per workshop. Compare, submit an answer and read the explanation.',
      frequency:'Frequency', frequencyCard:'Identify the pitch of a pure tone.', location:'Localization', locationCard:'Find the direction of a sound source.', locationTag:'02 / Stereo headphones', harmonics:'Harmonics', harmonicsCard:'Rebuild a timbre by ear.', harmonicsTag:'03 / Synthesis',
      round:'Attempt', score:'Score', best:'Best series', yourGuess:'Your proposal', answer:'Answer', listenTarget:'Listen to the target sound', listenGuess:'Listen to your proposal', stop:'Stop audio', submit:'Submit answer', hint:'Hint (−20 points)', replace:'Inaudible tone: replace', change:'Change sound', result:'Result', next:'Next round', restart:'New series', volume:'Listening volume', understand:'Understanding the result', rules:'Workshop guide', series:'Series recap',
      method:'Sounds are generated in the browser, only on request. The answer appears after submission. Best scores are stored on this device. These workshops are educational exercises, not a hearing test.', sources:'Explore further:', backLab:'↖ Back to SoundLab', language:'Language', games:'Listening workshops', game:'Workshop', physicsTab:'Sound physics', listeningTab:'Listening workshops', soundlabSections:'SoundLab sections',
      beats:'Beats',beatsCard:'Identify the rhythm of two nearby frequencies.',beatsTag:'04 / Superposition',proposalRate:'Proposed beat rate',beatsGap:'Beat rate difference',beatsHint:'The beat rate is between',beatsStage:'Your proposed amplitude envelope · 2 seconds',
      beatsTask:'Listen to two pure tones close to 220 Hz. Their superposition produces level fluctuations. Find the number of beats per second by comparing your proposal.',
      beatsGesture:'Move the marker along the ruler to adjust the rate, or use the slider. Left / right arrows: 0.5 Hz; Shift: 1 Hz.',
      beatsLearning:'Two nearby frequencies produce an amplitude that regularly rises and falls. The beat rate equals their difference: 220 Hz and 224 Hz produce 4 beats per second. The plot shows the level envelope, not the rapid oscillations of the sound itself.',
      beatsRules:'The answer is a rate between 1 and 12 Hz. Each playback lasts eight seconds, giving time to count. The reference frequency stays at 220 Hz; the second frequency is revealed after submission. The score follows the difference between the two beat rates.',
      beatsNote:'Both frequencies are sent together to both ears. Compare the rhythm of the fluctuations at a moderate volume.',
      proposalFrequency:'Proposed frequency', proposalAngle:'Proposed direction', fundamental:'Fundamental H1', amplitude:'Amplitude', isolate:'Listen to H', resetPartials:'Start with a pure tone', left:'Left', right:'Right', centre:'Centre', listener:'Listener', logarithmic:'Logarithmic scale', front:'Sources positioned in front of you', synthesis:'Amplitudes relative to H1',
      listenFirst:'Listen to the target sound before submitting an answer.', invalid:'Enter a frequency between 20 and 15,000 Hz.', invalidOther:'Check the values of your proposal.', audioError:'Audio playback is unavailable in this browser.', ready:'You can now compare your proposal and submit an answer.', changed:'New sound, same round and score. Listen before answering.', hinted:'The hint applies to this round: −20 points.', exact:'Exact match', hintPenalty:'The hint subtracts 20 points from this round.', points:'points',
      frequencyTask:'Listen to a random pure tone between 20 and 15,000 Hz. Find its frequency by comparing your proposal with the original sound.',
      frequencyGesture:'Move the blue marker along the ruler, or use the slider and the input in Hz. On the ruler: left / right arrows, Shift for a larger step.',
      frequencyLearning:'Frequency is the number of oscillations per second. The game compares pitch: doubling the frequency raises it by an octave. A logarithmic ruler gives equal space to equal frequency ratios.',
      frequencyRules:'The score follows the pitch difference: 100 cents equal one semitone, 1,200 cents one octave. An octave of error scores around 14 points. You may replace an inaudible tone without losing a round; do not turn up the volume to try to hear it.',
      frequencyNote:'Start at a low volume. Near the ends of the range, audibility depends on hearing and equipment.',
      locationTask:'With stereo headphones, listen to a source positioned in front of you. Place the blue marker in the direction you hear, then compare.',
      locationGesture:'Move the marker along the arc. 0° is straight ahead; negative angles are to the left. Left / right arrows: 1°, or 5° with Shift.',
      locationLearning:'Localization relies in part on differences in arrival time and level between the ears, and filtering by the head. Here, an HRTF model simulates a source on a frontal arc at a constant distance.',
      locationRules:'The score follows angular error: 100 points for the exact direction, around 37 for an error of 25°. Both comparisons use the same filtered noise. This generic head model does not match every listener exactly.',
      locationNote:'Stereo headphones recommended, with left and right sides correctly placed. Loudspeakers make direction comparisons less reliable.',
      harmonicsTask:'The fundamental frequency is given. Listen to the target timbre, then adjust H2 to H6 to rebuild its composition. Each harmonic can also be heard separately.',
      harmonicsGesture:'Drag the blue bars vertically. H1 is fixed. Keyboard: left / right to select H2 to H6, up / down to adjust its amplitude.',
      harmonicsLearning:'A harmonic is an integer multiple of the fundamental: H2 = 2 × f, H3 = 3 × f. Their amplitudes change the timbre while keeping the same fundamental. The curve shows the sum of these components.',
      harmonicsRules:'The score compares the five unknown amplitudes, with a progressive penalty for error. Both syntheses have the same average energy before the volume control; this does not guarantee identical perceived loudness. Phase is fixed in this exercise.',
      harmonicsNote:'Compare the full sound with your synthesis. The H2 to H6 buttons let you hear each component alone at a fixed level.',
      frequencyHint:'The frequency is between', locationHint:'The source is on this side:', harmonicsHint:'The strongest harmonic after H1 is', actual:'Original sound', submitted:'Proposal', pitchGap:'Pitch difference', angleGap:'Angular error', amplitudeGap:'Mean amplitude error', amplitudeUnit:'percentage points', inspect:'Compare the blue and orange markers, then listen to both sounds again.', stronger:'increase by', weaker:'decrease by', selected:'Selected', percentUnit:'%',
    },
  };
  let language='fr', active='frequency', selectedHarmonic=1, width=1, height=1, dragging=false, frame=0;
  const sessions={}, guesses={}, best={};
  try {const saved=localStorage.getItem('colin-portfolio-language');language=saved==='en'?'en':'fr';const stored=JSON.parse(localStorage.getItem('colin-listening-games-best')||'{}');for(const key of ['frequency','location','harmonics','beats'])if(Number.isInteger(stored?.[key])&&stored[key]>=0&&stored[key]<=500)best[key]=stored[key];}catch{}
  const t=key=>copy[language][key], number=value=>new Intl.NumberFormat(language==='fr'?'fr-FR':'en-GB',{maximumFractionDigits:1}).format(value);
  const session=()=>sessions[active], guess=()=>guesses[active], revealed=()=>session().phase!=='guess';
  function defaults(type){return type==='frequency'?{frequency:440}:type==='location'?{angle:0}:type==='beats'?{rate:4}:{amplitudes:[1,0,0,0,0,0]};}
  function ensure(type){if(!sessions[type]){sessions[type]=new P.Session(type);guesses[type]=defaults(type);}}
  const audio=new ListeningAudio(label=>{
    $('play-target').setAttribute('aria-pressed',String(label==='target'));$('play-guess').setAttribute('aria-pressed',String(label==='guess'));
    document.querySelectorAll('[data-partial]').forEach(button=>button.setAttribute('aria-pressed',String(label===`partial-${button.dataset.partial}`)));
    const indicator=$('playback-indicator');indicator.parentElement.classList.remove('playing');indicator.style.transition='none';indicator.style.width='0';
    if(label){void indicator.offsetWidth;indicator.style.transitionDuration=active==='beats'?'8s':'1.7s';indicator.style.removeProperty('width');indicator.parentElement.classList.add('playing');}
  });
  function hintText(){const h=P.hint(active,session().target);return active==='frequency'||active==='beats'?`${t(active==='beats'?'beatsHint':'frequencyHint')} ${number(h[0])} ${language==='fr'?'et':'and'} ${number(h[1])} Hz.`:active==='location'?`${t('locationHint')} ${t(h).toLowerCase()}.`:`${t('harmonicsHint')} H${h}.`;}
  function controls(){
    if(active==='frequency')$('guess-controls').innerHTML=`<div class="guess-input"><label for="frequency-number">${t('proposalFrequency')}</label><div class="number-wrap"><input id="frequency-number" type="number" min="20" max="15000" step="1" inputmode="numeric" value="${guess().frequency}"><span>Hz</span></div><input id="frequency-slider" type="range" min="0" max="1000" step="1" value="${Math.round(P.frequencyPosition(guess().frequency)*1000)}" aria-label="${t('proposalFrequency')}"><div class="range-ends"><span>20 Hz</span><span>15 000 Hz</span></div></div>`;
    else if(active==='location')$('guess-controls').innerHTML=`<div class="guess-input"><label for="angle-slider">${t('proposalAngle')}<output id="angle-value" for="angle-slider">${guess().angle}°</output></label><input id="angle-slider" type="range" min="-75" max="75" step="1" value="${guess().angle}"><div class="range-ends"><span>−75° · ${t('left')}</span><span>+75° · ${t('right')}</span></div></div>`;
    else if(active==='beats')$('guess-controls').innerHTML=`<p class="fundamental-label">${t('fundamental')}<strong>220 Hz</strong></p><div class="guess-input"><label for="beats-slider">${t('proposalRate')}<output id="beats-value" for="beats-slider">${number(guess().rate)} Hz</output></label><input id="beats-slider" type="range" min="1" max="12" step="0.5" value="${guess().rate}"><div class="range-ends"><span>1 Hz</span><span>12 Hz</span></div></div>`;
    else $('guess-controls').innerHTML=`<p class="fundamental-label">${t('fundamental')}<strong>${session().target.fundamental} Hz</strong></p>`+[1,2,3,4,5].map(i=>`<div class="guess-input harmonic-control"><label for="harmonic-${i}"><span class="partial-name"><span>H${i+1}<small> ${session().target.fundamental*(i+1)} Hz</small></span><button type="button" class="partial-button" data-partial="${i}" aria-label="${t('isolate')}${i+1}" aria-pressed="false"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2l9 6-9 6z"/></svg></button></span><output id="harmonic-value-${i}" for="harmonic-${i}">${Math.round(guess().amplitudes[i]*100)} %</output></label><input id="harmonic-${i}" type="range" min="0" max="100" step="5" value="${guess().amplitudes[i]*100}" aria-label="H${i+1} · ${t('amplitude')}"></div>`).join('')+`<button type="button" class="text-button partial-reset" id="reset-partials">${t('resetPartials')}</button>`;
    $('guess-controls').querySelectorAll('input').forEach(input=>input.disabled=revealed());
    $('reset-partials')?.toggleAttribute('disabled',revealed());
  }
  function updateInputs(){
    if(active==='frequency') {if(document.activeElement!==$('frequency-number'))$('frequency-number').value=guess().frequency;if(P.valid(active,guess()))$('frequency-slider').value=Math.round(P.frequencyPosition(guess().frequency)*1000);}
    if(active==='location'){$('angle-slider').value=guess().angle;$('angle-value').textContent=`${guess().angle}°`;}
    if(active==='beats'){$('beats-slider').value=guess().rate;$('beats-value').textContent=`${number(guess().rate)} Hz`;}
    if(active==='harmonics')for(let i=1;i<6;i++){$(`harmonic-${i}`).value=Math.round(guess().amplitudes[i]*100);$(`harmonic-value-${i}`).textContent=`${Math.round(guess().amplitudes[i]*100)} %`;}
    $('play-guess').disabled=!P.valid(active,guess());queueDraw();
  }
  function recordDescription(record){
    if(active==='frequency')return `${t('actual')} : ${number(record.target.frequency)} Hz · ${t('submitted')} : ${number(record.guess.frequency)} Hz.`;
    if(active==='location')return `${t('actual')} : ${record.target.angle}° · ${t('submitted')} : ${record.guess.angle}°.`;
    if(active==='beats')return `${t('actual')} : ${record.target.rate} Hz (220 Hz / ${220+record.target.rate} Hz) · ${t('submitted')} : ${number(record.guess.rate)} Hz.`;
    return `H2–H6 : ${record.target.amplitudes.slice(1).map(v=>Math.round(v*100)+' %').join(' / ')}.`;
  }
  function renderResult(){
    const s=session(),record=s.records.at(-1);$('result').hidden=!revealed();$('series').hidden=s.phase!=='complete';
    if(!revealed())return;
    const gap=active==='frequency'?`${number(Math.abs(record.error))} cents`:active==='location'?`${number(Math.abs(record.error))}°`:active==='beats'?`${number(Math.abs(record.error))} Hz`:`${number(record.error*100)} ${t('amplitudeUnit')}`;
    $('result-title').textContent=Math.abs(record.error)<1e-9?t('exact'):`${t(active==='frequency'?'pitchGap':active==='location'?'angleGap':active==='beats'?'beatsGap':'amplitudeGap')} : ${gap}`;
    let explanation=recordDescription(record)+' '+t('inspect');
    if(active==='harmonics'){
      const differences=record.target.amplitudes.slice(1).map((v,i)=>({i:i+2,d:v-record.guess.amplitudes[i+1]})).filter(item=>Math.abs(item.d)>.025).sort((a,b)=>Math.abs(b.d)-Math.abs(a.d)).slice(0,2);
      if(differences.length)explanation+=` ${differences.map(item=>`H${item.i} : ${t(item.d>0?'stronger':'weaker')} ${number(Math.abs(item.d)*100)} ${t('amplitudeUnit')}`).join(' ; ')}.`;
    }
    if(record.hinted)explanation+=' '+t('hintPenalty');
    $('result-copy').textContent=explanation;$('round-score').textContent=`${record.score} / 100`;$('next').textContent=t(s.phase==='complete'?'restart':'next');
    if(s.phase==='complete'){$('series-total').textContent=`${s.total} / 500`;$('series-list').innerHTML=s.records.map((r,i)=>`<li>${t('round')} ${i+1}<strong>${r.score} / 100</strong><p>${recordDescription(r)}${r.hinted?' '+t('hintPenalty'):''}</p></li>`).join('');}
  }
  function render(){
    document.documentElement.lang=language;document.title=`SoundLab · ${language==='fr'?'Ateliers d’écoute':'Listening workshops'} — Colin Montanari`;
    document.querySelectorAll('[data-copy]').forEach(el=>el.innerHTML=t(el.dataset.copy));
    document.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===language)));
    document.querySelector('.language-switch').setAttribute('aria-label',t('language'));document.querySelector('.game-menu').setAttribute('aria-label',t('games'));
    document.querySelectorAll('[data-game]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.game===active)));
    $('game-number').textContent=`${t('game')} 0${['frequency','location','harmonics','beats'].indexOf(active)+1} / 04`;
    $('game-title').textContent=t(active);$('task').textContent=t(active+'Task');$('gesture-instructions').textContent=t(active+'Gesture');$('game-canvas').setAttribute('aria-label',t(active)+' · '+t('yourGuess'));
    $('learning').textContent=t(active+'Learning');$('rules').textContent=t(active+'Rules');$('listening-note').textContent=t(active+'Note');
    $('stage-note').textContent=t(active==='frequency'?'logarithmic':active==='location'?'front':active==='beats'?'beatsStage':'synthesis');
    $('target-key').hidden=!revealed();$('replace').textContent=t(active==='frequency'?'replace':'change');$('replace').disabled=revealed();$('hint').disabled=revealed()||session().hinted;$('submit').disabled=revealed();
    $('hint-text').hidden=!session().hinted;$('hint-text').textContent=session().hinted?hintText():'';
    $('round-value').textContent=`${Math.min(5,session().records.length+(revealed()?0:1))} / 5`;$('score-value').textContent=`${session().total} / 500`;$('best-value').textContent=best[active]===undefined?'—':`${best[active]} / 500`;
    $('message').textContent='';controls();updateInputs();renderResult();
  }
  async function listen(kind,partial){
    const type=active,s=sessions[type],target=kind==='target',data=target?s.target:guess();let spec;
    if(partial!==undefined)spec={type:'frequency',frequency:s.target.fundamental*(partial+1)};
    else if(type==='frequency')spec={type,frequency:data.frequency};
    else if(type==='location')spec={type,angle:data.angle,seed:s.target.seed};
    else if(type==='beats')spec={type,fundamental:220,rate:data.rate};
    else spec={type,fundamental:s.target.fundamental,amplitudes:data.amplitudes};
    if(kind==='guess'&&!P.valid(type,guess()))return;
    try {const played=await audio.play(spec,partial===undefined?kind:`partial-${partial}`);if(played&&target){s.heard=true;if(active===type&&!revealed())$('message').textContent=t('ready');}}
    catch{$('message').textContent=t('audioError');}
  }
  function selectWorkshop(type){audio.stop();active=type;ensure(active);selectedHarmonic=1;render();}
  document.querySelectorAll('[data-game]').forEach(button=>button.addEventListener('click',()=>{selectWorkshop(button.dataset.game);history.replaceState(null,'','#'+active);}));
  window.addEventListener('hashchange',()=>{const type=location.hash.slice(1);if(['frequency','location','harmonics','beats'].includes(type))selectWorkshop(type);});
  document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>{audio.stop();language=button.dataset.language;try{localStorage.setItem('colin-portfolio-language',language);}catch{}render();}));
  $('play-target').addEventListener('click',()=>listen('target'));$('play-guess').addEventListener('click',()=>listen('guess'));$('stop').addEventListener('click',()=>audio.stop());
  $('guess-controls').addEventListener('input',event=>{
    if(revealed())return;const input=event.target;
    if(input.id==='frequency-number')guess().frequency=input.valueAsNumber;
    else if(input.id==='frequency-slider')guess().frequency=P.frequencyAt(input.valueAsNumber/1000);
    else if(input.id==='angle-slider')guess().angle=input.valueAsNumber;
    else if(input.id==='beats-slider')guess().rate=input.valueAsNumber;
    else if(input.id.startsWith('harmonic-')){selectedHarmonic=Number(input.id.split('-')[1]);guess().amplitudes[selectedHarmonic]=input.valueAsNumber/100;}
    updateInputs();
  });
  $('guess-controls').addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;if(button.dataset.partial)listen('partial',Number(button.dataset.partial));else if(button.id==='reset-partials'&&!revealed()){guess().amplitudes=[1,0,0,0,0,0];updateInputs();}});
  $('submit').addEventListener('click',()=>{
    const s=session(),response=s.submit(guess());
    if(!response.ok){$('message').textContent=t(response.reason==='listenFirst'?'listenFirst':active==='frequency'?'invalid':'invalidOther');return;}
    audio.stop();
    if(s.phase==='complete'){best[active]=Math.max(best[active]||0,s.total);try{localStorage.setItem('colin-listening-games-best',JSON.stringify(best));}catch{}}
    render();$('message').textContent=`${t('result')} : ${response.record.score} ${t('points')}.`;
  });
  $('next').addEventListener('click',()=>{audio.stop();if(session().phase==='complete')sessions[active]=new P.Session(active);else session().next();guesses[active]=defaults(active);render();});
  $('replace').addEventListener('click',()=>{if(!session().replace())return;audio.stop();guesses[active]=defaults(active);render();$('message').textContent=t('changed');});
  $('hint').addEventListener('click',()=>{if(revealed()||session().hinted)return;session().hinted=true;$('hint').disabled=true;$('hint-text').hidden=false;$('hint-text').textContent=hintText();$('message').textContent=t('hinted');});
  $('volume').addEventListener('input',()=>{audio.setVolume($('volume').valueAsNumber);$('volume-value').textContent=`${$('volume').value} %`;});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)audio.stop();});window.addEventListener('pagehide',()=>audio.stop());document.addEventListener('keydown',event=>{if(event.key==='Escape')audio.stop();});
  const canvas=$('game-canvas'),ctx=canvas.getContext('2d'),blue='#7b9aff',amber='#efb87a',muted='#8d97ab',line='#283247';
  function queueDraw(){if(!frame)frame=requestAnimationFrame(()=>{frame=0;draw();});}
  function resize(){const rect=canvas.getBoundingClientRect(),ratio=Math.min(2,window.devicePixelRatio||1);width=rect.width;height=rect.height;canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);queueDraw();}
  function text(value,x,y,color=muted,size=12,align='center'){ctx.fillStyle=color;ctx.font=`${size}px Consolas,monospace`;ctx.textAlign=align;ctx.fillText(value,x,y);}
  function path(points,color=line,lineWidth=1){ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.strokeStyle=color;ctx.lineWidth=lineWidth;ctx.stroke();}
  function dot(x,y,color,r=7){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();}
  const frequencyX=f=>30+P.frequencyPosition(f)*(width-60);
  const arcGeometry=()=>({cx:width/2,cy:height-49,r:Math.min(width*.44,height-80)});
  function arcPoint(angle){const a=arcGeometry(),theta=angle*Math.PI/180;return{x:a.cx+a.r*Math.sin(theta),y:a.cy-a.r*Math.cos(theta)};}
  const bars=()=>({left:24,right:width-24,top:40,bottom:height*.60,step:(width-48)/6});
  function drawFrequency(){
    const y=height*.60;path([[30,y],[width-30,y]],line,2);
    const ticks=width<400?[20,100,1000,15000]:[20,50,100,500,1000,5000,15000];
    for(const f of ticks){const x=frequencyX(f);path([[x,65],[x,y+9]],line);text(f>=1000?`${f/1000}k`:String(f),x,y+31);}
    const drawMarker=(f,color,offset)=>{const x=frequencyX(f);path([[x,79+offset],[x,y]],color,2);dot(x,y,color);text(`${number(f)} Hz`,x,height*.28+offset,color,15,x<80?'left':x>width-80?'right':'center');};
    if(revealed())drawMarker(session().target.frequency,amber,-26);
    if(P.valid(active,guess()))drawMarker(guess().frequency,blue,20);
    text(t('logarithmic'),width/2,height-23,muted,11);
  }
  function drawLocation(){
    const a=arcGeometry();ctx.beginPath();ctx.arc(a.cx,a.cy,a.r,-165*Math.PI/180,-15*Math.PI/180);ctx.strokeStyle=line;ctx.lineWidth=2;ctx.stroke();
    for(const angle of [-75,-45,0,45,75]){const p=arcPoint(angle);path([[a.cx,a.cy],[p.x,p.y]],line);text(`${angle}°`,p.x,p.y-16,muted,11);}
    const marker=(angle,color,offset)=>{const p=arcPoint(angle);path([[a.cx,a.cy],[p.x,p.y]],color,2);dot(p.x,p.y,color,8);text(`${angle}°`,p.x,p.y+offset,color,15);};
    if(revealed())marker(session().target.angle,amber,-30);marker(guess().angle,blue,29);
    dot(a.cx,a.cy,'#e6ebf5',9);path([[a.cx-15,a.cy+1],[a.cx-15,a.cy-13],[a.cx+15,a.cy-13],[a.cx+15,a.cy+1]],muted,2);
    text(t('listener'),a.cx,height-13,muted,11);text(t('left'),25,a.cy,muted,11,'left');text(t('right'),width-25,a.cy,muted,11,'right');
  }
  function drawHarmonics(){
    const b=bars(),unit=b.bottom-b.top;path([[b.left,b.bottom],[b.right,b.bottom]],line);
    for(let i=0;i<6;i++){
      const x=b.left+b.step*(i+.5),bw=Math.min(38,b.step*.48),v=guess().amplitudes[i];
      ctx.fillStyle=i===0?'#44516b':blue;ctx.fillRect(x-bw/2,b.bottom-v*unit,bw,v*unit);
      if(revealed()){ctx.strokeStyle=amber;ctx.lineWidth=2;ctx.strokeRect(x-bw/2-3,b.bottom-session().target.amplitudes[i]*unit,bw+6,Math.max(1,session().target.amplitudes[i]*unit));}
      if(!revealed()&&i===selectedHarmonic){ctx.strokeStyle='#e3e9ff';ctx.lineWidth=1;ctx.strokeRect(x-bw/2-4,b.top-9,bw+8,unit+18);}
      text(`${Math.round(v*100)}%`,x,b.top-19,i===0?muted:blue,11);text(`H${i+1}`,x,b.bottom+25,i===selectedHarmonic?blue:muted,12);
    }
    const cy=height*.85,amp=height*.085;path([[24,cy],[width-24,cy]],line);
    const wave=(values,color)=>{const norm=P.normalizeHarmonics(values),points=[];for(let i=0;i<=200;i++){const phase=i/200*Math.PI*4,sum=norm.reduce((v,k,n)=>v+k*Math.sin((n+1)*phase),0);points.push([24+i/200*(width-48),cy-sum*amp]);}path(points,color,1.5);};
    if(revealed())wave(session().target.amplitudes,amber);wave(guess().amplitudes,blue);
  }
  function drawBeats(){
    const left=30,right=width-30,ruler=height*.78,top=44,bottom=height*.56;
    for(const time of [0,.5,1,1.5,2]){const x=left+time/2*(right-left);path([[x,top],[x,bottom]],line);text(`${time}s`,x,bottom+20,muted,11);}
    const envelope=(rate,color)=>{const points=[];for(let i=0;i<=400;i++){const time=i/400*2;points.push([left+i/400*(right-left),bottom-Math.abs(Math.cos(Math.PI*rate*time))*(bottom-top)]);}path(points,color,1.6);};
    if(revealed())envelope(session().target.rate,amber);envelope(guess().rate,blue);
    path([[left,ruler],[right,ruler]],line,2);for(const rate of [1,4,8,12]){const x=left+(rate-1)/11*(right-left);path([[x,ruler-5],[x,ruler+5]],muted);text(`${rate} Hz`,x,ruler+25,muted,11);}
    const marker=(rate,color,offset)=>{const x=left+(rate-1)/11*(right-left);dot(x,ruler,color);text(`${number(rate)} Hz`,x,ruler-15+offset,color,13);};
    if(revealed())marker(session().target.rate,amber,-19);marker(guess().rate,blue,0);
  }
  function draw(){ctx.clearRect(0,0,width,height);if(active==='frequency')drawFrequency();else if(active==='location')drawLocation();else if(active==='beats')drawBeats();else drawHarmonics();}
  function pointer(event){
    const rect=canvas.getBoundingClientRect(),x=event.clientX-rect.left,y=event.clientY-rect.top;
    if(active==='frequency')guess().frequency=P.frequencyAt(P.clamp((x-30)/(width-60),0,1));
    else if(active==='location'){const a=arcGeometry();guess().angle=Math.round(P.clamp(Math.atan2(x-a.cx,a.cy-y)*180/Math.PI,-75,75));}
    else if(active==='beats')guess().rate=Math.round((1+P.clamp((x-30)/(width-60),0,1)*11)*2)/2;
    else {const b=bars();selectedHarmonic=P.clamp(Math.floor((x-b.left)/b.step),1,5);guess().amplitudes[selectedHarmonic]=Math.round(P.clamp((b.bottom-y)/(b.bottom-b.top),0,1)*20)/20;}
    updateInputs();
  }
  canvas.addEventListener('pointerdown',event=>{if(revealed()||event.button!==0)return;event.preventDefault();canvas.focus({preventScroll:true});dragging=true;canvas.setPointerCapture(event.pointerId);canvas.classList.add('is-dragging');pointer(event);});
  canvas.addEventListener('pointermove',event=>{if(dragging&&!revealed())pointer(event);});
  const endDrag=()=>{dragging=false;canvas.classList.remove('is-dragging');};canvas.addEventListener('pointerup',endDrag);canvas.addEventListener('pointercancel',endDrag);canvas.addEventListener('lostpointercapture',endDrag);
  canvas.addEventListener('keydown',event=>{
    if(revealed()||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key))return;event.preventDefault();const sign=event.key==='ArrowRight'||event.key==='ArrowUp'?1:-1;
    if(active==='frequency'){const value=P.valid(active,guess())?guess().frequency:440;guess().frequency=event.key==='Home'?20:event.key==='End'?15000:Math.round(P.clamp(value*2**(sign*(event.shiftKey?1:1/12)),20,15000));}
    else if(active==='location')guess().angle=event.key==='Home'?-75:event.key==='End'?75:P.clamp(guess().angle+sign*(event.shiftKey?5:1),-75,75);
    else if(active==='beats')guess().rate=event.key==='Home'?1:event.key==='End'?12:P.clamp(guess().rate+sign*(event.shiftKey?1:.5),1,12);
    else {if(event.key==='ArrowLeft'||event.key==='ArrowRight')selectedHarmonic=P.clamp(selectedHarmonic+sign,1,5);else guess().amplitudes[selectedHarmonic]=event.key==='Home'?0:event.key==='End'?1:Math.round(P.clamp(guess().amplitudes[selectedHarmonic]+sign*(event.shiftKey?.25:.05),0,1)*20)/20;}
    updateInputs();
  });
  const initial=location.hash.slice(1);if(['frequency','location','harmonics','beats'].includes(initial))active=initial;
  ensure(active);render();new ResizeObserver(resize).observe(canvas);resize();
})();
