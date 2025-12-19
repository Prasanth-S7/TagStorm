import { Boot } from './scenes/Boot';
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';
import { OfficeMap } from './scenes/maps/house-map';

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    scene: [
        Boot,
        Preloader,
        OfficeMap
    ]
};

const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent });

}

export default StartGame;
