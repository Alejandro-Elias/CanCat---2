
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import Dashboard from './components/Dashboard.jsx';
import Productos from './components/Productos.jsx';
import Usuarios from './components/Usuarios.jsx';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/productos" component={Productos} />
        <Route path="/usuarios" component={Usuarios} />
      </Switch>
    </Router>
  );
};

export default Routes;
