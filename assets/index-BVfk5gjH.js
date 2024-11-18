var _=Object.defineProperty;var O=i=>{throw TypeError(i)};var $=(i,t,e)=>t in i?_(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var n=(i,t,e)=>$(i,typeof t!="symbol"?t+"":t,e),S=(i,t,e)=>t.has(i)||O("Cannot "+e);var o=(i,t,e)=>(S(i,t,"read from private field"),e?e.call(i):t.get(i)),p=(i,t,e)=>t.has(i)?O("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(i):t.set(i,e),k=(i,t,e,r)=>(S(i,t,"write to private field"),r?r.call(i,e):t.set(i,e),e),A=(i,t,e)=>(S(i,t,"access private method"),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const f of a.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function e(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=e(s);fetch(s.href,a)}})();Math.TAU??(Math.TAU=2*Math.PI);function F(i,t,e){return i+(t-i)*e}function B(i,t,e){return Math.max(t,Math.min(i,e))}function z(i,t){return Math.hypot(i.x-t.x,i.y-t.y)}function x(i,t){return i+Math.sign(i)*t}function tt(i,t){return{x:i*Math.cos(t),y:i*Math.sin(t)}}function y(i,t,e){i.fillStyle="green",i.fillRect(t-2/2,e-2/2,2,2)}var L,H;class et{constructor(){p(this,L);n(this,"up",!1);n(this,"down",!1);n(this,"left",!1);n(this,"right",!1);A(this,L,H).call(this)}}L=new WeakSet,H=function(){document.addEventListener("keydown",t=>{switch(t.key){case"ArrowUp":this.up=!0;break;case"ArrowDown":this.down=!0;break;case"ArrowLeft":this.left=!0;break;case"ArrowRight":this.right=!0;break}}),document.addEventListener("keyup",t=>{switch(t.key){case"ArrowUp":this.up=!1;break;case"ArrowDown":this.down=!1;break;case"ArrowLeft":this.left=!1;break;case"ArrowRight":this.right=!1;break}})};const C=3.7,I=.17,W=.03,N=.05,it="ambulance.png";var c,u,K,j,G;class st{constructor(t,e,r,s){p(this,u);n(this,"x");n(this,"y");n(this,"width");n(this,"length");n(this,"img");n(this,"direction",-Math.TAU/4);n(this,"speed",0);p(this,c);this.x=t,this.y=e,this.width=r,this.length=s,k(this,c,new et),this.img=new Image,this.img.src=it}update(){A(this,u,K).call(this),A(this,u,j).call(this),A(this,u,G).call(this)}draw(t){t.save(),t.translate(this.x,this.y),t.rotate(this.direction),this.img?t.drawImage(this.img,-this.length/2,-this.width/2,this.length,this.width):(t.fillStyle="black",t.fillRect(-this.length/2,-this.width/2,this.length*(1-.17),this.width),t.fillStyle="red",t.fillRect(-this.length/2+this.length*(1-.17),-this.width/2,.17*this.length,this.width)),y(t,0,0),y(t,-this.length/2,-this.width/2),y(t,-this.length/2,this.width/2),y(t,this.length/2,-this.width/2),y(t,this.length/2,this.width/2),t.restore()}}c=new WeakMap,u=new WeakSet,K=function(){o(this,c).up&&(this.speed=B(this.speed+I,-C,C)),o(this,c).down&&(this.speed=B(this.speed-I,-C,C)),this.speed=x(this.speed,-N),Math.abs(this.speed)<N&&(this.speed=0)},j=function(){o(this,c).left&&(this.direction-=Math.sign(this.speed)*W),o(this,c).right&&(this.direction+=Math.sign(this.speed)*W)},G=function(){const{x:t,y:e}=tt(this.speed,this.direction);this.x+=t,this.y+=e};const U=10**5,nt=5;class rt{constructor(t,e,r,s){n(this,"x");n(this,"width");n(this,"laneCount");n(this,"margin");n(this,"left",0);n(this,"right",0);n(this,"top",-U/2);n(this,"bottom",U/2);this.x=t,this.width=e,this.laneCount=r,this.margin=s,this.left=t-e/2+s,this.right=t+e/2-s}update(){}getLaneCenter(t){const e=this.width/this.laneCount;return F(this.left,this.right,t/this.laneCount)+e/2}draw(t){t.save(),t.lineWidth=nt,t.strokeStyle="White";for(let e=0;e<=this.laneCount;e++){const r=[0,this.laneCount].includes(e);t.setLineDash(r?[]:[30,60]);const s=F(this.left,this.right,e/this.laneCount);t.beginPath(),t.moveTo(s,this.top),t.lineTo(s,this.bottom),t.stroke(),y(t,s,0)}t.restore()}}const h=new AudioContext,ot=.1;var w,d;class at{constructor(t){n(this,"duration");p(this,w,new OscillatorNode(h,{type:"sawtooth"}));p(this,d,h.createGain());this.duration=t,o(this,w).connect(o(this,d)),o(this,d).connect(h.destination)}setLoudness(t){o(this,d).gain.setValueAtTime(0,h.currentTime),o(this,d).gain.setValueAtTime(t,h.currentTime+ot),o(this,d).gain.setValueAtTime(0,h.currentTime+this.duration)}setFrequency(t){o(this,w).frequency.setValueAtTime(t,h.currentTime)}play(){o(this,w).start(),o(this,w).stop(h.currentTime+this.duration)}}w=new WeakMap,d=new WeakMap;const v=10,ht={nee:700,naw:500},ct={nee:"Red",naw:"Blue"};var l;class dt{constructor(t,e,r,s){n(this,"x");n(this,"y");n(this,"duration");n(this,"frequency");n(this,"color");n(this,"createTime");p(this,l);n(this,"radius",0);n(this,"ripples",[this]);n(this,"heard",!1);this.x=t,this.y=e,this.duration=s,this.frequency=ht[r],this.color=ct[r],this.createTime=Date.now(),k(this,l,new at(s))}update(t){this.ripples.forEach(e=>e.radius+=v),Date.now()-this.createTime<this.duration*1e3&&this.ripples.push({x:t.x,y:t.y,radius:0,heard:!1})}play(){const t=Math.exp(-this.radius/500);o(this,l).setLoudness(t),o(this,l).setFrequency(this.frequency),o(this,l).play()}changeFrequency(t){const e=this.frequency*v/(v-t/50);o(this,l).setFrequency(e)}draw(t){t.strokeStyle=this.color,this.ripples.forEach(({x:e,y:r,radius:s})=>{t.beginPath(),t.arc(e,r,Math.max(s,0),0,Math.TAU),t.stroke()})}}l=new WeakMap;class lt{constructor(t,e){n(this,"x");n(this,"y");this.x=t,this.y=e}update(t){t.forEach(e=>{e.ripples.forEach((r,s,a)=>{if(r.heard)return;const f=z(this,r);if(f<=r.radius)if(r.heard=!0,r===e)e.play();else{const D=z(this,a[s-1]);f-D&&e.changeFrequency(D-f)}})})}draw(t){t.beginPath(),t.font="50px Arial",t.textAlign="center",t.textBaseline="middle",t.fillText("🎙️",this.x,this.y)}}const E=30,P=.5*E,ut=E+2*P,R=17,J=R*ut+2*P,Q=Math.floor((R-1)/2),V=1;document.querySelector("#app").innerHTML=`
	<div id="road">
		<canvas id="road-canvas"></canvas>
	</div>
`;const b=document.querySelector("#road-canvas"),g=b.getContext("2d");Y();const T=new rt(b.width/2,J,R,P),m=new st(T.getLaneCenter(Q),0,E,30*1.7),X=new lt(T.getLaneCenter(Q),-400),M=[];setInterval(()=>{q&&M.push(new dt(m.x,m.y,M.length%2?"nee":"naw",V))},V*1e3);let q=!1;document.addEventListener("click",()=>{q=!q});Z();Object.assign(window,{car:m,road:T});function Y(){b.width=J,b.height=window.innerHeight}function Z(){Y(),ft(),pt(),requestAnimationFrame(Z)}function ft(){T.update(),m.update(),M.forEach(i=>i.update(m)),X.update(M)}function pt(){g.save(),g.translate(0,-m.y+b.height*.8),T.draw(g),X.draw(g),m.draw(g),M.forEach(i=>i.draw(g)),g.restore()}
