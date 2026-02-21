import { BaseMap } from "./base-map";
import { maps } from "../../../common/common";

const config = maps.find(m => m.sceneKey === 'GrassMap');

export class GrassMap extends BaseMap {
    static SCENE_KEY = 'GrassMap';
    constructor() { super(config); }
}
