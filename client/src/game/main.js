import Phaser from 'phaser';
import { BasicMap } from './scenes/maps/basic-map';
import { OfficeMap } from './scenes/maps/house-map';

// All registered map scenes.
// To add a new map: import its Scene class and add it to this array.
const ALL_SCENES = [BasicMap, OfficeMap];

/**
 * Starts the Phaser game with the selected map scene first.
 * @param {string} parent   – DOM element ID to mount into
 * @param {string} sceneKey – Scene key of the map to launch (matches maps[].sceneKey)
 */
const StartGame = (parent, sceneKey) => {
    // Put the selected scene first so Phaser auto-starts it
    const selectedIdx = sceneKey
        ? ALL_SCENES.findIndex(S => S.SCENE_KEY === sceneKey)
        : 0;

    const orderedScenes = selectedIdx > 0
        ? [ALL_SCENES[selectedIdx], ...ALL_SCENES.filter((_, i) => i !== selectedIdx)]
        : ALL_SCENES;

    const config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        parent,
        scene: orderedScenes,
        pixelArt: true,
        physics: { default: 'arcade' },
    };

    return new Phaser.Game(config);
};

export default StartGame;
