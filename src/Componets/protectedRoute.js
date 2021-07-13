
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";


const ProtectedRoute = ({auth,component: Component, ...rest}) => {
  return (
    <Route {...rest}
     render = {() => auth ? (<Component/>) :
      (<Redirect to="/home" />)
    }
     />
  )
}

export default ProtectedRoute;