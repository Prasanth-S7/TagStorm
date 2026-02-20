import { BaseMap } from "./base-map";
import { maps } from "../../../common/common";

const config = maps.find(m => m.sceneKey === 'BasicMap');

export class BasicMap extends BaseMap {
    static SCENE_KEY = 'BasicMap';
    constructor() { super(config); }
}