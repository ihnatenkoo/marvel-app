import { useEffect } from 'react';
import { useMarvelService } from '../../hooks/useMarvelService';
import { useDispatch } from 'react-redux'
import { getRandomChar } from '../../actions';

import RandomCharInfo from '../RandomCharInfo/RandomCharInfo';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const {getCharacter, loading, error, clearError} = useMarvelService();
    const dispatch = useDispatch();

    useEffect(() => {
        updateCharacter();
        //eslint-disable-next-line
    }, [])

    const updateCharacter = async () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400-1011000) + 1011000);
        const result = await getCharacter(id);
        dispatch(getRandomChar(result));
    } 

    return (
        <div className="randomchar">
                { loading && <Spinner/> }
                { error && <Error/> }
                { !(loading || error) && <RandomCharInfo/> }
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