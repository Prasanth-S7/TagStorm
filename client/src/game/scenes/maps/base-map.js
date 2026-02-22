import { EventBus } from "../../EventBus";
import { Scene } from "phaser";
import { characters } from "../../../common/common";

export class BaseMap extends Scene {
    constructor(mapConfig) {
        super(mapConfig.sceneKey);
        this.mapConfig = mapConfig;
    }

    preload() {
        const { tilemapKey, tilemapJson, tilesetKey, tilesetImage, tilesets, objectTiles, format } = this.mapConfig;

        if (tilesets) {
            tilesets.forEach(ts => this.load.image(ts.key, ts.image));
        } else if (tilesetKey && tilesetImage) {
            this.load.image(tilesetKey, tilesetImage);
        }

        // Load individual object tile images if defined
        if (objectTiles) {
            objectTiles.forEach(ot => this.load.image(ot.key, ot.image));
        }
        this.load.tilemapTiledJSON(tilemapKey, tilemapJson);

        const selectedCharacter = window.localStorage.getItem('character');
        const character = characters.find(c => c.charName === selectedCharacter) ?? characters[0];
        this.load.image('avatar', character.charImg);
    }

    create() {
        const { tilemapKey, tilesetKey, tilesets, layers, objectTiles, spawnX, spawnY } = this.mapConfig;

        const map = this.make.tilemap({ key: tilemapKey });

        // Build GID → texture key lookup for object tiles
        const gidToKey = {};
        if (objectTiles) {
            objectTiles.forEach(ot => { gidToKey[ot.gid] = ot.key; });
        }

        let loadedTilesets = [];
        if (tilesets) {
            loadedTilesets = tilesets.map(ts => map.addTilesetImage(ts.name, ts.key));
        } else {
            loadedTilesets = [map.addTilesetImage(map.tilesets[0].name, tilesetKey)];
        }

        let colliders = [];

        if (layers) {
            layers.forEach(layerConfig => {
                if (layerConfig.type === 'objectgroup') {
                    // Handle object layers
                    this._spawnObjectLayer(map, layerConfig, gidToKey, colliders);
                } else {
                    // Handle tile layers
                    const layer = map.createLayer(layerConfig.name, loadedTilesets);
                    if (layer && layerConfig.collides) {
                        layer.setCollisionByExclusion([-1]);
                        colliders.push(layer);
                    }
                }
            });
        }

        this.player = this.physics.add.sprite(spawnX, spawnY, 'avatar');

        colliders.forEach(collider => {
            this.physics.add.collider(this.player, collider);
        });

        this.cameras.main.startFollow(this.player);
        EventBus.emit('current-scene-ready', this);
    }

    _spawnObjectLayer(map, layerConfig, gidToKey, colliders) {
        const objectLayer = map.getObjectLayer(layerConfig.name);
        if (!objectLayer) return;

        if (layerConfig.collides) {
            // Collidable object layer — create static physics sprites
            const group = this.physics.add.staticGroup();

            objectLayer.objects.forEach(obj => {
                if (!obj.gid) return;
                const key = gidToKey[obj.gid];
                if (!key) return;

                const sprite = group.create(
                    obj.x + obj.width / 2,
                    obj.y - obj.height / 2,  // Tiled Y is bottom-left, Phaser is top-left
                    key
                );
                sprite.setDisplaySize(obj.width, obj.height);
                sprite.refreshBody();
            });

            colliders.push(group);
        } else {
            // Non-collidable object layer — just render visually
            objectLayer.objects.forEach(obj => {
                if (!obj.gid) return;
                const key = gidToKey[obj.gid];
                if (!key) return;

                this.add.image(
                    obj.x + obj.width / 2,
                    obj.y - obj.height / 2,
                    key
                ).setDisplaySize(obj.width, obj.height);
            });
        }
    }

    update() {
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