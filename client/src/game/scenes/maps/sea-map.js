import { BaseMap } from "./base-map";
import { maps } from "../../../common/common";

const config = maps.find(m => m.sceneKey === 'SeaMap');

export class SeaMap extends BaseMap {
    static SCENE_KEY = 'SeaMap';
    constructor() { super(config); }
}
