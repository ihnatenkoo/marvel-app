import './error.scss';
import error from "./error.gif"

const Error = ({isReloadPage}) => {
  function refreshPage() {
    window.location.reload(); 
  }

  return (
    <>
      <div className="error">
        <img src={error} className="error__img" alt="error" />
        {isReloadPage && <a href="/#" onClick={refreshPage} className="error__link">Reload Page</a>}
      </div>

    </>
    
  )
}

export default Error;