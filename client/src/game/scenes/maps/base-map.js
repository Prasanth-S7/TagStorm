import { EventBus } from "../../EventBus";
import { Scene } from "phaser";
import { characters } from "../../../common/common";

/**
 * BaseMap — shared base class for all map scenes.
 *
 * Supports two map formats transparently:
 *  - 'tiled'        : standard Tiled Editor JSON  → loaded with this.load.tilemapTiledJSON
 *  - 'spritefusion' : SpriteFusion JSON            → loaded with this.load.json, then
 *                     converted to a Tiled-compatible structure at runtime in create()
 *                     using the already-loaded texture dimensions, and injected into
 *                     Phaser's tilemap cache so the rest of the pipeline is identical.
 *
 * To add a new map: add an entry to maps[] in common.js + a 3-line Scene class.
 */
export class BaseMap extends Scene {
    constructor(mapConfig) {
        super(mapConfig.sceneKey);
        this.mapConfig = mapConfig;
    }

    preload() {
        const { tilemapKey, tilemapJson, tilesetKey, tilesetImage, tilesets, format } = this.mapConfig;

        // Load the tileset image (same for both formats)
        if (tilesets) {
            tilesets.forEach(ts => this.load.image(ts.key, ts.image));
        } else if (tilesetKey && tilesetImage) {
            this.load.image(tilesetKey, tilesetImage);
        }

        // SpriteFusion → generic JSON cache; Tiled → tilemap cache
        if (format === 'spritefusion') {
            this.load.json(tilemapKey, tilemapJson);
        } else {
            this.load.tilemapTiledJSON(tilemapKey, tilemapJson);
        }

        // Load avatar
        const selectedCharacter = window.localStorage.getItem('character');
        const character = characters.find(c => c.charName === selectedCharacter) ?? characters[0];
        this.load.image('avatar', character.charImg);
    }

    create() {
        const { tilemapKey, tilesetKey, tilesets, bgLayer, collisionLayer, layers, spawnX, spawnY } = this.mapConfig;

        const map = this.make.tilemap({ key: tilemapKey });

        let loadedTilesets = [];
        if (tilesets) {
            loadedTilesets = tilesets.map(ts => map.addTilesetImage(ts.name, ts.key));
        } else {
            // handle the single tileset backward compatibility
            loadedTilesets = [map.addTilesetImage(map.tilesets[0].name, tilesetKey)];
        }

        let colliders = [];

        if (layers) {
            layers.forEach(layerConfig => {
                const layer = map.createLayer(layerConfig.name, loadedTilesets);
                // Ensure layer is actually created before applying collision
                if (layer && layerConfig.collides) {
                    layer.setCollisionByExclusion([-1]);
                    colliders.push(layer);
                }
            });
        } else {
            map.createLayer(bgLayer, loadedTilesets);
            const collider = map.createLayer(collisionLayer, loadedTilesets);
            collider.setCollisionByProperty({ collides: true });
            colliders.push(collider);
        }

        this.player = this.physics.add.sprite(spawnX, spawnY, 'avatar');

        colliders.forEach(collider => {
            this.physics.add.collider(this.player, collider);
        });

        this.cameras.main.startFollow(this.player);

        EventBus.emit('current-scene-ready', this);
    }
    update() {
        // Cache the Keys object so we don't re-create it every frame
        if (!this._keys) {
            this._keys = this.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D,
            });
        }

        const { up, down, left, right } = this._keys;
        const speed = 175;

        this.player.setVelocity(0);
        if (left.isDown) this.player.setVelocityX(-speed);
        else if (right.isDown) this.player.setVelocityX(speed);
        if (up.isDown) this.player.setVelocityY(-speed);
        else if (down.isDown) this.player.setVelocityY(speed);
    }
}
