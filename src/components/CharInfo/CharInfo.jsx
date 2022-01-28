import { useSelector } from 'react-redux';
import CharInfoContent from '../CharInfoContent/CharInfoContent';

import Skeleton from '../Skeleton/Skeleton'
import './charInfo.scss';


const CharInfo = () => {
    const {activeChar} = useSelector(state => state);

    const content =   activeChar ? <CharInfoContent/> : <Skeleton/>;

    return(
        <div className="char__info">
            {content}
        </div>
    )   
}

export default CharInfo;