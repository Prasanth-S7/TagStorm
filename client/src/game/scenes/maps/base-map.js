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
        const { tilemapKey, tilemapJson, tilesetKey, tilesetImage, format } = this.mapConfig;

        // Load the tileset image (same for both formats)
        this.load.image(tilesetKey, tilesetImage);

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
        const { format, tilemapKey } = this.mapConfig;

        // For SpriteFusion maps, convert raw JSON → Tiled-compatible structure
        // and inject into Phaser's tilemap cache before making the tilemap.
        if (format === 'spritefusion') {
            this._injectSpriteFusionAsTiled();
        }

        this._buildScene();
    }

    /**
     * Reads the SpriteFusion JSON from the generic JSON cache, converts
     * the sparse tile arrays to dense flat arrays (Tiled format), builds a
     * minimal Tiled-compatible JSON object, and stores it in the tilemap cache
     * so this.make.tilemap({ key }) works exactly like a real Tiled map.
     */
    _injectSpriteFusionAsTiled() {
        const { tilemapKey, tilesetKey, tilesetImage } = this.mapConfig;

        const raw = this.cache.json.get(tilemapKey);
        const { mapWidth, mapHeight, tileSize, layers } = raw;

        // Use the already-loaded texture to get image dimensions
        const texture = this.textures.get(tilesetKey);
        const imgWidth = texture.source[0].width;
        const imgHeight = texture.source[0].height;
        const columns = Math.floor(imgWidth / tileSize);
        const rows = Math.floor(imgHeight / tileSize);
        const tilecount = columns * rows;

        /**
         * SpriteFusion sparse tiles → Tiled flat array
         *  - SpriteFusion ids are 0-based strings
         *  - Tiled uses 1-based GIDs (0 = empty cell)
         */
        const toFlatArray = (sfLayer) => {
            const grid = new Array(mapWidth * mapHeight).fill(0);
            for (const tile of sfLayer.tiles) {
                grid[tile.y * mapWidth + tile.x] = parseInt(tile.id, 10) + 1;
            }
            return grid;
        };

        const tiledJson = {
            version: '1.6',
            type: 'map',
            orientation: 'orthogonal',
            renderorder: 'right-down',
            width: mapWidth,
            height: mapHeight,
            tilewidth: tileSize,
            tileheight: tileSize,
            infinite: false,
            nextlayerid: layers.length + 1,
            nextobjectid: 1,
            tilesets: [{
                firstgid: 1,
                name: tilesetKey,
                tilewidth: tileSize,
                tileheight: tileSize,
                spacing: 0,
                margin: 0,
                columns,
                tilecount,
                image: tilesetImage,
                imagewidth: imgWidth,
                imageheight: imgHeight,
            }],
            layers: layers.map((layer, i) => ({
                id: i + 1,
                name: layer.name,
                type: 'tilelayer',
                x: 0,
                y: 0,
                width: mapWidth,
                height: mapHeight,
                visible: true,
                opacity: 1,
                data: toFlatArray(layer),
                // SpriteFusion marks an entire layer as a collider;
                // translate that to per-layer Tiled properties.
                ...(layer.collider
                    ? { properties: [{ name: 'collides', type: 'bool', value: true }] }
                    : {}),
            })),
        };

        // Inject into Phaser's tilemap cache so make.tilemap({key}) works normally
        this.cache.tilemap.add(tilemapKey, {
            format: Phaser.Tilemaps.Formats.TILED_JSON,
            data: tiledJson,
        });
    }

    /** Shared scene setup — identical for both formats after cache normalisation. */
    _buildScene() {
        const { tilemapKey, tilesetKey, bgLayer, collisionLayer, spawnX, spawnY } = this.mapConfig;

        const map = this.make.tilemap({ key: tilemapKey });
        const tileset = map.addTilesetImage(map.tilesets[0].name, tilesetKey);

        map.createLayer(bgLayer, tileset);
        const collider = map.createLayer(collisionLayer, tileset);

        // SpriteFusion: whole collider layer → collide all non-empty tiles
        // Tiled: per-tile or per-layer 'collides' property
        if (this.mapConfig.format === 'spritefusion') {
            collider.setCollisionByExclusion([-1]);
        } else {
            collider.setCollisionByProperty({ collides: true });
        }

        this.player = this.physics.add.sprite(spawnX, spawnY, 'avatar');
        this.physics.add.collider(this.player, collider);
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
