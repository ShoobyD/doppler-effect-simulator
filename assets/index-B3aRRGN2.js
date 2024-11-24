var nt=Object.defineProperty;var U=i=>{throw TypeError(i)};var rt=(i,t,e)=>t in i?nt(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var r=(i,t,e)=>rt(i,typeof t!="symbol"?t+"":t,e),F=(i,t,e)=>t.has(i)||U("Cannot "+e);var a=(i,t,e)=>(F(i,t,"read from private field"),e?e.call(i):t.get(i)),h=(i,t,e)=>t.has(i)?U("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(i):t.set(i,e),c=(i,t,e,s)=>(F(i,t,"write to private field"),s?s.call(i,e):t.set(i,e),e),l=(i,t,e)=>(F(i,t,"access private method"),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const L of o.addedNodes)L.tagName==="LINK"&&L.rel==="modulepreload"&&s(L)}).observe(document,{childList:!0,subtree:!0});function e(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=e(n);fetch(n.href,o)}})();var d;class at{constructor(){h(this,d,{})}on(t,e){var s;return(s=a(this,d))[t]??(s[t]=[]),a(this,d)[t].push(e),this}off(t,e){const s=a(this,d)[t];return a(this,d)[t]=e?s==null?void 0:s.filter(n=>n!==e):[],this}emit(t,...e){var s;return(s=a(this,d)[t])==null||s.forEach(n=>setTimeout(()=>n(...e))),this}destroy(){return c(this,d,{}),this}}d=new WeakMap;Math.TAU??(Math.TAU=2*Math.PI);window.eventBus=new at;function M(i,t,e){i.fillStyle="green",i.fillRect(t-2/2,e-2/2,2,2)}function V(i,t,e){return i+(t-i)*e}function D(i,t,e){return Math.max(t,Math.min(i,e))}function $(i,t){return Math.hypot(i.x-t.x,i.y-t.y)}function ot(i,t){return i+Math.sign(i)*t}function ht(i,t){return{x:i*Math.cos(t),y:i*Math.sin(t)}}function lt(i,t,e){return i*e/(e-t)}const dt=5;class ut{constructor(t,e,s,n){r(this,"laneCount");r(this,"laneWidth");r(this,"length");r(this,"margin");r(this,"width",0);r(this,"left",0);r(this,"right",0);r(this,"top",0);r(this,"bottom",0);this.laneCount=t,this.laneWidth=e,this.length=s,this.margin=n,this.updateSize()}update(){}setLaneCount(t){this.laneCount=t,this.updateSize()}updateSize(){this.width=this.laneCount*this.laneWidth+2*this.margin,this.left=this.margin,this.right=this.width-this.margin,this.top=-this.length/2,this.bottom=this.length/2}getLaneCenter(t){const e=(this.width-2*this.margin)/this.laneCount;return V(this.left,this.right,t/this.laneCount)+e/2}draw(t){t.save(),t.lineWidth=dt,t.strokeStyle="White";for(let e=0;e<=this.laneCount;e++){const s=[0,this.laneCount].includes(e);t.setLineDash(s?[]:[30,60]);const n=V(this.left,this.right,e/this.laneCount);t.beginPath(),t.moveTo(n,this.top),t.lineTo(n,this.bottom),t.stroke(),M(t,n,0)}t.restore()}}var k,j;class ct{constructor(){h(this,k);r(this,"up",!1);r(this,"down",!1);r(this,"left",!1);r(this,"right",!1);l(this,k,j).call(this)}}k=new WeakSet,j=function(){document.addEventListener("keydown",t=>{switch(t.key){case"ArrowUp":this.up=!0;break;case"ArrowDown":this.down=!0;break;case"ArrowLeft":this.left=!0;break;case"ArrowRight":this.right=!0;break}}),document.addEventListener("keyup",t=>{switch(t.key){case"ArrowUp":this.up=!1;break;case"ArrowDown":this.down=!1;break;case"ArrowLeft":this.left=!1;break;case"ArrowRight":this.right=!1;break}})};const pt=3.7,H=.17,I=.03,K=.05;var S,f,y,G,J,Q;class ft{constructor(t,e,s,n,o){h(this,y);r(this,"x");r(this,"y");r(this,"width");r(this,"length");r(this,"direction",-Math.TAU/4);r(this,"speed",0);r(this,"maxSpeed",pt);h(this,S);h(this,f);this.x=t,this.y=e,this.width=s,this.length=n,c(this,f,new ct),o&&(c(this,S,new Image),a(this,S).src=o)}setMaxSpeed(t){this.maxSpeed=t}update(){l(this,y,G).call(this),l(this,y,J).call(this),l(this,y,Q).call(this)}draw(t){t.save(),t.translate(this.x,this.y),t.rotate(this.direction),a(this,S)?t.drawImage(a(this,S),-this.length/2,-this.width/2,this.length,this.width):(t.fillStyle="black",t.fillRect(-this.length/2,-this.width/2,this.length*(1-.17),this.width),t.fillStyle="red",t.fillRect(-this.length/2+this.length*(1-.17),-this.width/2,.17*this.length,this.width)),M(t,0,0),M(t,-this.length/2,-this.width/2),M(t,-this.length/2,this.width/2),M(t,this.length/2,-this.width/2),M(t,this.length/2,this.width/2),t.restore()}}S=new WeakMap,f=new WeakMap,y=new WeakSet,G=function(){a(this,f).up&&(this.speed=D(this.speed+H,-this.maxSpeed,this.maxSpeed)),a(this,f).down&&(this.speed=D(this.speed-H,-this.maxSpeed,this.maxSpeed)),this.speed=ot(this.speed,-K),Math.abs(this.speed)<K&&(this.speed=0)},J=function(){a(this,f).left&&(this.direction-=Math.sign(this.speed)*I),a(this,f).right&&(this.direction+=Math.sign(this.speed)*I)},Q=function(){const{x:t,y:e}=ht(this.speed,this.direction);this.x+=t,this.y+=e};const p=new AudioContext,mt=.1;var v,m;class gt{constructor(t){r(this,"duration");h(this,v,new OscillatorNode(p,{type:"sawtooth"}));h(this,m,p.createGain());this.duration=t,a(this,v).connect(a(this,m)),a(this,m).connect(p.destination)}setLoudness(t){a(this,m).gain.setValueAtTime(0,p.currentTime),a(this,m).gain.setValueAtTime(t,p.currentTime+mt),a(this,m).gain.setValueAtTime(0,p.currentTime+this.duration)}setFrequency(t){a(this,v).frequency.setValueAtTime(t,p.currentTime)}play(){a(this,v).start(),a(this,v).stop(p.currentTime+this.duration)}}v=new WeakMap,m=new WeakMap;const N=10,X=5e3,wt=.02,yt=-X/Math.log(wt);var E,g;class St{constructor(t,e,s,n,o){r(this,"x");r(this,"y");r(this,"frequency");r(this,"color");r(this,"duration");h(this,E);h(this,g);r(this,"radius",0);r(this,"ripples",[this]);r(this,"heard",!1);r(this,"finished",!1);this.x=t,this.y=e,this.duration=o,this.frequency=s,this.color=n,c(this,E,Date.now()),c(this,g,new gt(o/1e3))}get loudness(){return Math.exp(-this.radius/yt)}update(t,e){this.ripples.forEach(s=>s.radius+=N),Date.now()-a(this,E)<this.duration?(this.ripples.push({x:t,y:e,radius:0,heard:!1}),this.finished=!1):this.finished||(this.finished=this.ripples.every(s=>s.heard)),this.finished||window.eventBus.emit("soundUpdate",this)}play(){a(this,g).setLoudness(this.loudness),a(this,g).setFrequency(this.frequency),a(this,g).play()}changeFrequency(t){const e=lt(this.frequency,t,N);a(this,g).setFrequency(e)}draw(t){this.radius>X||(t.globalAlpha=this.loudness,t.strokeStyle=this.color,this.ripples.forEach(({x:e,y:s,radius:n})=>{t.beginPath(),t.arc(e,s,Math.max(n,0),0,Math.TAU),t.stroke()}))}}E=new WeakMap,g=new WeakMap;const vt={nee:700,naw:500},bt={nee:"Red",naw:"Blue"};var b,A,P,Y;class Ct{constructor(t=1e3){h(this,P);r(this,"interval");r(this,"playing",!1);h(this,b,[]);h(this,A,0);this.interval=t}togglePlay(t=!this.playing){this.playing=t}update(t,e){a(this,b).forEach(s=>s.update(t,e)),l(this,P,Y).call(this,t,e)}draw(t){a(this,b).forEach(e=>e.draw(t))}}b=new WeakMap,A=new WeakMap,P=new WeakSet,Y=function(t,e){if(this.playing&&Date.now()-a(this,A)>this.interval){const s=a(this,b).length%2?"nee":"naw",n=vt[s],o=bt[s];a(this,b).push(new St(t,e,n,o,this.interval)),c(this,A,Date.now())}};const Lt=""+new URL("ambulance-CEqcCkv5.png",import.meta.url).href;var C,R,Z;class Mt extends ft{constructor(e,s,n,o){super(e,s,n,o,Lt);h(this,R);h(this,C);c(this,C,new Ct),l(this,R,Z).call(this)}update(){super.update(),a(this,C).update(this.x,this.y)}draw(e){super.draw(e),a(this,C).draw(e)}}C=new WeakMap,R=new WeakSet,Z=function(){document.addEventListener("keypress",e=>{e.key===" "&&a(this,C).togglePlay()})};var x,_;class Et{constructor(t,e){h(this,x);r(this,"x");r(this,"y");this.x=t,this.y=e,l(this,x,_).call(this)}draw(t){t.beginPath(),t.font="50px Arial",t.textAlign="center",t.textBaseline="middle",t.fillText("🎙️",this.x,this.y)}}x=new WeakSet,_=function(){window.eventBus.on("soundUpdate",t=>{t.ripples.forEach((e,s,n)=>{if(e.heard)return;const o=$(this,e);if(o<=e.radius)if(e.heard=!0,e===t)t.play();else{const L=$(this,n[s-1]);o-L&&t.changeFrequency((L-o)/42)}})})};function At(i=""){const t=document.createElement("template");return t.innerHTML=i.trim(),t.content.firstChild}var B,tt;class Tt{constructor(t,e){h(this,B);r(this,"wrapper");r(this,"controlsData");this.wrapper=t,this.controlsData=e,e.forEach(l(this,B,tt).bind(this))}}B=new WeakSet,tt=function(t){const e=At(`
			<label id="${t.name}">
				<div class="label">${t.label} (<output></output>)</div>
				<input type="range" min="${t.min||1}" max="${t.max||10}" step="${t.step||1}">
			</label>
		`);this.wrapper.append(e);const s=e.querySelector("input"),n=e.querySelector("output");s.addEventListener("input",()=>{n.value=s.value,t.handler(+s.value)}),s.value=t.defaultValue.toString(),setTimeout(()=>s.dispatchEvent(new Event("input")))};const qt=1.7,W=30,kt=qt*W,et=.5*W,O=17,Pt=W+2*et,Rt=10**5,it=Math.floor((O-1)/2);document.querySelector("#app").innerHTML=`
	<div id="controls-panel">
		<h2>Controls</h2>
	</div>
	<div id="road">
		<canvas id="road-canvas"></canvas>
	</div>
`;const q=document.querySelector("#road-canvas"),T=q.getContext("2d"),u=new ut(O,Pt,Rt,et),w=new Mt(u.getLaneCenter(it),0,W,kt),z=new Et(u.getLaneCenter(it),-400),xt=document.querySelector("#controls-panel");new Tt(xt,[{name:"lanes",label:"# of lanes",handler:i=>{u.setLaneCount(i);const t=Math.floor((i-1)/2),e=u.getLaneCenter(t);w.x=z.x=e},defaultValue:O,max:20},{name:"speed",label:"Max-speed",handler:i=>{w.setMaxSpeed(i)},defaultValue:w.maxSpeed,max:12,step:.1}]);st();Object.assign(window,{road:u,ambulance:w,microphone:z});console.log({road:u,ambulance:w,microphone:z});function Bt(){q.width=u.width,q.height=window.innerHeight}function st(){Bt(),Wt(),zt(),requestAnimationFrame(st)}function Wt(){[u,w].forEach(i=>i.update())}function zt(){T.save(),T.translate(0,-w.y+q.height*.8),[u,z,w].forEach(i=>i.draw(T)),T.restore()}
