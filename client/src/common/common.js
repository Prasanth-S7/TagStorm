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
        sceneKey: 'BasicMap',
        name: 'Basic Map',
        description: 'A wide open outdoor area — perfect for exploration.',
        format: 'spritefusion',     // SpriteFusion JSON — loaded as raw JSON, converted at runtime
        tilemapKey: 'basicmap',
        tilemapJson: '/assets/maps/basicmap.json',
        tilesetKey: 'basicmap-sprite',
        tilesetImage: '/assets/tiles/basicmap-sprite.png',
        bgLayer: 'Environment',
        collisionLayer: 'Blocks',
        spawnX: 400,
        spawnY: 300,
    },
    {
        sceneKey: 'OfficeMap',
        name: 'House',
        description: 'A cosy indoor house with rooms to wander through.',
        format: 'tiled',            // Standard Tiled Editor JSON
        tilemapKey: 'housemap',
        tilemapJson: '/assets/maps/house.json',
        tilesetKey: 'house-tiles',
        tilesetImage: '/assets/tiles/house-tiles.png',
        bgLayer: 'grass',
        collisionLayer: 'walls',
        spawnX: 400,
        spawnY: 300,
    },
];
