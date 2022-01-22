import { useState } from 'react';
import { useMarvelService } from '../../hooks/useMarvelService';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './searchPanel.scss'

const SearchPanel = () => {
  const {getCharacterFromName, loading} = useMarvelService();

  const [value, setValue] = useState("");
  const [char, setChar] = useState("");
  const [status, setStatus] = useState("");

  const getInputValue = (event) => {
    setValue(event.target.value)
  }

  const getChar = async (event) => {
    event.preventDefault();
 
    if (value.length > 0) {
      try {
        const char = await getCharacterFromName(value);
        setChar(char)
        setStatus("OK")
      }
      catch {
        setStatus("Not found")
      }
    }
    else(setStatus('Requaired'))
    
  }

  const classBtn = classNames({
    "button button__main": true,
    "disabled": loading
  })

  let results;

  switch(status) {
    case "Requaired" :
      results = (<div className='error'>This field is required</div> )
      break;
    case "Not found" :
      results = <div className='error'>The character was not found. Check the name and try again</div>
      break;
    case "OK" :
      results = ( <>
                    <h3 className='char__found'>There is! Visit <span>{char.name}</span> page?</h3>
                    <button className="button button__secondary" type="button">
                      <div className="inner">
                        <Link to={`/char/${char.id}`}>To page</Link>
                      </div>
                    </button>  
                  </>)
  }

  return (
    <form onSubmit={getChar} className="char__search" >
      <label htmlFor="text">Or find a character by name:</label>
      <input onChange={getInputValue} value={value} id='text' name="text" type="text" placeholder='Enter name'/>
      <button className={classBtn} disabled={loading ? true : null}>
          <div className="inner">Find</div>
      </button>

      <div className="char__search-footer">
        {results}
      </div>
    </form>
  )
}

export default SearchPanel;