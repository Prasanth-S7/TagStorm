import { EventBus } from "../../EventBus";
import { Scene } from "phaser";

export class OfficeMap extends Scene{
    constructor(){
        super('OfficeMap');
    }

    preload(){
        this.load.tile
    }

    create() {
    const map = this.make.tilemap({ key: 'office' });
    const tileset = map.addTilesetImage('your-tileset-name', 'office-tiles');
    
    const ground = map.createLayer('grass', tileset);
    const walls = map.createLayer('walls', tileset);
    
    walls.setCollisionByProperty({ collides: true });
    
    this.physics.add.collider(this.player, walls);
    }
}