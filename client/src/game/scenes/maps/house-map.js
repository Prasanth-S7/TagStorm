import { EventBus } from "../../EventBus";
import { Scene } from "phaser";

export class OfficeMap extends Scene{
    constructor(){
        super('OfficeMap');
    }

    preload(){
        // Assets for this scene are loaded in the Preloader scene
    }

    create(){
        const map = this.make.tilemap({key: "house"});
        console.log(map.tilesets[0].name);
        const tileset = map.addTilesetImage(map.tilesets[0].name, 'house-tiles');

        map.createLayer('grass', tileset);
        const walls = map.createLayer('walls', tileset);
        walls.setCollisionByProperty({collides: true})


        EventBus.emit('current-scene-ready', this);

    }
}