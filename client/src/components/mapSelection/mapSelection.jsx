import { maps } from "../../common/common";
import * as styles from "./mapSelection.module.css";

export const MapSelection = ({ onMapSelect }) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Choose a Map</h2>
            <div className={styles.grid}>
                {maps.map((map) => (
                    <div
                        key={map.sceneKey}
                        className={styles.card}
                        onClick={() => onMapSelect(map)}
                    >
                        <div className={styles.cardIcon}>🗺️</div>
                        <div className={styles.cardBody}>
                            <p className={styles.mapName}>{map.name}</p>
                            <p className={styles.mapDesc}>{map.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
