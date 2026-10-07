/* Metres, y up. A finite wall separates source and listener. */
const SpatialSceneModel = (() => {
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const source=[-3,1.25,0], wall={halfLength:1.8,height:2.8,thickness:.26};
  const distance=(a,b)=>Math.hypot(...a.map((v,i)=>v-b[i]));
  const mix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
  const length=points=>points.slice(1).reduce((sum,p,i)=>sum+distance(points[i],p),0);
  function wallMesh(dimensions=wall){
    const a=dimensions.thickness/2,l=dimensions.halfLength,H=dimensions.height;
    const vertices=[[-a,0,-l],[a,0,-l],[a,0,l],[-a,0,l],[-a,H,-l],[a,H,-l],[a,H,l],[-a,H,l]];
    return [
      {indices:[1,5,6,2],normal:[1,0,0]},
      {indices:[0,3,7,4],normal:[-1,0,0]},
      {indices:[4,7,6,5],normal:[0,1,0]},
      {indices:[0,1,2,3],normal:[0,-1,0]},
      {indices:[0,4,5,1],normal:[0,0,-1]},
      {indices:[3,2,6,7],normal:[0,0,1]}
    ].map(face=>{
      const points=face.indices.map(index=>vertices[index]);
      const center=points.reduce((sum,p)=>sum.map((value,i)=>value+p[i]/4),[0,0,0]);
      return {...face,points,center};
    });
  }
  function state(progress,frequency=220) {
    progress=clamp(progress,0,1);frequency=clamp(frequency,125,3000);
    const listener=[3,1.25,-4.8+9.6*progress];
    const middleHit=mix(source,listener,.5), margin=wall.halfLength-Math.abs(middleHit[2]);
    // The reflected ray meets the source-facing surface, not the wall's midplane.
    const surfaceX=-wall.thickness/2;
    const hit=mix(source,listener,(surfaceX-source[0])/(listener[0]-source[0]));
    hit[0]=surfaceX;
    const blocked=margin>=0;
    // Blend near an edge to avoid abrupt filtering while the listener moves.
    const t=clamp((margin+.18)/.36,0,1), occlusion=t*t*(3-2*t);
    const directLength=distance(source,listener);
    // Both lateral routes stay at ear height and follow the wall's outer corners.
    const candidates=[['negative',-1],['positive',1]].map(([edge,side])=>{
      const z=side*wall.halfLength,a=wall.thickness/2;
      const points=[source,[-a,source[1],z],[a,source[1],z],listener];
      return {edge,points,length:length(points)};
    }).sort((a,b)=>a.length-b.length);
    const diffraction=candidates[0], detour=diffraction.length-directLength;
    const incidence=Math.atan2(listener[2]-source[2],listener[0]-source[0]);
    // Reflection reverses the normal (x) component, preserving tangential components.
    const incoming=hit.map((value,i)=>value-source[i]);
    const reflectedEnd=[hit[0]-incoming[0],hit[1]+incoming[1],hit[2]+incoming[2]];
    const reflection={points:[source,hit,reflectedEnd],length:length([source,hit,reflectedEnd])};
    const arrivalPan=origin=>clamp((origin[2]-listener[2])/distance(origin,listener),-1,1);
    const baseGain=3/directLength;
    return {progress,frequency,source,listener,hit,wall,blocked,occlusion,directLength,diffraction,candidates,reflection,
      incidence,wallDistance:blocked?wall.thickness/Math.cos(incidence):0,
      transmitted:{points:[source,listener],length:directLength,gain:baseGain*(1-.88*occlusion),
        cutoff:9000*(1-occlusion)+650*occlusion,pan:arrivalPan(source),delay:directLength/343},
      diffracted:{gain:baseGain*occlusion*.5*Math.exp(-detour*frequency/1700),
        cutoff:clamp(2300/(1+detour),500,2300),pan:arrivalPan(diffraction.points[1]),delay:diffraction.length/343},
      wavelength:343/frequency};
  }
  function pointOnPath(points,fraction) {
    let remaining=length(points)*clamp(fraction,0,1);
    for(let i=1;i<points.length;i++){const d=distance(points[i-1],points[i]);if(remaining<=d)return mix(points[i-1],points[i],d?remaining/d:0);remaining-=d;}
    return points.at(-1);
  }
  return {state,distance,length,mix,pointOnPath,wallMesh};
})();
if(typeof module!=='undefined')module.exports=SpatialSceneModel;
