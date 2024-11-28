import './style.css';
import './global.ts';
import Road          from './entities/Road.ts';
import Ambulance     from './entities/Ambulance.ts';
import Microphone    from './entities/Microphone.ts';
import { expose }    from './helpers/general.ts';
import ControlPanel  from './util-classes/ControlPanel.ts';

const carRatio  = 1.7;
const carWidth  = 30;
const carLength = carRatio * carWidth;
const carMargin = 0.5 * carWidth;

const laneCount  = 17;
const laneWidth  = carWidth + 2 * carMargin;
const roadLength = 10 ** 5;
const middleLane = Math.floor( ( laneCount - 1 ) / 2 );

// Init. canvas
document.querySelector<HTMLDivElement>( '#app' )!.innerHTML = `
	<div id="controls-panel">
		<h2>Controls</h2>
	</div>
	<div id="road">
		<canvas id="road-canvas"></canvas>
	</div>
`;

const roadCanvas = document.querySelector<HTMLCanvasElement>( '#road-canvas' )!;
const roadCtx    = roadCanvas.getContext( '2d' )!;

// Init. items
const road       = new Road( laneCount, laneWidth, roadLength, carMargin );
const ambulance  = new Ambulance( road.getLaneCenter( middleLane ), 0, carWidth, carLength );
const microphone = new Microphone( road.getLaneCenter( middleLane ), -400 );

expose( {
	road,
	ambulance,
	microphone,
} );

const controlsElement = document.querySelector<HTMLDivElement>( '#controls-panel' )!;
new ControlPanel( controlsElement, [
	{
		name        : 'lanes',
		label       : '# of lanes',
		handler     : ( value: number ) => {
			road.setLaneCount( value );
			const middleLane = Math.floor( ( value - 1 ) / 2 );
			const laneCenter = road.getLaneCenter( middleLane );
			ambulance.x      = microphone.x = laneCenter;
		},
		defaultValue: laneCount,
		maxValue    : 20,
	},
	{
		name        : 'speed',
		label       : 'Max-speed',
		handler     : ( value: number ) => {
			ambulance.setMaxSpeed( value );
		},
		defaultValue: ambulance.maxSpeed,
		maxValue    : 12,
		step        : 0.1,
	},
] );

animate();


function updateCanvasSize(): void {
	roadCanvas.width  = road.width;
	roadCanvas.height = window.innerHeight;
}

function animate(): void {
	updateCanvasSize();
	updateEntities();
	drawEntities();
	requestAnimationFrame( animate );
}

function updateEntities(): void {
	[ road, ambulance ].forEach( entity => entity.update() );
}

function drawEntities(): void {
	roadCtx.save();
	roadCtx.translate( 0, -ambulance.y + roadCanvas.height * 0.8 );

	[ road, microphone, ambulance ].forEach( entity => entity.draw( roadCtx ) );

	roadCtx.restore();
}

