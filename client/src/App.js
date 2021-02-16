import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from './components/Footer/Footer';
import { Spinner } from 'reactstrap';

import { getAuthUser } from './js/actions/authActions';

import AppNavbar from './components/AppNavBar';
import Home from './components/pages/Home';
import PrivateRoute from './components/routess/PrivateRoute';
import Dashboard from './components/pages/Dashboard';
import CardUser from './components/Profile/CardUser'


function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.authReducer);
  const getUser = () => dispatch(getAuthUser());

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spinner
          style={{ width: '3rem', height: '3rem', color: 'secondary' }}
          type="grow"
        />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppNavbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route  path="/profile" component={CardUser} />
      
      
        
        
      </Switch>
    
    </BrowserRouter>
  );
}




export default App;