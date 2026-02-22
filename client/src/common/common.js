export const characters = [
    { charImg: "/assets/avatars/Icon2.png", charName: "Lyra" },
    { charImg: "/assets/avatars/Icon3.png", charName: "Kael" },
    { charImg: "/assets/avatars/Icon1.png", charName: "Aeron" },
    { charImg: "/assets/avatars/Icon4.png", charName: "Nyx" },
    { charImg: "/assets/avatars/Icon5.png", charName: "Orin" },
    { charImg: "/assets/avatars/Icon6.png", charName: "Zara" },
    { charImg: "/assets/avatars/Icon7.png", charName: "Riven" },
    { charImg: "/assets/avatars/Icon8.png", charName: "Elio" },
    { charImg: "/assets/avatars/Icon9.png", charName: "Vexa" },
    { charImg: "/assets/avatars/Icon10.png", charName: "Thorne" },
    { charImg: "/assets/avatars/Icon11.png", charName: "Mira" },
    { charImg: "/assets/avatars/Icon12.png", charName: "Kiro" },
    { charImg: "/assets/avatars/Icon13.png", charName: "Sable" },
    { charImg: "/assets/avatars/Icon14.png", charName: "Astra" },
    { charImg: "/assets/avatars/Icon15.png", charName: "Drake" },
];

/**
 * Map registry — add a new entry here (+ a tiny Scene class) to support a new map.
 *
 * Fields:
 *  sceneKey       – Phaser scene key (must match the Scene constructor arg)
 *  name           – Display name shown on the map selection card
 *  description    – Short flavour text shown on the card
 *  format         – 'tiled' (Tiled Editor JSON) | 'spritefusion' (SpriteFusion JSON)
 *  tilemapKey     – Phaser cache key for the tilemap
 *  tilemapJson    – Path to the map JSON file
 *  tilesetKey     – Phaser cache key for the tileset image
 *  tilesetImage   – Path to the tileset PNG
 *  bgLayer        – Name of the background/environment layer
 *  collisionLayer – Name of the collision layer
 *  spawnX / spawnY – Player spawn position
 */
export const maps = [
    {
        sceneKey: 'GrassMap',
        name: 'Grass Map',
        description: 'A lush grassy map with various objects.',
        format: 'tiled',
        tilemapKey: 'grassmap',
        tilemapJson: '/assets/maps/grassMap.json',
        tilesets: [
            { name: 'Grass', key: 'grass-tiles', image: '/assets/tiles/TX Tileset Grass.png' },
            { name: 'Wall', key: 'wall-tiles', image: '/assets/tiles/TX Tileset Wall.png' },
            { name: 'Plant', key: 'plant-tiles', image: '/assets/tiles/TX Plant.png' },
            { name: 'TXProps', key: 'props-tiles', image: '/assets/tiles/TX Props.png' }
        ],
        layers: [
            { name: 'Grass', collides: false },
            { name: 'Statue', collides: true },
            { name: 'Chair', collides: true },
            { name: 'TombStone', collides: true },
            { name: 'Stone', collides: true },
            { name: 'FootPath', collides: false },
            { name: 'Plants', collides: true }
        ],
        spawnX: 400,
        spawnY: 300,
    },
    {
        sceneKey: 'SeaMap',
        name: 'Sea Map',
        description: 'A vast sea map with various coastal elements.',
        format: 'tiled',
        tilemapKey: 'seamap',
        tilemapJson: '/assets/maps/seamap.json',
        tilesets: [
            { name: 'Background', key: 'seamap-background', image: '/assets/tiles/background/Background.png' }
        ],
        layers: [
            { name: 'Background', collides: false },
            { name: 'Collision', collides: true, type: 'objectgroup' },
            { name: 'Passthrough', collides: false, type: 'objectgroup' },
            { name: 'BaseLayer', collides: false },
        ],
        objectTiles: [
            { gid: 3090, key: 'obj-cargo-18', image: '/assets/tiles/cargos/18.png' },
            { gid: 3091, key: 'obj-cargo-19', image: '/assets/tiles/cargos/19.png' },
            { gid: 3086, key: 'obj-cargo-14', image: '/assets/tiles/cargos/14.png' },
            { gid: 3094, key: 'obj-cargo-22', image: '/assets/tiles/cargos/22.png' },
            { gid: 3095, key: 'obj-cargo-23', image: '/assets/tiles/cargos/23.png' },
            { gid: 3100, key: 'obj-cargo-28', image: '/assets/tiles/cargos/28.png' },
            { gid: 3103, key: 'obj-crane', image: '/assets/tiles/overheadcrane/Overhead-crane.png' },
            { gid: 3106, key: 'obj-fence-1', image: '/assets/tiles/fencing/1.png' },
            { gid: 3113, key: 'obj-fence-8', image: '/assets/tiles/fencing/8.png' },
            { gid: 3114, key: 'obj-cart', image: '/assets/tiles/overheadcrane/Cart.png' },
            { gid: 3104, key: 'base-tile', image: '/assets/tiles/tiles/tile_01.png' },

        ],
        spawnX: 100,
        spawnY: 250,
    }
];
