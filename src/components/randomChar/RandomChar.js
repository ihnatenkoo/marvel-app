import { useState, useEffect } from 'react';
import { useMarvelService } from '../../api/index';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

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

    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;
    const errorMsg = error ? <Error/> : null;
    
    return (
        <div className="randomchar">
                {spinner}
                {content}
                {errorMsg}
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

const View = ({char}) => {
    let {name, description, thumbnail, wiki, homepage} = char;
  
    if (description.length > 211) {
        description = `${description.slice(0,211)}...`
    } else if (description.length === 0) {
        description = "Description Not Available"
    } 


    const imageNA = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

     return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imageNA ? {objectFit: 'contain'} : null}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>

                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main" target="_blank" rel="noreferrer">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary" target="_blank" rel="noreferrer">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>   
        </div>
      
    
     )
 }


export default RandomChar;