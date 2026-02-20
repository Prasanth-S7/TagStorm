import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterSelection } from "../characterSelection/characterSelection";
import { MapSelection } from "../mapSelection/mapSelection";
import * as styles from "./home.module.css";

export const HomeComponent = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState('avatar'); // 'avatar' | 'map'
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const handleCharacterSelect = (charName) => {
        window.localStorage.setItem('character', charName);
        setSelectedCharacter(charName);
        setStep('map');
    };

    const handleMapSelect = (map) => {
        window.localStorage.setItem('selectedMap', map.sceneKey);
        navigate('/play');
    };

    return (
        <div className={styles.container}>
            {step === 'avatar' && (
                <>
                    <h2 className={styles.stepHeading}>Choose Your Avatar</h2>
                    <CharacterSelection setSelectedCharacter={handleCharacterSelect} />
                </>
            )}

            {step === 'map' && (
                <>
                    <MapSelection onMapSelect={handleMapSelect} />
                    <button
                        className={styles.backBtn}
                        onClick={() => setStep('avatar')}
                    >
                        ← Back
                    </button>
                </>
            )}
        </div>
    );
};