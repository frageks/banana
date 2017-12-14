import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';
import config from './config';
import GlobalHolder from './GlobalsHolder';
import DisplayProvider from './DisplayProvider';

const Game = new Phaser.Game(1280, 608, Phaser.CANVAS, 'banana-test', {preload, create, update, render});
const displayProvider = new DisplayProvider(Game);

function preload () {
	Game.load.image('ground', 'assets/bg.jpg');
	Game.load.image('tree', 'assets/tree.png');
	Game.load.spritesheet('playGame', 'assets/start-sprite.png', 140, 35);
	Game.load.image('banana', 'assets/banana.png');
}

function create () {
	Game.physics.startSystem(Phaser.Physics.ARCADE);
	Game.add.sprite(0, 0, 'ground');
	GlobalHolder.startButton = Game.add.button(80, 0, 'playGame', startGame, this, 1, 0, 1);
	GlobalHolder.tree = Game.add.sprite(10, 90, 'tree');
	Game.physics.arcade.enable(GlobalHolder.tree);
	GlobalHolder.group = Game.add.group();
	GlobalHolder.group.enableBody = true;
	displayProvider.displayLevel(GlobalHolder.level);
	displayProvider.displayPoints(GlobalHolder.points);
}

function onClick (item) {
	item.body.moves = false;
	item.body.velocity.y = 0;
}

function onStop (item) {
	if (Game.physics.arcade.overlap(item, GlobalHolder.tree)) {
		item.body.gravity = false;
		setPoints();
	} else {
		item.body.moves = true;
	}
}

function startGame () {
	GlobalHolder.startButton.destroy();
	GlobalHolder.bananasStore = setInterval(setBananas, 1000 * config.accelerationCoeff * 1.8);
	GlobalHolder.intervalAggregator = setInterval(setLevel, config.levelDuration * 1000);
}

function setBananas () {
	const banana = GlobalHolder.group.create(Game.rnd.integerInRange(600, 1200), -50, 'banana');
	banana.body.gravity.y = config.startSpeed;
	banana.inputEnabled = true;
	banana.input.enableDrag(false);
	banana.events.onInputDown.add(onClick, this);
	banana.events.onDragStop.add(onStop, this);
	banana.checkWorldBounds = true;
	banana.events.onOutOfBounds.add(onLeave, this);
}

function setLevel () {
	config.startSpeed *= config.accelerationCoeff;
	GlobalHolder.level++;
	displayProvider.displayLevel(GlobalHolder.level);
}

function onLeave (item) {
	clearInterval(GlobalHolder.bananasStore);
	displayProvider.displayFinishPhrase(GlobalHolder.points);
}

function setPoints () {
	GlobalHolder.points = GlobalHolder.points + Math.ceil(GlobalHolder.level * config.accelerationCoeff);
	displayProvider.displayPoints(GlobalHolder.points);
}

function update () {
}

function render () {
}