import "./ComicsItem.scss"

const ComicsItem = ({comics}) => {
  const {title, thumbnail, price, detail} = comics;

  const actPrice = price ? price + "$" : "Not Available";
  const imageNA = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
  const isObjectFit = (thumbnail, imageNA) => {
    if (thumbnail == imageNA) {
      return {objectFit: "contain"}
    }
    return null
  }
  
  return (
      <li className="comics__item">
        <a className="comics__link" href={detail} target="_blank" rel="noreferrer">
          <img className="comics__img" src={thumbnail} alt="" style={isObjectFit(thumbnail, imageNA)}/>
          <h2 className="comics__name">{title}</h2>
          <div className="comics__price">{actPrice}</div>
        </a>
      </li>
  )
}

export default ComicsItem;