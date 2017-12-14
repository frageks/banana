export default class DisplayProvider {

	constructor (Game) {
		this.game = Game;
		this.levelText = '';
		this.finishPhrase = '';
		this.points = '';
	}

	displayLevel (level) {
		if (this.levelText !== '') {
			this.levelText.destroy();
		}
		let style = { font: 'bold 15pt Arial', fill: 'red', align: 'right', wordWrap: true, wordWrapWidth: 450 };
		this.levelText = this.game.add.text(1230, 15, `level: ${level}`, style);
		this.levelText.anchor.set(0.5);
	}

	displayFinishPhrase (points) {
		let style = { font: 'bold 60pt Arial', fill: 'white', align: 'center', wordWrap: true, wordWrapWidth: 450 };
		this.finishPhrase = this.game.add.text(this.game.world.centerX, this.game.world.centerY,
					`${points} points - NICE RESULT!!!`, style);
		this.finishPhrase.anchor.set(0.5);
	}

	displayPoints (points) {
		if (this.points !== '') {
			this.points.destroy();
		}
		let style = { font: 'bold 15pt Arial', fill: 'red', align: 'right', wordWrap: true, wordWrapWidth: 450 };
		this.points = this.game.add.text(1230, 35, `points: ${points}`, style);
		this.points.anchor.set(0.5);
	}
}