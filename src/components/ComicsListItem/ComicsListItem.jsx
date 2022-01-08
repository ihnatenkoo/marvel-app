import { Link } from "react-router-dom";
import "./ComicsListItem.scss"

const ComicsListItem = ({comics}) => {
  const {id, title, thumbnail, printPrice, digitalPrice} = comics;

  const imageNA = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
  const isObjectFit = (thumbnail, imageNA) => {
    if (thumbnail === imageNA) {
      return {objectFit: "contain"}
    }
    return null
  }
  
  return (
      <div className="comics__item">
        <Link className="comics__link" to={`/comics/${id}`}>
          <img className="comics__img" src={thumbnail} alt="" style={isObjectFit(thumbnail, imageNA)}/>
          <h2 className="comics__name">{title}</h2>
          <div className="comics__prices">
            <div className="comics__print__price">Print: {printPrice ? printPrice +"$" : "Not Available"}</div>
            <div className="comics__digital__price">Digital: {digitalPrice ? digitalPrice +"$" : "Not Available"}</div>
          </div>
        </Link>
      </div>
  )
}

export default ComicsListItem;