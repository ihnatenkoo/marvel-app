import { useState, useEffect, useRef } from 'react';
import {useMarvelService} from '../../api/index';
import CharItem from '../charItem/CharItem';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './charList.scss';
import classNames from 'classnames';


const CharList = (props) => {
    const {getManyCharacters} = useMarvelService();

    const [char, setChar] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [offset, setOffset] = useState(301);  // 1549 max offset
    const [isEnd, setEnd] = useState(false);
    const [focus, setFocus] = useState(null);
   
    useEffect(() => {
        getCharacters();
    }, []);

    useEffect(() => {
        if (focus !== null) focusOnItem(focus);
    }, [focus]);


    const getCharacters = async () => {
        setLoading(true)
        try {
            const data = await getManyCharacters(offset);
            if (data.length < 9) setEnd(isEnd => true);
            const charList = [...char, ...data];
    
            setChar(char => charList);
            setLoading(false);
            setOffset(offset => offset + 9);
        }
        catch {
            onError();
        }
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const itemRefs = useRef([]);
  
    const focusOnItem = (id) => {
      itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
      itemRefs.current[id].classList.add('char__item_selected');
      itemRefs.current[id].focus();
    }

    const getRef = (el, i) => {
       itemRefs.current[i] = el.current;
    }

    const getActiveFocus = (fucusID) => {
        setFocus(fucusID)
    }

    
    const charList = char.map((char, i) => 
            <CharItem 
                selectCharHandler={props.selectCharHandler} char={char} key={char.id} getRef={getRef} i={i} getActiveFocus={getActiveFocus}
            />);
    const spinner = isLoading ? <Spinner/> : null;
    const error = isError ? <Error/> : null;
    const content = !(isError) ? charList : null;

    const btnClass = classNames({
        "button button__main button__long": true,
        "disabled" : isLoading,
        "hide": isEnd
    })

    return (
        <div className="char__list">
            
            <ul className="char__grid">
                {content}
            </ul>
            {spinner}
            {error}
            <button onClick={getCharacters} className={btnClass} disabled={isLoading ? true : null}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
   
}

export default CharList;


