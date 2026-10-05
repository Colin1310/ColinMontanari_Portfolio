/* Rules shared by the interface, the audio generator and the tests. */
const ListeningGames = (() => {
  const minimum = 20, maximum = 15000, rounds = 5;
  const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
  const frequencyAt = position => Math.round(minimum * (maximum / minimum) ** clamp(position,0,1));
  const frequencyPosition = frequency => Math.log(clamp(frequency,minimum,maximum)/minimum)/Math.log(maximum/minimum);
  const pitchError = (guess, target) => 1200 * Math.log2(guess / target);
  const sourcePosition = angle => ({x:3*Math.sin(angle*Math.PI/180), y:0, z:-3*Math.cos(angle*Math.PI/180)});
  const normalizeHarmonics = values => {
    const norm = Math.hypot(...values) || 1;
    return values.map(value => value/norm);
  };
  function seededRandom(seed) {
    let state = seed >>> 0;
    return () => {
      state += 0x6D2B79F5;
      let n = state; n = Math.imul(n ^ n >>> 15, n | 1);
      n ^= n + Math.imul(n ^ n >>> 7, n | 61);
      return ((n ^ n >>> 14) >>> 0) / 4294967296;
    };
  }
  function generate(type, random = Math.random) {
    if(type === 'frequency') return {frequency:frequencyAt(random())};
    if(type === 'location') return {angle:Math.round((random()*140-70)/5)*5, seed:Math.floor(random()*4294967295)};
    const fundamental = [110,165,220,330][Math.min(3,Math.floor(random()*4))];
    const amplitudes = [1,...Array.from({length:5},()=>Math.floor(random()*4)/4)];
    if(amplitudes.slice(1).every(value=>value===0))amplitudes[1]=.5;
    return {fundamental,amplitudes};
  }
  function valid(type, guess) {
    if(type==='frequency')return Number.isFinite(guess.frequency) && guess.frequency>=minimum && guess.frequency<=maximum;
    if(type==='location')return Number.isFinite(guess.angle) && guess.angle>=-75 && guess.angle<=75;
    return Array.isArray(guess.amplitudes) && guess.amplitudes.length===6 && guess.amplitudes[0]===1 && guess.amplitudes.every(value=>Number.isFinite(value)&&value>=0&&value<=1);
  }
  function grade(type,guess,target,hinted=false) {
    let error, raw;
    if(type==='frequency'){error=pitchError(guess.frequency,target.frequency);raw=100*Math.exp(-Math.abs(error)/600);}
    else if(type==='location'){error=guess.angle-target.angle;raw=100*Math.exp(-Math.abs(error)/25);}
    else {
      error=guess.amplitudes.slice(1).reduce((sum,value,index)=>sum+Math.abs(value-target.amplitudes[index+1]),0)/5;
      const rms=Math.sqrt(guess.amplitudes.slice(1).reduce((sum,value,index)=>sum+(value-target.amplitudes[index+1])**2,0)/5);
      raw=100*Math.exp(-3*rms);
    }
    return {score:Math.max(0,Math.round(raw)-(hinted?20:0)),error,hinted};
  }
  function hint(type,target) {
    if(type==='frequency') {
      const bounds = [[20,60],[60,250],[250,1000],[1000,4000],[4000,15000]];
      return bounds.find(([,high])=>target.frequency<=high);
    }
    if(type==='location')return target.angle < -5?'left':target.angle > 5?'right':'centre';
    const largest=Math.max(...target.amplitudes.slice(1));
    return target.amplitudes.findIndex((value,index)=>index>0&&value===largest)+1;
  }
  class Session {
    constructor(type,random=Math.random) {
      this.type=type;this.random=random;this.records=[];this.total=0;this.phase='guess';this.heard=false;this.hinted=false;this.target=generate(type,random);
    }
    submit(guess) {
      if(this.phase!=='guess')return {ok:false,reason:'alreadyAnswered'};
      if(!this.heard)return {ok:false,reason:'listenFirst'};
      if(!valid(this.type,guess))return {ok:false,reason:'invalid'};
      const result=grade(this.type,guess,this.target,this.hinted);
      const record={...result,target:structuredClone(this.target),guess:structuredClone(guess)};
      this.records.push(record);this.total+=result.score;this.phase=this.records.length===rounds?'complete':'result';
      return {ok:true,record};
    }
    next() {
      if(this.phase!=='result')return false;
      this.target=generate(this.type,this.random);this.heard=false;this.hinted=false;this.phase='guess';return true;
    }
    replace() {
      if(this.phase!=='guess')return false;
      this.target=generate(this.type,this.random);this.heard=false;this.hinted=false;return true;
    }
  }
  return {minimum,maximum,rounds,clamp,frequencyAt,frequencyPosition,pitchError,sourcePosition,normalizeHarmonics,seededRandom,generate,valid,grade,hint,Session};
})();
if(typeof module!=='undefined')module.exports=ListeningGames;
