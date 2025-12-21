import { characters } from "../../common/common";
import * as styles from "./characterSelection.module.css";

export const CharacterSelection = ({setSelectedCharacter}) => {
    return (
        <div className={styles.characterContainer}>
            {characters.map((character, idx) => (
                <div className={styles.characterCard} key={idx} onClick={() => {
                    window.localStorage.setItem('character', character.charName)
                        setSelectedCharacter(character.charName)
                    }}>
                    <img
                        src={character.charImg}
                        alt={character.charName}
                        className={styles.characterImg}
                    />
                    <p className={styles.characterName}>{character.charName}</p>
                </div>
            ))}
        </div>
    );
};
