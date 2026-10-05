/* Educational models in relative units; no dependency on the page or renderer. */
const SoundLabPhysics = (() => {
  const speed = 343; // m/s, air at approximately 20 °C.
  const wavelength = frequency => speed / frequency;
  const intensity = amplitude => amplitude * amplitude;
  const relativeDb = (amplitude, reference = .5) => 20 * Math.log10(amplitude / reference);
  const interference = (phaseDegrees, ratio = 1) => Math.hypot(1 + ratio * Math.cos(phaseDegrees * Math.PI / 180), ratio * Math.sin(phaseDegrees * Math.PI / 180));
  const clamp = (v,min,max) => Math.max(min,Math.min(max,v));
  const wrap = v => ((v % 360) + 360) % 360;
  // Pointer gestures use the same physical parameters as the accessible sliders.
  function gesture(kind, point, origin, geometry) {
    if (kind === 'wavelength') return {frequency: Math.round(clamp(speed * geometry.w / (4 * Math.max(1,point.x-geometry.x)),100,1000)/10)*10};
    if (kind === 'amplitude') return {amplitude: clamp(Math.round(100*(geometry.y-point.y)/geometry.h),5,100)};
    if (kind === 'waveB') {
      let phase=Math.round(wrap(origin.phase - 720*(point.x-origin.x)/geometry.w)) % 360;
      const landmark=[0,90,180,270,360].find(value=>Math.abs(value-phase)<=2);
      if(landmark!==undefined)phase=landmark%360;
      return {phase,amplitudeB:clamp(Math.round(100*(geometry.y-point.y)/geometry.h),0,100)};
    }
    if (kind === 'source') return {angle: clamp(Math.round(Math.atan2(Math.max(0,point.y-geometry.cy),Math.max(1,geometry.wx-point.x))*180/Math.PI),10,65)};
    if (kind === 'apertureTop' || kind === 'apertureBottom') return {aperture: Math.round(clamp(2*Math.abs(point.y-geometry.cy)/(geometry.scale*14),.4,3)*10)/10};
    if (kind === 'probe') return {
      probeX: clamp(Math.round((point.x-geometry.x)/geometry.w*100),10,90),
      probeY: clamp(Math.round((point.y-geometry.y)/geometry.h*100),10,90)
    };
    return {};
  }
  const reflect = (vx, vy, nx, ny) => {
    const dot = vx * nx + vy * ny;
    return {x: vx - 2 * dot * nx, y: vy - 2 * dot * ny};
  };
  class ApertureField {
    constructor(nx = 176, ny = 104) {
      this.nx = nx; this.ny = ny; this.lambda = 14;
      this.p = new Float32Array(nx * ny);
      this.old = new Float32Array(nx * ny);
      this.next = new Float32Array(nx * ny);
      this.solid = new Uint8Array(nx * ny);
      this.damping = new Float32Array(nx * ny);
      this.wall = Math.round(nx * .46);
      for (let y = 0; y < ny; y++) for (let x = 0; x < nx; x++) {
        const edge = Math.max(0, 1 - Math.min(x, y, nx - 1 - x, ny - 1 - y) / 12);
        this.damping[y * nx + x] = .001 + edge * edge * .28;
      }
      this.setAperture(1);
    }
    setAperture(ratio, preserve = false) {
      this.ratio = Math.max(.4, Math.min(3, ratio));
      this.gap = this.ratio * this.lambda;
      this.solid.fill(0);
      for (let y = 1; y < this.ny - 1; y++) {
        if (Math.abs(y - (this.ny - 1) / 2) > this.gap / 2)
          for (let x = this.wall - 1; x <= this.wall + 1; x++) this.solid[y * this.nx + x] = 1;
      }
      if (preserve) {
        for (let i=0;i<this.p.length;i++) if(this.solid[i]) this.p[i]=this.old[i]=this.next[i]=0;
      } else this.clear();
    }
    sample(x,y) {
      const gx=clamp(x,0,1)*(this.nx-1),gy=clamp(y,0,1)*(this.ny-1);
      const x0=Math.min(this.nx-2,Math.floor(gx)),y0=Math.min(this.ny-2,Math.floor(gy)),fx=gx-x0,fy=gy-y0,i=y0*this.nx+x0;
      return (this.p[i]*(1-fx)+this.p[i+1]*fx)*(1-fy)+(this.p[i+this.nx]*(1-fx)+this.p[i+this.nx+1]*fx)*fy;
    }
    clear() { this.p.fill(0); this.old.fill(0); this.next.fill(0); this.phase = 0; }
    step() {
      const {nx, ny, p, old, next, solid, damping} = this;
      for (let y = 1; y < ny - 1; y++) for (let x = 1, i = y * nx + 1; x < nx - 1; x++, i++) {
        if (solid[i]) { next[i] = 0; continue; }
        const v = p[i];
        const lap = (solid[i - 1] ? v : p[i - 1]) + (solid[i + 1] ? v : p[i + 1])
          + (solid[i - nx] ? v : p[i - nx]) + (solid[i + nx] ? v : p[i + nx]) - 4 * v;
        next[i] = (2 - damping[i]) * v - (1 - damping[i]) * old[i] + .21 * lap;
      }
      this.phase = (this.phase + 2 * Math.PI * Math.sqrt(.21) / this.lambda) % (2 * Math.PI);
      // A broad line source launches an approximately plane incident wave.
      for (let y = 2; y < ny - 2; y++) {
        const taper = Math.min(1, y / 13, (ny - 1 - y) / 13);
        next[y * nx + 16] += Math.sin(this.phase) * .016 * taper * taper;
      }
      this.old = p; this.p = next; this.next = old;
    }
  }
  return {speed, wavelength, intensity, relativeDb, interference, reflect, gesture, ApertureField};
})();
if (typeof module !== 'undefined') module.exports = SoundLabPhysics;
