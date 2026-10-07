// Visual pulse model. The supplied audio sample starts with each visual emission.
const PageWaveSignal = {
  stepRate:140, period:48, peak:52, spread:30, lastStep:128, carrier:420,
  get duration(){return (this.lastStep+1)/this.stepRate;},
  envelope(time){const age=time*this.stepRate;return age<0||age>this.lastStep?0:Math.exp(-(((age-this.peak)/this.spread)**2));},
  panAt(x,width,spread=1){return Math.max(-1,Math.min(1,2*x/Math.max(1,width)-1))*Math.max(0,Math.min(1,spread));},
  sample(time){const fade=Math.min(1,time/.006,(this.duration-time)/.018);return this.envelope(time)*Math.sin(2*Math.PI*this.carrier*time)*Math.max(0,fade);},
};
class PageWaveAudio {
  static assetURL='wave-click.wav?v=20261007-drop';
  constructor(){this.context=null;this.master=null;this.buffer=null;this.loading=null;this.sampleGain=1;this.voices=[];this.enabled=true;this.volume=.18;this.spread=1;this.generation=0;}
  async loadBuffer(){
    if(this.buffer)return this.buffer;
    if(!this.loading)this.loading=(async()=>{
      const response=await fetch(PageWaveAudio.assetURL);if(!response.ok)throw new Error('WaveAudioUnavailable');
      const buffer=await this.context.decodeAudioData(await response.arrayBuffer());
      // Match the previous playback level without altering the original WAV file.
      let peak=0;for(let c=0;c<buffer.numberOfChannels;c++)for(const value of buffer.getChannelData(c))peak=Math.max(peak,Math.abs(value));
      this.sampleGain=peak>0?Math.min(8,1/peak):1;this.buffer=buffer;return buffer;
    })().catch(error=>{this.loading=null;throw error;});
    return this.loading;
  }
  static voice(context,buffer,pan,destination){
    const source=context.createBufferSource(),gain=context.createGain(),panner=context.createStereoPanner();
    source.buffer=buffer;gain.gain.value=1;panner.pan.value=pan;source.connect(gain);gain.connect(panner);panner.connect(destination);
    return {source,gain,panner,cleanup(){source.disconnect();gain.disconnect();panner.disconnect();}};
  }
  setVolume(value){this.volume=Math.max(0,Math.min(1,value));if(this.master)this.master.gain.setTargetAtTime(this.volume*.17,this.context.currentTime,.015);}
  stop(){this.generation++;for(const voice of this.voices){const now=this.context.currentTime;voice.gain.gain.cancelAndHoldAtTime?.(now);voice.gain.gain.setTargetAtTime(0,now,.008);try{voice.source.stop(now+.04);}catch{}}this.voices=[];}
  async emit(x,width,startVisual){
    if(!this.enabled||this.volume===0){startVisual();return;}
    const generation=this.generation;
    let visualStarted=false;
    const launch=()=>{if(visualStarted)return false;visualStarted=true;return startVisual();};
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio){startVisual();return;}
      if(!this.context){this.context=new Audio({latencyHint:'interactive'});this.master=this.context.createGain();this.master.gain.value=this.volume*.17;this.master.connect(this.context.destination);}
      await Promise.all([this.context.state!=='running'?this.context.resume():Promise.resolve(),this.loadBuffer()]);
      if(generation!==this.generation||document.hidden)return;
      // The callback rejects clicks that cannot produce a visual emission.
      if(launch()===false)return;
      while(this.voices.length>=4){const oldest=this.voices.shift();oldest.gain.gain.setTargetAtTime(0,this.context.currentTime,.008);oldest.source.stop(this.context.currentTime+.04);}
      const voice=PageWaveAudio.voice(this.context,this.buffer,PageWaveSignal.panAt(x,width,this.spread),this.master);this.voices.push(voice);
      voice.gain.gain.value=this.sampleGain;
      voice.source.onended=()=>{voice.cleanup();const i=this.voices.indexOf(voice);if(i>=0)this.voices.splice(i,1);};voice.source.start(this.context.currentTime);
    }catch{if(!visualStarted&&generation===this.generation&&!document.hidden)launch();}
  }
}
if(typeof module!=='undefined')module.exports={PageWaveSignal,PageWaveAudio};
