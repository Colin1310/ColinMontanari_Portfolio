/* Educational models in relative units; no dependency on the page or renderer. */
const SoundLabPhysics = (() => {
  const speed = 343; // m/s, air at approximately 20 °C.
  const wavelength = frequency => speed / frequency;
  const intensity = amplitude => amplitude * amplitude;
  const relativeDb = (amplitude, reference = .5) => 20 * Math.log10(amplitude / reference);
  const interference = phaseDegrees => 2 * Math.abs(Math.cos(phaseDegrees * Math.PI / 360));
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
    setAperture(ratio) {
      this.ratio = Math.max(.4, Math.min(3, ratio));
      this.gap = this.ratio * this.lambda;
      this.solid.fill(0);
      for (let y = 1; y < this.ny - 1; y++) {
        if (Math.abs(y - (this.ny - 1) / 2) > this.gap / 2)
          for (let x = this.wall - 1; x <= this.wall + 1; x++) this.solid[y * this.nx + x] = 1;
      }
      this.clear();
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
  return {speed, wavelength, intensity, relativeDb, interference, reflect, ApertureField};
})();
if (typeof module !== 'undefined') module.exports = SoundLabPhysics;
