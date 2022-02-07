import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMarvelService } from '../../hooks/useMarvelService';
import { setSingleChar } from '../../actions/';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';

import './singleChar.scss';

const SingleChar = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { getCharacter, loading, error, clearError } = useMarvelService();

  const { singleChar } = useSelector((state) => state);
  const { thumbnail, name, description } = singleChar;

  const getChar = async () => {
    clearError();

    const char = await getCharacter(id);
    dispatch(setSingleChar(char));
  };

  useEffect(() => {
    getChar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="single__char">
      {loading && <Spinner />}
      {error && <Error />}
      {!loading && !error ? (
        <>
          <img
            className="single__char__img"
            src={thumbnail}
            alt="Comics poster"
          ></img>
          <div className="single__char__descr">
            <h2 className="single__char__name">{name}</h2>
            <div className="single__char__descriprion">
              {description ? description : 'Description Not Available'}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SingleChar;
