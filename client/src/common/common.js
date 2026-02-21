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
    }
];
