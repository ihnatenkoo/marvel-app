import { useState, useEffect } from 'react';
import { useMarvelService } from '../../hooks/useMarvelService';
import RandomCharInfo from '../RandomCharInfo/RandomCharInfo';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


const RandomChar = () => {
    const {getCharacter, loading, error, clearError} = useMarvelService();

    const [char, setChar] = useState({
        name: null,
        description: "",
        thumbnail: null,
        wiki: null,
        homepage: null
    });

    useEffect(() => {
        updateCharacter()
    }, [])

    const updateCharacter = async () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400-1011000) + 1011000);
        const result = await getCharacter(id);
        setChar(result);
    } 

    return (
        <div className="randomchar">
                { loading && <Spinner/> }
                { error && <Error/> }
                { !(loading || error) && <RandomCharInfo char={char}/> }
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateCharacter}
                        className="button button__main">
                        <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

export default RandomChar;