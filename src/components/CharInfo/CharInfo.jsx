import { useState, useEffect } from 'react';
import {useMarvelService} from '../../hooks/useMarvelService';

import CharInfoContent from '../CharInfoContent/CharInfoContent';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';
import Skeleton from '../Skeleton/Skeleton'
import './charInfo.scss';


const CharInfo = ({activeChar}) => {
    const {getCharacter, loading, error, clearError} = useMarvelService();

    const [char, setChar] = useState(null)

    useEffect(() => {
        if (activeChar) {
            setActiveChar();
        }
    }, [activeChar])


    const setActiveChar = async () => {
        clearError();
        const char = await getCharacter(activeChar);
        setChar(char);
    }
    
    const content =  !(!char || loading || error) ? <CharInfoContent char={char}/> : null;
    const skeleton = !( char || loading || error) ? <Skeleton/> : null;

    return(
        <div className="char__info">
            {content}
            {skeleton}
            {loading && <Spinner/>}
            {error && <Error isReloadPage={true}/>}
        </div>
    )   
}

export default CharInfo;