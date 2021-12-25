import { useState, useEffect } from 'react';
import {useMarvelService} from '../../api/index';

import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import Skeleton from '../skeleton/Skeleton'
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
        clearError()
        const char = await getCharacter(activeChar);
        setChar(char)
    }
    
    const spinner =  loading ? <Spinner/> : null;
    const errorMsg = error ? <Error/> : null;
    const content =  !(loading || error || !char) ? <Content char={char}/> : null;
    const skeleton = !(char || loading || error) ? <Skeleton/> : null;

    return(
        <div className="char__info">
            {content}
            {skeleton}
            {spinner}
            {errorMsg}
        </div>
    )   
}

const Content = ({char}) => {
    let {name, description, thumbnail, comics, homepage, wiki} = char;

    const calculateComicsList = (comicsList) => {
        if (comics.length === 0) return "No comics for this character";
        return comicsList.map((item,i) => {return (
            <li className="char__comics-item" key={i}>
               {item}
            </li>
        )})
    }

    return (
        <>
        <div className="char__basics">
            <img src={thumbnail} alt="abyss"/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main" target="_blank" rel="noreferrer">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary" target="_blank" rel="noreferrer">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">
            {description.length === 0 ? "Description not Available": description}
        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            {calculateComicsList(comics)}
        </ul>    
      </> 
    )
}

export default CharInfo;