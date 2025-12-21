import * as styles from "./home.module.css";
import { useNavigate } from "react-router-dom";
import { CharacterSelection } from "../characterSelection/characterSelection";

export const HomeComponent = () => {
    const navigate = useNavigate();

    return(
        <div className={styles.container}>
            <CharacterSelection />
            <button className={styles.playBtn} onClick={() => {navigate('/play')}}> Play </button>
        </div>
    )
}