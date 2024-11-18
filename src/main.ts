import './style.css';
import './js/global.ts';
import Car        from './js/entities/Car.ts';
import Road       from './js/entities/Road.ts';
import SoundWave  from './js/entities/SoundWave.ts';
import Microphone from './js/entities/Microphone.ts';

const carWidth      = 30;
const carMargin     = 0.5 * carWidth;
const laneWidth     = carWidth + 2 * carMargin;
const laneCount     = 17;
const roadWidth     = laneCount * laneWidth + 2 * carMargin;
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
const road       = new Road( roadCanvas.width / 2, roadWidth, laneCount, carMargin );
const car        = new Car( road.getLaneCenter( carLane ), 0, carWidth, 30 * 1.7 );
const microphone = new Microphone( road.getLaneCenter( carLane ), -400 );

const soundWaves: SoundWave[] = [];
setInterval( () => {
	if ( sirenOn ) {
		soundWaves.push( new SoundWave( car.x, car.y, soundWaves.length % 2? 'nee': 'naw', soundDuration ) );
	}
}, soundDuration * 1000 );

let sirenOn = false;
document.addEventListener( 'click', () => {
	sirenOn = !sirenOn;
} );

animate();


// Export
Object.assign( window, {
	car,
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
	car.update();
	soundWaves.forEach( soundWave => soundWave.update( car ) );
	microphone.update( soundWaves );
}

function drawEntities(): void {
	roadCtx.save();
	roadCtx.translate( 0, -car.y + roadCanvas.height * 0.8 );

	road.draw( roadCtx );
	microphone.draw( roadCtx );
	car.draw( roadCtx );
	soundWaves.forEach( soundWave => soundWave.draw( roadCtx ) );

	roadCtx.restore();
}

