import { Component } from 'react';
import { getCharacter } from '../../api';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


class RandomChar extends Component {
    state= {
        char: {
            name: null,
            description: "",
            thumbnail: null,
            wiki: null,
            homepage: null
        },
        isLoading: false,
        isError: false
    }

    componentDidMount() {
        this.updateCharacter()
    }

    updateCharacter = async () => {
        this.setState({
            isLoading: true,
            isError: false
        })

        const id = Math.floor(Math.random() * (1011400-1011000) + 1011000);
        try {
            const result = await getCharacter(id);
            this.setState({
                char: result,
                isLoading: false
            })
        }
        catch {
            this.onError();
        }
    } 

    onError = () => {
        this.setState({
            isLoading: false,
            isError: true
        }) 
    }


    render() {
        const {char, isLoading, isError} = this.state;
        const spinner = isLoading ? <Spinner/> : null;
        const content = !(isLoading || isError) ? <View char={char}/> : null;
        const error = isError ? <Error/> : null;
      
        return (
            <div className="randomchar">
                    {spinner}
                    {content}
                    {error}

                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.updateCharacter}
                            className="button button__main">
                            <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, wiki, homepage} = char;
  
    const descr = description.length > 211 ? `${description.slice(0,211)}...` : description;
    const imageNA = thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

     return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imageNA ? {objectFit: 'contain'} : null}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{descr}</p>

                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main" target="_blank">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary" target="_blank">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>   
        </div>
      
    
     )
 }


export default RandomChar;