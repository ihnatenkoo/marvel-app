import { Component } from 'react';
import { getCharacter } from '../../api';

import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import Skeleton from '../skeleton/Skeleton'
import './charInfo.scss';


class CharInfo extends Component {
    state = {
        char: null,
        isLoading: false,
        isError: false
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setActiveChar();
        }
      
    }

    setActiveChar = async () => {
        try {
            this.setState({
                isLoading: true
            })
            const char = await getCharacter(this.props.activeChar);
    
            this.setState({
                char,
                isLoading: false
            })
        }
        catch {
            this.onError();
        }
     
    }

    onError = () => {
        this.setState({
            isError: true
        })
    }

    render() {
        let {char, isLoading, isError} = this.state;
    
        const spinner =  isLoading ? <Spinner/> : null;
        const error = isError ? <Error/> : null;
        const content =  !(isLoading || isError || !char) ? <Content char={char}/> : null;
        const skeleton = !(char || isLoading || isError) ? <Skeleton/> : null;
      

        return (
            <div className="char__info">
                {content}
                {skeleton}
                {spinner}
                {error}
            </div>
        )
    }
    
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