const fs = require('fs');
const file = '/home/prasanth/projects/play/client/public/assets/maps/grassMap.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

data.tilesets = [
    {
        "firstgid": 1,
        "name": "Grass",
        "image": "../tiles/TX Tileset Grass.png",
        "imagewidth": 256,
        "imageheight": 256,
        "tilewidth": 32,
        "tileheight": 32,
        "margin": 0,
        "spacing": 0,
        "columns": 8,
        "tilecount": 64
    },
    {
        "firstgid": 65,
        "name": "Wall",
        "image": "../tiles/TX Tileset Wall.png",
        "imagewidth": 512,
        "imageheight": 512,
        "tilewidth": 32,
        "tileheight": 32,
        "margin": 0,
        "spacing": 0,
        "columns": 16,
        "tilecount": 256
    },
    {
        "firstgid": 321,
        "name": "Plant",
        "image": "../tiles/TX Plant.png",
        "imagewidth": 512,
        "imageheight": 512,
        "tilewidth": 32,
        "tileheight": 32,
        "margin": 0,
        "spacing": 0,
        "columns": 16,
        "tilecount": 256
    },
    {
        "firstgid": 577,
        "name": "TXProps",
        "image": "../tiles/TX Props.png",
        "imagewidth": 512,
        "imageheight": 512,
        "tilewidth": 32,
        "tileheight": 32,
        "margin": 0,
        "spacing": 0,
        "columns": 16,
        "tilecount": 256
    }
];

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Done!');
