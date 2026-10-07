(() => {
  'use strict';
  const P = SoundLabPhysics;
  const $ = id => document.getElementById(id);
  const copy = {
    fr: {
      skip:'Aller au contenu', back:'↖ Retour au portfolio', physicsTab:'Physique du son', listeningTab:'Ateliers d’écoute', listeningIntro:'Comparez les sons et proposez une réponse. Chaque essai permet de relier votre écoute à un phénomène.', locationWorkshop:'Localisation', harmonicsWorkshop:'Harmoniques', beatsWorkshop:'Battements', frequencyExercise:'Reconnaître une fréquence entre 20 et 15 000 Hz.', locationExercise:'Retrouver la direction d’une source au casque.', harmonicsExercise:'Reconstruire un timbre en réglant ses harmoniques.', beatsExercise:'Retrouver la cadence de deux fréquences proches.', eyebrow:'Colin Montanari / Explorer le son',
      intro:'Ateliers interactifs sur la fréquence, l’amplitude et la propagation du son dans l’air.', introNote:'Sélectionnez un phénomène et manipulez les repères dans la visualisation.',
      frequency:'Fréquence', amplitude:'Amplitude', interference:'Interférences', reflection:'Réflexion', diffraction:'Diffraction',
      pause:'Mettre en pause', resume:'Reprendre', reset:'Réinitialiser', listen:'Écouter le son', stop:'Couper le son', audioNote:'Son pur, fréquence réelle. Niveau d’écoute modéré.', audioError:'L’écoute n’est pas disponible dans ce navigateur.',
      observe:'Observations', try:'Expérience', sources:'Pour approfondir les phénomènes :',
      amplitudeB:'Amplitude B / A', interaction:'Manipulation', source:'Source', sensor:'Capteur', probePressure:'Pression locale', probeX:'Capteur · X', probeY:'Capteur · Y', probeNote:'Valeurs relatives du modèle. Le tracé suit la pression au capteur.', probeTrace:'Historique de la pression au capteur', interferenceAudio:'Somme des deux ondes à 250 Hz. Niveau d’écoute modéré.',
      method:'Modèles pédagogiques : animations ralenties, déplacements des particules amplifiés. Air homogène à environ 20 °C, vitesse du son ≈ 343 m/s. Les courbes montrent des variations de pression ; l’air oscille sur place.',
      workshops:'Ateliers SoundLab', language:'Langue', about:'À propos des expériences', workshop:'Atelier', slow:'Animation ralentie', particles:'Particules d’air', pressure:'Pression', distance:'Position (m)', time:'Temps (ms)', relative:'Pression relative', ref:'Référence', sum:'Somme', incident:'Incident', reflected:'Réfléchi', wall:'Mur', normal:'Normale', compression:'Compression', rarefaction:'Raréfaction', wavelength:'Longueur d’onde', period:'Période', intensity:'Intensité relative', level:'Écart / référence', resultant:'Amplitude résultante', angleOut:'Angle réfléchi', energy:'Intensité réfléchie', ratio:'Ouverture / λ', aperture:'Ouverture', percent:'Amplitude', phase:'Déphasage', angle:'Angle d’incidence', coefficient:'Réflexion (pression)', spread:'Dispersion', wide:'Plus directionnelle', broad:'Plus étalée', same:'Même fréquence', ideal:'Mur plan · modèle par rayons', field:'Champ de pression 2D · ralenti',
    },
    en: {
      skip:'Skip to content', back:'↖ Back to portfolio', physicsTab:'Sound physics', listeningTab:'Listening workshops', listeningIntro:'Compare sounds and propose an answer. Each attempt connects listening with a physical phenomenon.', locationWorkshop:'Localization', harmonicsWorkshop:'Harmonics', beatsWorkshop:'Beats', frequencyExercise:'Identify a frequency between 20 and 15,000 Hz.', locationExercise:'Locate a sound source with headphones.', harmonicsExercise:'Rebuild a timbre by adjusting its harmonics.', beatsExercise:'Find the beat rate of two nearby frequencies.', eyebrow:'Colin Montanari / Explore sound',
      intro:'Interactive workshops on frequency, amplitude and sound propagation in air.', introNote:'Select a phenomenon and manipulate the markers in the visualization.',
      frequency:'Frequency', amplitude:'Amplitude', interference:'Interference', reflection:'Reflection', diffraction:'Diffraction',
      pause:'Pause animation', resume:'Resume', reset:'Reset', listen:'Listen to the tone', stop:'Stop the tone', audioNote:'Pure tone, actual frequency. Moderate playback level.', audioError:'Audio playback is unavailable in this browser.',
      observe:'Observations', try:'Experiment', sources:'Explore the physics further:',
      amplitudeB:'Amplitude B / A', interaction:'Interaction', source:'Source', sensor:'Sensor', probePressure:'Local pressure', probeX:'Sensor · X', probeY:'Sensor · Y', probeNote:'Relative model values. The trace follows pressure at the sensor.', probeTrace:'Pressure history at the sensor', interferenceAudio:'Sum of both waves at 250 Hz. Moderate playback level.',
      method:'Educational models: slowed animations, exaggerated particle displacement. Uniform air at approximately 20 °C, speed of sound ≈ 343 m/s. Curves show pressure variations; air particles oscillate locally.',
      workshops:'SoundLab workshops', language:'Language', about:'About the experiments', workshop:'Workshop', slow:'Slowed animation', particles:'Air particles', pressure:'Pressure', distance:'Position (m)', time:'Time (ms)', relative:'Relative pressure', ref:'Reference', sum:'Sum', incident:'Incident', reflected:'Reflected', wall:'Wall', normal:'Normal', compression:'Compression', rarefaction:'Rarefaction', wavelength:'Wavelength', period:'Period', intensity:'Relative intensity', level:'Change / reference', resultant:'Resulting amplitude', angleOut:'Reflected angle', energy:'Reflected intensity', ratio:'Opening / λ', aperture:'Opening', percent:'Amplitude', phase:'Phase offset', angle:'Incidence angle', coefficient:'Reflection (pressure)', spread:'Spreading', wide:'More directional', broad:'More spread out', same:'Same frequency', ideal:'Plane wall · ray model', field:'2D pressure field · slowed',
    }
  };
  const labs = {
    frequency: {
      defaults:{frequency:250}, controls:[['frequency','frequency',100,1000,10,'Hz']], formula:'λ = c / f', audio:true,
      fr:{title:'Fréquence', explanation:'La fréquence compte les oscillations par seconde : plus elle augmente, plus le son pur est aigu. À vitesse constante, sa longueur d’onde diminue. Observez le point orange : il va et vient, tandis que les zones de compression se déplacent. La courbe en dessous montre la pression, pas la trajectoire de l’air.', challenge:'Passez de 250 à 500 Hz. La note monte d’une octave, et la longueur d’onde est divisée par deux. Vous pouvez comparer les deux fréquences à l’écoute.', action:'Comparer 250 / 500 Hz', alt:'Des particules oscillent horizontalement ; une courbe montre la pression sur quatre mètres.'},
      en:{title:'Frequency', explanation:'Frequency counts oscillations per second: increasing it raises the pitch of a pure tone. At a constant speed, its wavelength becomes shorter. Watch the orange dot: it moves back and forth while regions of compression travel. The lower curve shows pressure, not the path of the air.', challenge:'Go from 250 to 500 Hz. Pitch rises by one octave and wavelength halves. Try listening as well.', action:'Compare 250 / 500 Hz', alt:'Air particles oscillate horizontally; a curve shows pressure over four metres.'},
      challenge:{key:'frequency',a:250,b:500}
    },
    amplitude: {
      defaults:{amplitude:50}, controls:[['amplitude','percent',5,100,1,'%']], formula:'I ∝ A² · ΔL = 20 log₁₀(A / Aref)', audio:true,
      fr:{title:'Amplitude', explanation:'L’amplitude règle l’ampleur des variations de pression. Ici, la fréquence reste à 250 Hz. Doubler l’amplitude multiplie l’intensité par quatre, soit environ +6 dB par rapport à la référence. Cela ne signifie pas que le son est perçu comme quatre fois plus fort. Le niveau affiché est relatif, pas une mesure en dB SPL de vos enceintes.', challenge:'Comparez 50 % et 100 %. La courbe est deux fois plus haute ; l’intensité passe de ×1 à ×4. La hauteur de la note reste identique.', action:'Comparer 50 / 100 %', alt:'Courbe de pression à 250 Hz et jauge de l’intensité relative à une amplitude de 50 %.'},
      en:{title:'Amplitude', explanation:'Amplitude controls the size of pressure variations. Frequency stays at 250 Hz here. Doubling amplitude quadruples intensity: approximately +6 dB relative to the reference. This does not mean the sound is perceived as four times as loud. The displayed level is relative, not a dB SPL measurement of your speakers.', challenge:'Compare 50% and 100%. The curve is twice as tall; intensity goes from ×1 to ×4. Pitch stays the same.', action:'Compare 50 / 100%', alt:'Pressure curve at 250 Hz and an intensity meter relative to a 50% reference amplitude.'},
      challenge:{key:'amplitude',a:50,b:100}
    },
    interference: {
      defaults:{phase:0,amplitudeB:100}, controls:[['phase','phase',0,360,1,'°'],['amplitudeB','amplitudeB',0,100,1,'%']], formula:'p = p₁ + p₂ · Aᵣ = √(1 + b² + 2b cosφ)', audio:true,
      fr:{title:'Interférences', explanation:'Au point où deux sons se rencontrent, leurs pressions s’additionnent. Ces deux ondes ont la même fréquence. Vous pouvez régler le déphasage et l’amplitude de B par rapport à A. À amplitudes égales, elles se renforcent en phase et s’annulent à 180° dans ce modèle idéal. Dans une pièce réelle, la différence de trajet fait varier ce résultat d’un endroit à l’autre.', challenge:'Réglez le déphasage à 180°, avec B à 100 %. Les deux courbes existent encore, mais leur somme devient nulle. Revenez ensuite à 0°, ou réduisez l’amplitude de B pour observer une annulation partielle.', action:'Comparer 0 / 180°', alt:'Trois courbes : onde A, onde B et leur somme, avec un déphasage réglable.'},
      en:{title:'Interference', explanation:'Where two sounds meet, their pressures add. These waves have equal frequency. Phase offset and the amplitude of B relative to A can be adjusted. At equal amplitudes, they reinforce in phase and cancel at 180° in this ideal model. In a real room, differences in path length make the result vary from place to place.', challenge:'Set the phase offset to 180°, with B at 100%. Both curves still exist, but their sum becomes zero. Then return to 0°, or lower the amplitude of B to observe partial cancellation.', action:'Compare 0 / 180°', alt:'Three curves: wave A, wave B and their sum, with adjustable phase offset.'},
      challenge:{key:'phase',a:0,b:180}
    },
    reflection: {
      defaults:{angle:35,reflection:100}, controls:[['angle','angle',10,65,1,'°'],['reflection','coefficient',0,100,1,'%']], formula:'θᵢ = θᵣ · Iᵣ / Iᵢ = R²',
      fr:{title:'Réflexion', explanation:'Sur un mur plan, l’angle réfléchi égale l’angle d’incidence, mesurés depuis la normale au mur. Le second réglage change le rapport des amplitudes de pression : 50 % donne 25 % d’intensité réfléchie. Le reste est absorbé dans ce modèle. Les rayons représentent la direction de propagation, pas le déplacement des particules.', challenge:'Passez la réflexion de 100 % à 50 %. Le rayon garde sa direction, mais l’intensité de la réflexion tombe à un quart.', action:'Comparer 100 / 50 %', alt:'Rayon incident et rayon réfléchi sur un mur vertical ; les angles sont mesurés par rapport à sa normale.'},
      en:{title:'Reflection', explanation:'At a plane wall, the reflected angle equals the incidence angle, both measured from the wall normal. The second control changes the pressure amplitude ratio: 50% means 25% reflected intensity. The remainder is absorbed in this model. Rays show propagation direction, not particle motion.', challenge:'Change reflection from 100% to 50%. The ray keeps its direction, but reflected intensity drops to one quarter.', action:'Compare 100 / 50%', alt:'An incident and a reflected ray at a vertical wall, with angles measured from the wall normal.'},
      challenge:{key:'reflection',a:100,b:50}
    },
    diffraction: {
      defaults:{aperture:1,probeX:75,probeY:50}, controls:[['aperture','aperture',.4,3,.1,'λ'],['probeX','probeX',10,90,1,'%'],['probeY','probeY',10,90,1,'%']], formula:'a / λ',
      fr:{title:'Diffraction', explanation:'Une onde se disperse après une ouverture. Quand l’ouverture est petite par rapport à sa longueur d’onde, cette dispersion est plus marquée. Si elle est plus large, la propagation devient plus directionnelle. Ici, la longueur d’onde reste fixe : le réglage change la largeur du passage dans un mur rigide. Bleu : compression ; ambre : raréfaction.', challenge:'Comparez une ouverture de 0,5 λ et de 3 λ. Observez la zone à droite du mur, puis déplacez le capteur pour comparer la pression en différents points.', action:'Comparer 0,5 / 3 λ', alt:'Champ de pression animé passant à travers une ouverture réglable dans un mur rigide.'},
      en:{title:'Diffraction', explanation:'A wave spreads after an opening. Spreading is more pronounced when the opening is small relative to wavelength. A wider opening makes propagation more directional. Wavelength stays fixed here: the control changes the width of a gap in a rigid wall. Blue: compression; amber: rarefaction.', challenge:'Compare an opening of 0.5 λ and 3 λ. Observe the region to the right of the wall, then move the sensor to compare pressure at different points.', action:'Compare 0.5 / 3 λ', alt:'An animated pressure field passing through an adjustable gap in a rigid wall.'},
      challenge:{key:'aperture',a:.5,b:3}
    }
  };
  const interactions = {
    fr: {
      frequency:'Saisissez le repère λ et déplacez-le horizontalement pour modifier la longueur d’onde. Au clavier : flèches gauche et droite.',
      amplitude:'Saisissez la crête bleue et déplacez-la verticalement pour régler l’amplitude. Au clavier : flèches haut et bas.',
      interference:'Déplacez le repère B : horizontalement pour le déphasage, verticalement pour l’amplitude. Au clavier : gauche/droite pour la phase, haut/bas pour l’amplitude.',
      reflection:'Déplacez la source bleue pour modifier l’angle d’incidence. Au clavier : flèches haut et bas.',
      diffraction:'Écartez ou rapprochez les deux repères de l’ouverture. Cliquez dans le champ pour placer le capteur, ou faites-le glisser. Au clavier : flèches pour le capteur, Maj + haut/bas pour l’ouverture.'
    },
    en: {
      frequency:'Drag the λ marker horizontally to change wavelength. Keyboard: left and right arrows.',
      amplitude:'Drag the blue crest vertically to adjust amplitude. Keyboard: up and down arrows.',
      interference:'Drag marker B horizontally for phase offset and vertically for amplitude. Keyboard: left/right for phase, up/down for amplitude.',
      reflection:'Drag the blue source to change the incidence angle. Keyboard: up and down arrows.',
      diffraction:'Drag the two opening markers apart or together. Click the field to place the sensor, or drag it. Keyboard: arrows move the sensor; Shift + up/down adjusts the opening.'
    }
  };
  let language = 'fr';
  try { language = localStorage.getItem('colin-portfolio-language') || (navigator.language.startsWith('fr') ? 'fr' : 'en'); } catch {}
  if (!copy[language]) language = 'fr';
  let active = 'frequency', values = {...labs.frequency.defaults};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches, visible = true, raf = 0, last = 0, time = 0, debt = 0;
  let field = null, context = null, oscillator = null, gain = null, audioActive = false, audioVersion = 0;
  const canvas = $('lab-canvas'), ctx = canvas.getContext('2d');
  const heat = document.createElement('canvas'); heat.width = 176; heat.height = 104;
  const heatCtx = heat.getContext('2d'); const heatImage = heatCtx.createImageData(176,104);
  let width = 800, height = 380;
  let handles = [], geometry = {}, drag = null, pendingMove = null, interactionRaf = 0, wavePeak = .625;
  const probeTrace = $('probe-trace'), probeCtx = probeTrace.getContext('2d');
  const history = new Float32Array(160); let historyHead = 0, historyCount = 0, probeDebt = 0, sampleStep = 0;
  const t = key => copy[language][key] || key;
  const detail = () => labs[active][language];
  const fmt = (v, digits = 2) => Number(v).toLocaleString(language, {maximumFractionDigits:digits});
  function applyLanguage() {
    document.documentElement.lang = language;
    document.querySelectorAll('[data-copy]').forEach(el => el.textContent = t(el.dataset.copy));
    document.querySelectorAll('[data-language]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.language === language)));
    document.querySelector('.language-switch').setAttribute('aria-label', t('language'));
    document.querySelector('.workshops').setAttribute('aria-label', t('workshops'));
    document.querySelector('.method').setAttribute('aria-label', t('about'));
    document.querySelector('meta[name="description"]').content = language === 'fr' ? 'SoundLab de Colin Montanari : cinq ateliers interactifs pour explorer la physique du son.' : 'Colin Montanari’s SoundLab: five interactive workshops to explore the physics of sound.';
    $('audio-error').textContent = t('audioError');
    probeTrace.setAttribute('aria-label',t('probeTrace'));
    renderControls(); updateCopy(); draw();
  }
  function updateCopy() {
    const lab = labs[active], text = detail();
    $('workshop-title').textContent = text.title;
    $('workshop-number').textContent = `${t('workshop')} 0${Object.keys(labs).indexOf(active) + 1} / 05`;
    $('explanation').textContent = text.explanation;
    $('challenge-text').textContent = text.challenge;
    $('challenge').textContent = text.action;
    canvas.setAttribute('aria-label', text.alt);
    $('interaction-instructions').textContent = interactions[language][active];
    $('formula').textContent = lab.formula;
    $('pause').textContent = t(paused ? 'resume' : 'pause');
    $('pause').setAttribute('aria-pressed', String(paused));
    $('listen').textContent = t(audioActive ? 'stop' : 'listen');
    $('listen').setAttribute('aria-pressed', String(audioActive));
    $('listen').hidden = $('audio-note').hidden = !lab.audio;
    $('audio-note').textContent = t(active === 'interference' ? 'interferenceAudio' : 'audioNote');
    $('probe-readout').hidden = active !== 'diffraction';
    const labels = active === 'interference' ? ['A', 'B', t('sum')] : active === 'reflection' ? [t('incident'),t('reflected')] : active === 'diffraction' ? [t('compression'),t('rarefaction')] : active === 'amplitude' ? [t('pressure'),t('ref')] : [t('particles')];
    $('legend').replaceChildren(...labels.map(label => {const span = document.createElement('span');span.textContent = label;return span;}));
    $('view-note').textContent = t(active === 'reflection' ? 'ideal' : active === 'diffraction' ? 'field' : 'slow');
    updateMetrics();
  }
  function renderControls() {
    $('inputs').replaceChildren();
    $('inputs').classList.toggle('has-probe',active === 'diffraction');
    for (const [key,label,min,max,step,unit] of labs[active].controls) {
      const block = document.createElement('div'); block.className = 'control';
      const name = document.createElement('label'); name.htmlFor = `control-${key}`;
      const text = document.createElement('span'); text.textContent = t(label);
      const output = document.createElement('output'); output.id = `value-${key}`; output.htmlFor = `control-${key}`;
      name.append(text,output);
      const input = document.createElement('input'); input.type = 'range'; input.id = `control-${key}`;
      input.min = min; input.max = max; input.step = step; input.value = values[key];
      input.addEventListener('input', () => {
        changeValues({[key]:Number(input.value)});
      });
      input.addEventListener('change', () => {if (key === 'aperture' && paused) settleAperture();});
      const ends = document.createElement('div'); ends.className = 'range-ends'; ends.setAttribute('aria-hidden','true');
      const low = document.createElement('span'), high = document.createElement('span'); low.textContent = `${fmt(min)} ${unit}`; high.textContent = `${fmt(max)} ${unit}`; ends.append(low,high);
      block.append(name,input,ends); $('inputs').append(block);
    }
  }
  function updateMetrics() {
    for (const [key,, ,,,unit] of labs[active].controls) {
      $(`value-${key}`).textContent = `${fmt(values[key])} ${unit}`;
      $(`control-${key}`).setAttribute('aria-valuetext', `${fmt(values[key])} ${unit}`);
    }
    const amplitude = (values.amplitude || 50) / 100;
    let metrics;
    if (active === 'frequency') metrics = [[t('wavelength'),`${fmt(P.wavelength(values.frequency))} m`],[t('period'),`${fmt(1000/values.frequency)} ms`]];
    if (active === 'amplitude') metrics = [[t('intensity'),`×${fmt(P.intensity(amplitude/.5))}`],[t('level'),`${P.relativeDb(amplitude)>=0 ? '+' : ''}${fmt(P.relativeDb(amplitude))} dB`]];
    if (active === 'interference') metrics = [[t('resultant'),`${fmt(P.interference(values.phase,values.amplitudeB/100))} × A`],[t('frequency'),'250 Hz']];
    if (active === 'reflection') metrics = [[t('angleOut'),`${values.angle}°`],[t('energy'),`${fmt(P.intensity(values.reflection/100)*100)} %`]];
    if (active === 'diffraction') metrics = [[t('ratio'),fmt(values.aperture)],[t('spread'),t(values.aperture <= 1 ? 'broad' : 'wide')]];
    $('metrics').replaceChildren(...metrics.map(([label,value]) => {
      const row = document.createElement('div'); row.className = 'metric';
      const span = document.createElement('span'), strong = document.createElement('strong'); span.textContent = label; strong.textContent = value; row.append(span,strong); return row;
    }));
  }
  function stopAudio() {
    audioVersion++; audioActive = false;
    const previous = oscillator, previousGain = gain; oscillator = null; gain = null;
    if (context && previousGain) {
      const now = context.currentTime; previousGain.gain.cancelScheduledValues(now); previousGain.gain.setTargetAtTime(0,now,.018);
      if (previous) previous.stop(now+.1);
      setTimeout(() => {previous?.disconnect();previousGain.disconnect();},150);
    }
    $('listen').textContent = t('listen'); $('listen').setAttribute('aria-pressed','false');
  }
  function updateAudio() {
    if (!audioActive || !context || !oscillator) return;
    oscillator.frequency.setTargetAtTime(active === 'frequency' ? values.frequency : 250, context.currentTime,.025);
    if (active === 'interference') {
      const phase=values.phase*Math.PI/180,b=values.amplitudeB/100;
      // The sine/cosine coefficients are the exact sum of A and phase-shifted B.
      oscillator.setPeriodicWave(context.createPeriodicWave(new Float32Array([0,b*Math.sin(phase)]),new Float32Array([0,1+b*Math.cos(phase)]),{disableNormalization:true}));
    }
    gain.gain.setTargetAtTime(active === 'amplitude' ? values.amplitude/100*.075 : active === 'interference' ? .025 : .045,context.currentTime,.025);
  }
  $('listen').addEventListener('click', async () => {
    if (audioActive) {stopAudio(); return;}
    const version = ++audioVersion;
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) throw new Error('No audio');
      context ||= new Audio(); await context.resume();
      if (version !== audioVersion || !labs[active].audio || document.hidden) return;
      gain = context.createGain(); gain.connect(context.destination); gain.gain.setValueAtTime(0,context.currentTime);
      oscillator = context.createOscillator(); oscillator.type = 'sine'; oscillator.connect(gain); oscillator.start(); audioActive = true; updateAudio();
      $('audio-error').hidden = true; $('listen').textContent = t('stop'); $('listen').setAttribute('aria-pressed','true');
    } catch {stopAudio(); $('audio-error').hidden = false;}
  });
  function warmField() {for (let i = 0; i < 380; i++) field.step();}
  function choose(key) {
    endDrag();
    stopAudio(); active = key; values = {...labs[key].defaults}; time = 0; debt = 0; wavePeak = .625;
    clearHistory();
    if (key === 'diffraction') {field ||= new P.ApertureField(); field.setAperture(values.aperture); warmField();}
    document.querySelectorAll('[data-workshop]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.workshop === key)));
    showSelectedWorkshop();
    $('audio-error').hidden = true; renderControls(); updateCopy(); draw();
    if (key === 'diffraction') updateProbe(false);
  }
  document.querySelectorAll('[data-workshop]').forEach(button => button.addEventListener('click', () => choose(button.dataset.workshop)));
  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {
    language = button.dataset.language; try {localStorage.setItem('colin-portfolio-language',language);} catch {} applyLanguage();
  }));
  $('reset').addEventListener('click', () => choose(active));
  $('challenge').addEventListener('click', () => {
    const {key,a,b} = labs[active].challenge;
    const patch = {[key]:Math.abs(values[key]-b)<.01 ? a : b};
    if (active === 'interference') patch.amplitudeB = 100;
    changeValues(patch,true);
  });
  function clearHistory() {
    history.fill(0);historyHead=0;historyCount=0;probeDebt=0;sampleStep=0;
    $('probe-value').textContent='0';probeCtx.clearRect(0,0,probeTrace.width,probeTrace.height);
  }
  function updateProbe() {
    if (active !== 'diffraction' || !field) return;
    const pressure=field.sample(values.probeX/100,values.probeY/100);
    $('probe-value').textContent=`${pressure>=0?'+':''}${fmt(pressure,3)}`;
    $('probe-value').style.color=pressure>=0?'#7b9aff':'#efb87a';
    const w=probeTrace.width,h=probeTrace.height,cy=h/2;
    probeCtx.clearRect(0,0,w,h);probeCtx.strokeStyle='#293344';probeCtx.lineWidth=1;probeCtx.beginPath();probeCtx.moveTo(0,cy);probeCtx.lineTo(w,cy);probeCtx.stroke();
    let maximum=.04;
    for(let n=0;n<historyCount;n++)maximum=Math.max(maximum,Math.abs(history[(historyHead-historyCount+n+history.length)%history.length]));
    for(let n=1;n<historyCount;n++) {
      const previous=history[(historyHead-historyCount+n-1+history.length)%history.length],v=history[(historyHead-historyCount+n+history.length)%history.length];
      const x0=(history.length-historyCount+n-1)/(history.length-1)*w,x1=(history.length-historyCount+n)/(history.length-1)*w;
      probeCtx.strokeStyle=v>=0?'#7b9aff':'#efb87a';probeCtx.lineWidth=1.5;probeCtx.beginPath();probeCtx.moveTo(x0,cy-previous/maximum*(cy-7));probeCtx.lineTo(x1,cy-v/maximum*(cy-7));probeCtx.stroke();
    }
  }
  function settleAperture() {
    if (active !== 'diffraction') return;
    field.clear();warmField();clearHistory();updateProbe(false);draw();
  }
  function changeValues(patch, settled = false) {
    let changed=false;
    for(const [key,value] of Object.entries(patch)) {
      const control=labs[active].controls.find(control=>control[0]===key);
      if(!control)continue;
      const rounded=Math.round(Math.max(control[2],Math.min(control[3],value))/control[4])*control[4];
      if(Math.abs(values[key]-rounded)>.00001){values[key]=rounded;changed=true;}
    }
    if(!changed)return;
    if(active==='diffraction') {
      if('aperture' in patch)field.setAperture(values.aperture,true);
      const ix=Math.round(values.probeX/100*(field.nx-1)),iy=Math.round(values.probeY/100*(field.ny-1));
      if(field.solid[iy*field.nx+ix])values.probeX=Math.ceil((field.wall+4)/(field.nx-1)*100);
      if(settled && paused && 'aperture' in patch)settleAperture();
      updateProbe(false);
    }
    for(const [key] of labs[active].controls)$(`control-${key}`).value=values[key];
    updateMetrics();updateAudio();draw();
  }
  function pointFromEvent(event) {
    const rect=canvas.getBoundingClientRect();return {x:event.clientX-rect.left,y:event.clientY-rect.top};
  }
  function applyDrag(point) {
    if(!drag)return;
    drag.point=point;
    const effective={x:drag.target.x+point.x-drag.start.x,y:drag.target.y+point.y-drag.start.y};
    changeValues(P.gesture(drag.target.kind,effective,{x:drag.target.x,phase:drag.phase},drag.geometry));
  }
  function endDrag() {
    cancelAnimationFrame(interactionRaf);interactionRaf=0;
    if(pendingMove && drag)applyDrag(pendingMove);
    const previous=drag;drag=null;pendingMove=null;canvas.classList.remove('is-dragging');
    if(previous && canvas.hasPointerCapture(previous.id))canvas.releasePointerCapture(previous.id);
    if(previous && paused && previous.target.kind.startsWith('aperture') && !document.hidden)settleAperture();
    if(previous)scheduling();
  }
  canvas.addEventListener('pointerdown', event => {
    if(event.button!==0 || drag)return;
    const point=pointFromEvent(event),radius=event.pointerType==='touch'?30:22;
    let target=handles.slice().sort((a,b)=>Math.hypot(point.x-a.x,point.y-a.y)-Math.hypot(point.x-b.x,point.y-b.y))[0];
    if(target && Math.hypot(point.x-target.x,point.y-target.y)>=radius)target=null;
    if(!target && active==='diffraction' && point.x>=geometry.x && point.x<=geometry.x+geometry.w && point.y>=geometry.y && point.y<=geometry.y+geometry.h) {
      changeValues(P.gesture('probe',point,{},geometry));
      target=handles.find(handle=>handle.kind==='probe');
    }
    if(!target)return;
    event.preventDefault();canvas.focus({preventScroll:true});canvas.setPointerCapture(event.pointerId);
    drag={id:event.pointerId,target:{...target},start:point,phase:values.phase,geometry:{...geometry}};
    canvas.classList.add('is-dragging');scheduling();draw();
  });
  canvas.addEventListener('pointermove', event => {
    const point=pointFromEvent(event);
    if(drag && drag.id===event.pointerId) {
      pendingMove=point;
      if(!interactionRaf)interactionRaf=requestAnimationFrame(()=>{interactionRaf=0;if(pendingMove){const latest=pendingMove;pendingMove=null;applyDrag(latest);}});
    } else canvas.style.cursor=handles.some(handle=>Math.hypot(point.x-handle.x,point.y-handle.y)<22)?'grab':active==='diffraction'?'crosshair':'default';
  });
  canvas.addEventListener('pointerup', event => {if(drag?.id===event.pointerId){pendingMove=pointFromEvent(event);endDrag();}});
  canvas.addEventListener('pointercancel',endDrag);
  canvas.addEventListener('lostpointercapture', () => {if(drag)endDrag();});
  canvas.addEventListener('keydown', event => {
    const direction={ArrowLeft:-1,ArrowRight:1,ArrowUp:1,ArrowDown:-1}[event.key];
    if(!direction)return;
    const horizontal=event.key==='ArrowLeft'||event.key==='ArrowRight';
    let patch;
    if(active==='frequency' && horizontal)patch={frequency:values.frequency-direction*10};
    if(active==='amplitude' && !horizontal)patch={amplitude:values.amplitude+direction*5};
    if(active==='interference')patch=horizontal?{phase:(values.phase-direction*5+360)%360}:{amplitudeB:values.amplitudeB+direction*5};
    if(active==='reflection' && !horizontal)patch={angle:values.angle-direction};
    if(active==='diffraction')patch=event.shiftKey && !horizontal?{aperture:values.aperture+direction*.1}:horizontal?{probeX:values.probeX+direction}:{probeY:values.probeY-direction};
    if(patch){event.preventDefault();changeValues(patch,true);}
  });
  function scheduling() {
    cancelAnimationFrame(raf); raf = 0; last = 0;
    if (!paused && visible && !document.hidden && (!drag || active === 'diffraction')) raf = requestAnimationFrame(frame);
  }
  $('pause').addEventListener('click', () => {paused = !paused; if (paused) stopAudio(); updateCopy(); scheduling();});
  document.addEventListener('visibilitychange', () => {if (document.hidden) {endDrag();stopAudio();} scheduling();});
  window.addEventListener('pagehide', stopAudio);
  reduced.addEventListener('change', event => {if (event.matches) {paused = true;stopAudio();updateCopy();scheduling();}});
  new IntersectionObserver(entries => {visible = entries[0].isIntersecting; if (!visible) stopAudio(); scheduling();},{threshold:0}).observe($('studio'));
  function resize() {
    const bounds = canvas.getBoundingClientRect(); width = Math.max(1,bounds.width); height = Math.max(1,bounds.height);
    const dpr = Math.min(window.devicePixelRatio || 1,1.5); canvas.width = Math.round(width*dpr); canvas.height = Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0); showSelectedWorkshop();draw();
  }
  function showSelectedWorkshop() {
    const nav=document.querySelector('.workshops'),button=nav.querySelector('[aria-pressed="true"]');
    if(!button || nav.scrollWidth<=nav.clientWidth)return;
    const bounds=nav.getBoundingClientRect(),selected=button.getBoundingClientRect(),offset=selected.left-bounds.left;
    if(offset<0 || offset+selected.width>nav.clientWidth)nav.scrollLeft+=offset-(nav.clientWidth-selected.width)/2;
  }
  new ResizeObserver(resize).observe(canvas.parentElement);
  function text(label,x,y,color='#8d97aa',align='left',size=12) {
    ctx.fillStyle=color;ctx.font=`${size}px 'Segoe UI',Arial,sans-serif`;ctx.textAlign=align;ctx.fillText(label,x,y);
  }
  function line(x1,y1,x2,y2,color='#293344',dash=[]) {
    ctx.strokeStyle=color;ctx.lineWidth=1;ctx.setLineDash(dash);ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.setLineDash([]);
  }
  function wave(fn,x,y,w,amplitude,color,lineWidth=2) {
    ctx.beginPath();for(let i=0;i<=Math.ceil(w);i++){const xx=i/w;const yy=y-fn(xx)*amplitude;if(i===0)ctx.moveTo(x+i,yy);else ctx.lineTo(x+i,yy);}
    ctx.strokeStyle=color;ctx.lineWidth=lineWidth;ctx.stroke();
  }
  function axes(x,y,w,h,label,maximum=8) {
    line(x,y-h,x,y+h);line(x,y,x+w,y);line(x,y+h,x+w,y+h);
    for(let n=0;n<=4;n++){const xx=x+w*n/4;line(xx,y-h,xx,y+h,'#202837',[2,6]);text(fmt(maximum*n/4),xx,y+h+19,'#7d8799','center',10);}
    text(label,x+w,y+h+38,'#8d97aa','right',11);
  }
  function handle(kind,x,y,color,label='') {
    handles.push({kind,x,y});
    ctx.fillStyle='#0d1119';ctx.strokeStyle=color;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x,y,8,0,Math.PI*2);ctx.fill();ctx.stroke();
    ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,y,2,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle=color;ctx.globalAlpha=drag?.target.kind === kind ? .95 : .3;ctx.lineWidth=1;ctx.beginPath();ctx.arc(x,y,15,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=1;
    if(label)text(label,x,y-21,color,'center',11);
  }
  function drawFrequency() {
    const x=34,w=width-62,ym=height*.25,phase=time*2*Math.PI*values.frequency*.003,lambda=P.wavelength(values.frequency);
    geometry={x,w};
    text(t('particles'),x,22);text('→',x+w,22,'#7b9aff','right',18);
    const displacement=Math.min(13,lambda/4*w*.07);
    for(let row=0;row<4;row++)for(let j=0;j<96;j++){
      const origin=x+j/95*w,y=ym+(row-1.5)*17;
      const theta=2*Math.PI*(j/95*4)/lambda-phase;
      if(row===2&&j===38){ctx.beginPath();ctx.arc(origin,y,4,0,Math.PI*2);ctx.strokeStyle='#76634d';ctx.lineWidth=1;ctx.stroke();}
      ctx.beginPath();ctx.arc(origin-displacement*Math.sin(theta),y,row===2&&j===38?3.5:1.7,0,Math.PI*2);
      ctx.fillStyle=row===2&&j===38?'#efb87a':`rgba(123,154,255,${.45+.4*(Math.cos(theta)+1)/2})`;ctx.fill();
    }
    const end=x+lambda/4*w,by=height*.44;
    line(x,by,end,by,'#7b9aff');line(x,by-6,x,by+6,'#7b9aff');
    handle('wavelength',end,by,'#7b9aff','λ');
    const y=height*.72,h=height*.12;
    text(t('pressure'),x,height*.55); axes(x,y,w,h,t('distance'),4);
    wave(xx=>Math.cos(2*Math.PI*xx*4/lambda-phase),x,y,w,h*.78,'#7b9aff');
  }
  function drawAmplitude() {
    const x=34,w=width-104,y=height*.48,h=height*.28,phase=time*1.6;
    geometry={x,w,y,h};
    text(`${t('relative')} · 250 Hz`,x,22);axes(x,y,w,h,t('time'));
    wave(xx=>Math.sin(4*Math.PI*xx-phase)*.5,x,y,w,h,'#efb87a',1);
    wave(xx=>Math.sin(4*Math.PI*xx-phase)*values.amplitude/100,x,y,w,h,'#7b9aff',2.2);
    const peak=((Math.PI/2+phase)/(4*Math.PI))%.5+.5;
    handle('amplitude',x+peak*w,y-h*values.amplitude/100,'#7b9aff','A');
    text('+1',x-7,y-h+4,'#7d8799','right',10);text('−1',x-7,y+h,'#7d8799','right',10);
    const barX=width-45,barY=y+h,barH=h*2;
    ctx.fillStyle='#1e2a42';ctx.fillRect(barX-8,barY-barH,16,barH);
    ctx.fillStyle='#5078ff';ctx.fillRect(barX-8,barY-barH*(values.amplitude/100)**2,16,barH*(values.amplitude/100)**2);
    text('I',barX,barY-barH-12,'#7b9aff','center');text('×4',barX,barY+19,'#7d8799','center',10);
  }
  function drawInterference() {
    const x=34,w=width-62,offset=values.phase*Math.PI/180,phase=time*1.7;
    const rows=[height*.23,height*.48,height*.76],amplitude=height*.075;
    const b=values.amplitudeB/100;geometry={x,w,y:rows[1],h:amplitude};
    rows.forEach((y,i)=>{line(x,y,x+w,y);text(i===2?t('sum'):i===0?'A':'B',x,y-amplitude-10,i===2?'#edf0f7':i===0?'#7b9aff':'#efb87a');});
    wave(xx=>Math.sin(4*Math.PI*xx-phase),x,rows[0],w,amplitude,'#7b9aff');
    wave(xx=>b*Math.sin(4*Math.PI*xx-phase+offset),x,rows[1],w,amplitude,'#efb87a');
    wave(xx=>Math.sin(4*Math.PI*xx-phase)+b*Math.sin(4*Math.PI*xx-phase+offset),x,rows[2],w,amplitude,'#edf0f7',2.2);
    const base=(((Math.PI/2+phase-offset)/(4*Math.PI))%.5+.5)%.5;
    const peak=Math.abs(base-wavePeak)<=Math.abs(base+.5-wavePeak)?base:base+.5;
    const hx=drag?.target.kind==='waveB' && drag.point?Math.max(x,Math.min(x+w,drag.target.x+drag.point.x-drag.start.x)):x+peak*w;
    wavePeak=(hx-x)/w;
    handle('waveB',hx,rows[1]-amplitude*b,'#efb87a','B');
    text(`${t('time')} · 0–8 ms`,x+w,height-9,'#8d97aa','right',11);
  }
  function arrow(x1,y1,x2,y2,color,opacity=1) {
    ctx.globalAlpha=opacity;line(x1,y1,x2,y2,color);const a=Math.atan2(y2-y1,x2-x1);
    line(x2,y2,x2-9*Math.cos(a-.45),y2-9*Math.sin(a-.45),color);line(x2,y2,x2-9*Math.cos(a+.45),y2-9*Math.sin(a+.45),color);ctx.globalAlpha=1;
  }
  function drawReflection() {
    const wallX=width*.77,cy=height*.5,angle=values.angle*Math.PI/180;
    geometry={wx:wallX,cy};
    const length=Math.min(width*.59/Math.cos(angle),height*.36/Math.sin(angle));
    const dx=length*Math.cos(angle),dy=length*Math.sin(angle),sx=wallX-dx,sy=cy+dy;
    const direction=P.reflect(Math.cos(angle),-Math.sin(angle),1,0),ex=wallX+direction.x*length,ey=cy+direction.y*length;
    const R=values.reflection/100;
    ctx.fillStyle='#273246';ctx.fillRect(wallX,30,8,height-60);
    for(let y=35;y<height-34;y+=14)line(wallX+8,y,wallX+18,y-7,'#465268');
    line(Math.max(24,wallX-dx-20),cy,wallX,cy,'#606c83',[5,5]);
    arrow(sx,sy,wallX,cy,'#7b9aff');if(R>0)arrow(wallX,cy,ex,ey,'#efb87a',.12+.88*R*R);
    ctx.strokeStyle='#7b9aff';ctx.beginPath();ctx.arc(wallX,cy,35,Math.PI-angle,Math.PI);ctx.stroke();
    ctx.strokeStyle='#efb87a';ctx.beginPath();ctx.arc(wallX,cy,43,Math.PI,Math.PI+angle);ctx.stroke();
    text(`${values.angle}°`,wallX-58,cy+26,'#7b9aff','center',11);text(`${values.angle}°`,wallX-58,cy-18,'#efb87a','center',11);
    text(t('normal'),Math.max(24,wallX-dx),cy-9);text(t('wall'),wallX+4,20,'#a4abb8','center');
    handle('source',sx,sy,'#7b9aff','S');
    for(let n=0;n<5;n++){
      const progress=((time*.4+n/5)%1)*2;
      const reflected=progress>1,u=reflected?progress-1:progress;
      if(reflected&&R===0)continue;
      const px=reflected?wallX-dx*u:sx+dx*u,py=reflected?cy-dy*u:sy-dy*u;
      ctx.globalAlpha=reflected?R*R:1;ctx.fillStyle=reflected?'#efb87a':'#7b9aff';ctx.beginPath();ctx.arc(px,py,3,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;
    }
  }
  function drawDiffraction() {
    if (!field) return;
    const pixels=heatImage.data;
    for(let i=0;i<field.p.length;i++){
      const value=field.p[i],strength=Math.min(1,Math.abs(value)*16),color=value>=0?[123,154,255]:[239,184,122],j=i*4;
      pixels[j]=13+(color[0]-13)*strength;pixels[j+1]=17+(color[1]-17)*strength;pixels[j+2]=25+(color[2]-25)*strength;pixels[j+3]=255;
      if(field.solid[i]){pixels[j]=56;pixels[j+1]=68;pixels[j+2]=88;}
    }
    heatCtx.putImageData(heatImage,0,0);
    const scale=Math.min((width-18)/field.nx,(height-30)/field.ny),w=scale*field.nx,h=scale*field.ny,x=(width-w)/2,y=(height-h)/2;
    geometry={x,y,w,h,scale,cy:y+h/2};
    ctx.imageSmoothingEnabled=true;ctx.drawImage(heat,x,y,w,h);
    text('→',x+scale*23,y+h/2,'#edf0f7','center',18);
    const wx=x+field.wall*scale;line(wx+10,y+h/2-field.gap/2*scale,wx+10,y+h/2+field.gap/2*scale,'#edf0f7');
    ctx.fillStyle='rgba(11,13,17,.82)';ctx.fillRect(wx+14,y+h/2-11,51,23);
    text(`${fmt(values.aperture)} λ`,wx+18,y+h/2+4,'#edf0f7','left',11);
    const top=y+h/2-field.gap/2*scale,bottom=y+h/2+field.gap/2*scale;
    line(wx-13,top,wx,top,'#7b9aff');line(wx,bottom,wx+13,bottom,'#7b9aff');
    handle('apertureTop',wx-13,top,'#7b9aff');handle('apertureBottom',wx+13,bottom,'#7b9aff');
    handle('probe',x+values.probeX/100*w,y+values.probeY/100*h,'#edf0f7','P');
  }
  function draw() {
    handles=[];
    ctx.clearRect(0,0,width,height);
    if(active==='frequency')drawFrequency();else if(active==='amplitude')drawAmplitude();else if(active==='interference')drawInterference();else if(active==='reflection')drawReflection();else drawDiffraction();
  }
  function frame(now) {
    const dt=last?Math.min(.05,(now-last)/1000):0;last=now;time+=dt;
    if(active==='diffraction') {
      debt+=dt*200;const steps=Math.min(10,Math.floor(debt));debt-=steps;
      for(let i=0;i<steps;i++) {
        field.step();
        // Sample at fixed simulation intervals, independently of display frame rate.
        if(++sampleStep%2===0) {
          history[historyHead]=field.sample(values.probeX/100,values.probeY/100);
          historyHead=(historyHead+1)%history.length;historyCount=Math.min(history.length,historyCount+1);
        }
      }
      probeDebt+=dt;if(probeDebt>=.04){probeDebt%=.04;updateProbe();}
    }
    draw();raf=requestAnimationFrame(frame);
  }
  applyLanguage();resize();scheduling();
})();
