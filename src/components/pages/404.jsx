import Error from "../Error/Error";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div>
      <h2 style={{"textAlign": "center", "color": "#9F0013"}}>Error404 - Page not Found</h2>

      <Error/>
      
      <Link style={{"textAlign": "center", "color": "#5f78bb", "fontWeight": "bold", "display": "block", "textDecoration": "underline"}} 
            to="/" >Go to the Main Page</Link>
    </div>
  )
}

export default Page404;