import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChar} from "../../actions";

const CharItem = ({char}) => {
  const {activeChar} = useSelector(state => state)
  const dispatch = useDispatch();

  const imageNA1 = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
  const imageNA2 = "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif";

  const isObjectFit = (thumbnail, imageNA1, imageNA2) => {
      if (thumbnail === imageNA1 || thumbnail === imageNA2) {
          return {objectFit: "contain"}
      }
      return null;
  }

  const style = classNames({
    "char__item":true,
    "char__item_selected": activeChar?.id === char.id
  })

  const selectActiveChar = () => {
    if (activeChar?.id !== char.id) {
      dispatch(setActiveChar(char));
    }
  }

  return (
      <div 
        onClick={() => selectActiveChar()}
        className={style}
        data-id={char.id}>
          <img src={char?.thumbnail} alt="abyss" style={isObjectFit(char?.thumbnail, imageNA1, imageNA2)}/>
          <div className="char__name">{char.name}</div>
      </div>   
  )
}

export default CharItem;