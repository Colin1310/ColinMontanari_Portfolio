class ListeningAudio {
  constructor(onPlayback=()=>{}) {this.context=null;this.master=null;this.voice=null;this.version=0;this.volume=.3;this.onPlayback=onPlayback;}
  static buildVoice(context,spec,destination) {
    const gain=context.createGain();gain.gain.value=0;gain.connect(destination);
    let source;const nodes=[gain],sources=[];
    if(spec.type==='location') {
      const buffer=context.createBuffer(1,Math.ceil(context.sampleRate*1.8),context.sampleRate),data=buffer.getChannelData(0),random=ListeningGames.seededRandom(spec.seed);
      for(let i=0;i<data.length;i++)data[i]=(random()*2-1)*.7;
      source=context.createBufferSource();source.buffer=buffer;
      const filter=context.createBiquadFilter();filter.type='bandpass';filter.frequency.value=1600;filter.Q.value=.45;
      const panner=context.createPanner();panner.panningModel='HRTF';panner.rolloffFactor=0;
      const position=ListeningGames.sourcePosition(spec.angle);
      panner.positionX.value=position.x;panner.positionY.value=position.y;panner.positionZ.value=position.z;
      source.connect(filter);filter.connect(panner);panner.connect(gain);nodes.push(filter,panner);
    } else if(spec.type==='beats') {
      const mixer=context.createGain();mixer.gain.value=.5;mixer.connect(gain);nodes.push(mixer);
      for(const frequency of [spec.fundamental,spec.fundamental+spec.rate]){
        const oscillator=context.createOscillator();oscillator.type='sine';oscillator.frequency.value=frequency;oscillator.connect(mixer);sources.push(oscillator);nodes.push(oscillator);
      }
      source=sources[0];
    } else {
      source=context.createOscillator();source.type='sine';source.frequency.value=spec.frequency || spec.fundamental;
      if(spec.type==='harmonics') {
        const normalized=ListeningGames.normalizeHarmonics(spec.amplitudes);
        source.setPeriodicWave(context.createPeriodicWave(new Float32Array(7),new Float32Array([0,...normalized]),{disableNormalization:true}));
      }
      source.connect(gain);
    }
    if(spec.type!=='beats'){sources.push(source);nodes.push(source);}
    return {source,gain,nodes,sources,start(now,duration=spec.type==='beats'?8:1.7){
      gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(1,now+.025);
      gain.gain.setValueAtTime(1,now+duration-.08);gain.gain.linearRampToValueAtTime(0,now+duration);
      for(const oscillator of sources){oscillator.start(now);oscillator.stop(now+duration);}
    },cleanup(){for(const node of nodes)try{node.disconnect();}catch{}}};
  }
  setVolume(percent) {
    this.volume=ListeningGames.clamp(percent/100,0,1);
    if(this.master)this.master.gain.setTargetAtTime(this.volume*.12,this.context.currentTime,.02);
  }
  stop() {
    this.version++;const voice=this.voice;this.voice=null;this.onPlayback(null);
    if(!voice)return;
    const now=this.context.currentTime;
    if(voice.gain.gain.cancelAndHoldAtTime)voice.gain.gain.cancelAndHoldAtTime(now);else voice.gain.gain.cancelScheduledValues(now);
    voice.gain.gain.setTargetAtTime(0,now,.012);for(const source of voice.sources)try{source.stop(now+.06);}catch{}
  }
  async play(spec,label) {
    this.stop();const version=this.version;
    const Audio=window.AudioContext || window.webkitAudioContext;
    if(!Audio)throw new Error('AudioUnavailable');
    if(!this.context){this.context=new Audio();this.master=this.context.createGain();this.master.gain.value=this.volume*.12;this.master.connect(this.context.destination);}
    await this.context.resume();
    if(version!==this.version || document.hidden)return false;
    const voice=ListeningAudio.buildVoice(this.context,spec,this.master);this.voice=voice;
    voice.source.onended=()=>{voice.cleanup();if(this.voice===voice){this.voice=null;this.onPlayback(null);}};
    voice.start(this.context.currentTime+.015);this.onPlayback(label);return true;
  }
}
if(typeof module!=='undefined')module.exports=ListeningAudio;
