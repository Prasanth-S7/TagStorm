import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        // this.load.image('background', 'assets/tiles/house-tiles.png');
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
