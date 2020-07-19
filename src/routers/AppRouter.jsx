import React, { useEffect, useState } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { JournalScreen } from "../components/journal/JournalScreen";
import { firebase } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking , setchecking] =useState(true);
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsAuthenticate(true)
      }else{
        setIsAuthenticate(false)
      }
      setchecking(false)
    });
  }, [dispatch]);
  if(checking){
    return (<h3>Loading...</h3> )
  }
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute  isAuthenticate={isAuthenticate} path="/auth" component={AuthRouter} />
          <PrivateRoute isAuthenticate={isAuthenticate} exact path="/" component={JournalScreen} />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
