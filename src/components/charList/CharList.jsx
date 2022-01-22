import { useState, useEffect } from 'react';
import { useMarvelService } from '../../hooks/useMarvelService';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CharItem from '../CharItem/CharItem';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';

import './charList.scss';
import "../../style/animate.scss";
import classNames from 'classnames';



const CharList = (props) => {
    const {getManyCharacters, loading, error, clearError} = useMarvelService();

    const [char, setChar] = useState([]);
    const [offset, setOffset] = useState(301);  // 1549 max offset
    const [isEnd, setEnd] = useState(false);
    const [activeChar, setActiveChar] = useState(0);
   
    useEffect(() => {
        getCharacters();
    }, []);

    const getCharacters = async () => {
        clearError();
        const data = await getManyCharacters(offset);
        if (data.length < 9) setEnd(isEnd => true);
        const charList = [...char, ...data];

        setChar(char => charList);
        setOffset(offset => offset + 9);
    }

    
    const charList = char.map((char, i) => 
        <CSSTransition key={char.id} timeout={500} classNames="animate">
            <CharItem 
            selectCharHandler={props.selectCharHandler} 
            char={char} 
            setActiveChar={setActiveChar}
            activeChar={activeChar}
            />
        </CSSTransition>
    );
 
    const content = !(error) ? charList : null;

    const btnClass = classNames({
        "button button__main button__long": true,
        "disabled" : loading,
        "hide": isEnd
    })

    return (
        <div className="char__list">
            <TransitionGroup className="char__grid">
                {content}
            </TransitionGroup>
            {loading && <Spinner/>}
            {error && <Error isReloadPage={true}/>}
            <button onClick={getCharacters} className={btnClass} disabled={loading ? true : null}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
   
}

export default CharList;


