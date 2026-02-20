import { BaseMap } from "./base-map";
import { maps } from "../../../common/common";

const config = maps.find(m => m.sceneKey === 'OfficeMap');

export class OfficeMap extends BaseMap {
    static SCENE_KEY = 'OfficeMap';
    constructor() { super(config); }
}