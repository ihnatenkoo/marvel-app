import { useSelector } from 'react-redux';

const RandomCharInfo = () => {
  const { randomChar } = useSelector((state) => state);
  let { name, description, thumbnail, wiki, homepage } = randomChar;

  if (description.length > 211) {
    description = `${description.slice(0, 211)}...`;
  } else if (description.length === 0) {
    description = 'Description Not Available';
  }

  return (
    <div className="randomchar__block">
      <img
        style={
          thumbnail ===
          'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            ? { objectFit: 'contain' }
            : null
        }
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>

        <div className="randomchar__btns">
          <a
            href={homepage}
            className="button button__main"
            target="_blank"
            rel="noreferrer"
          >
            <div className="inner">homepage</div>
          </a>
          <a
            href={wiki}
            className="button button__secondary"
            target="_blank"
            rel="noreferrer"
          >
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomCharInfo;
