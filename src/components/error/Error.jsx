import './error.scss';
import error from "./error.gif"

const Error = ({isReloadPage}) => {
  function refreshPage() {
    window.location.reload(); 
  }

  return (
    <>
      <div className="error">
        <img src={error} className="error__img" alt="error image" />
        {isReloadPage ? <h2 onClick={refreshPage} className="error__title">Reload Page</h2> : null}
      </div>

    </>
    
  )
}

export default Error;