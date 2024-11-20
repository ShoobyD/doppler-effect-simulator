import './style.css';
import './js/global.ts';
import Ambulance  from './js/entities/Ambulance.ts';
import Road       from './js/entities/Road.ts';
import SoundWave  from './js/entities/SoundWave.ts';
import Microphone from './js/entities/Microphone.ts';

const carRatio      = 1.7;
const carWidth      = 30;
const carLength     = carRatio * carWidth;
const carMargin     = 0.5 * carWidth;

const laneWidth     = carWidth + 2 * carMargin;
const laneCount     = 17;
const roadWidth     = laneCount * laneWidth + 2 * carMargin;
const roadLength    = 10 ** 5;
const carLane       = Math.floor( ( laneCount - 1 ) / 2 );

const soundDuration = 1; // in seconds

// Init. canvas
document.querySelector<HTMLDivElement>( '#app' )!.innerHTML = `
	<div id="road">
		<canvas id="road-canvas"></canvas>
	</div>
`;

const roadCanvas = document.querySelector<HTMLCanvasElement>( '#road-canvas' )!;
const roadCtx    = roadCanvas.getContext( '2d' )!;
updateCanvasSize();

// Init. items
const road       = new Road( roadCanvas.width / 2, roadWidth, roadLength, laneCount, carMargin );
const ambulance  = new Ambulance( road.getLaneCenter( carLane ), 0, carWidth, carLength );
const microphone = new Microphone( road.getLaneCenter( carLane ), -400 );

const soundWaves: SoundWave[] = [];
setInterval( () => {
	if ( sirenOn ) {
		soundWaves.push( new SoundWave( ambulance.x, ambulance.y, soundWaves.length % 2? 'nee': 'naw', soundDuration ) );
	}
}, soundDuration * 1000 );

let sirenOn = false;
document.addEventListener( 'click', () => {
	sirenOn = !sirenOn;
} );

animate();


// Export
Object.assign( window, {
	ambulance,
	road,
} );


function updateCanvasSize(): void {
	roadCanvas.width  = roadWidth;
	roadCanvas.height = window.innerHeight;
}

function animate(): void {
	updateCanvasSize();
	updateEntities();
	drawEntities();
	requestAnimationFrame( animate );
}

function updateEntities(): void {
	road.update();
	ambulance.update();
	soundWaves.forEach( soundWave => soundWave.update( ambulance.x, ambulance.y ) );
	microphone.update( soundWaves );
}

function drawEntities(): void {
	roadCtx.save();
	roadCtx.translate( 0, -ambulance.y + roadCanvas.height * 0.8 );

	road.draw( roadCtx );
	microphone.draw( roadCtx );
	ambulance.draw( roadCtx );
	soundWaves.forEach( soundWave => soundWave.draw( roadCtx ) );

	roadCtx.restore();
}

