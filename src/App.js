import React, { useEffect } from 'react';
import Header from './Header'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Home'
import Checkout from './Checkout'
import Payment from './Payment'
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
//import Orders from './Orders'
import Login from './Login'
import {loadStripe} from "@stripe/stripe-js/";
import {Elements} from "@stripe/react-stripe-js";
//import Orders from ".Orders";
import './App.css';

const promise = loadStripe('pk_test_51HPAmjDUoecKrUEk7vQNVeJwEAwDtfp0W9WWqV35pzAYnlZhP9ETzHtGC3lgBNhq4x5pkSBHNtWlQY69LIWGayW200OkrOq7yC')

function App() {
  const [{},dispatch] = useStateValue();
  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
    <div className="App">
   
      <Switch>
      <Route path="/orders">
        <h1>order page</h1>
        </Route>
        <Route path="/login">
        <Login/>
        </Route>
      <Route path="/checkout">
         <Header/>
          <Checkout/>
        </Route>
        <Route path="/payment">
          <Header/>
          <Elements stripe={promise}>
            <Payment/>
          </Elements>
        </Route>
        <Route path="/">
          <Header/>
          <Home />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
