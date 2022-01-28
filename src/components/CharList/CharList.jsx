import { useEffect } from 'react';
import { useMarvelService } from '../../hooks/useMarvelService';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux'
import { getCharList, changeOffsetCharacters, toggleEndCharacters } from '../../actions';

import CharItem from '../CharItem/CharItem';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';

import './charList.scss';
import "../../style/animate.scss";
import classNames from 'classnames';


const CharList = (props) => {
    const {getManyCharacters, loading, error, clearError} = useMarvelService();
    const {charList, offsetCharacters, isEndOfCharacters} = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        getCharacters();
        //eslint-disable-next-line
    }, []);

    const getCharacters = async () => {
        clearError();
        const data = await getManyCharacters(offsetCharacters);

        if (data.length < 9) {
            dispatch(toggleEndCharacters(true))
        };
        const charListScroll = [...charList, ...data];

        dispatch(changeOffsetCharacters())
        dispatch(getCharList(charListScroll))
    }

    
    const charContent = charList.map((char, i) => 
        <CSSTransition key={char.id} timeout={500} classNames="animate">
            <CharItem char={char} />
        </CSSTransition>
    );
 
    const btnClass = classNames({
        "button button__main button__long": true,
        "disabled" : loading,
        "hide": isEndOfCharacters
    })

    return (
        <div className="char__list">
            <TransitionGroup className="char__grid">
                {!error && charContent}
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


