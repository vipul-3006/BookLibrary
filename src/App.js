import {Route, Redirect, Switch} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import BookDetailsRoute from './components/BookDetailsRoute'
import BookShelvesRoute from './components/BookShelvesRoute'
import NotFoundRoute from './components/NotFoundRoute'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={HomeRoute} />
    <ProtectedRoute exact path="/books/:id" component={BookDetailsRoute} />
    <ProtectedRoute exact path="/shelf" component={BookShelvesRoute} />
    <Route path="/not-found" component={NotFoundRoute} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
