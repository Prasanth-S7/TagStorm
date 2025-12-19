import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
    }

    preload ()
    {
        this.load.image('house-tiles', 'assets/tiles/house-tiles.png');
        this.load.tilemapTiledJSON('house', 'assets/maps/house.json');
    }

    create ()
    {
        this.scene.start('OfficeMap');
    }
}
