import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import history from '../history';
import { connect } from 'react-redux';
import { init } from '../actions';
import ReactGA from 'react-ga';

import Sidebar from './Sidebar';
import MenuMobile from './MenuMobile';
import Discover from './Discover';
import Genre from './Genre';
import Search from './Search';
import Movie from './Movie';
import Person from './Person';
import ShowError from './ShowError';

import NotFound from '../components/NotFound';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowLeft,
  faArrowRight,
  faHome,
  faCalendar,
  faPoll,
  faHeart,
  faDotCircle,
  faStar as fasFaStar,
  faSearch,
  faChevronRight,
  faChevronLeft,
  faLink,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons';
import Login from './Login';
import PrivateRoute from '../components/PrivateRoute ';
import * as TYPES from '../actions/types';
import Register from './Register';
library.add(
  fab,
  faArrowLeft,
  faArrowRight,
  faHome,
  faCalendar,
  faPoll,
  faHeart,
  faDotCircle,
  fasFaStar,
  farFaStar,
  faSearch,
  faChevronRight,
  faChevronLeft,
  faLink,
  faPlay
);

const MainWrapper = styled.div`
  display: flex;
  flex-direction: ${props => (props.isMobile ? 'column' : 'row')};
  position: relative;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  user-select: none;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 4rem;

  @media ${props => props.theme.mediaQueries.larger} {
    padding: 6rem 3rem;
  }

  @media ${props => props.theme.mediaQueries.large} {
    padding: 4rem 2rem;
  }
`;

const SearhBarWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 2rem;
`;

ReactGA.initialize('UA-137885307-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const App = ({ init, isLoading ,user}) => {
  useEffect(() => {
    setAuth(localStorage.getItem("auth"))
    init();
  }, []);
  const [isMobile, setisMobile] = useState(null);
  const [auth, setAuth] = useState(false);

  // Set amount of items to show on slider based on the width of the element
  const changeMobile = () => {
    window.matchMedia('(max-width: 80em)').matches
      ? setisMobile(true)
      : setisMobile(false);
  };

  useEffect(() => {
    
    changeMobile();
    window.addEventListener('resize', changeMobile);
    return () => window.removeEventListener('resize', changeMobile);
  }, []);

  useEffect(() => {
    if(user.type === TYPES.LOGIN_SUCCESS && user.payload.isActive === true){
        setAuth(user.auth);
    }else if(user.type === TYPES.LOGIN_FAIL){
        setAuth(user.auth);
    }
  }, [user])


  return isLoading ? (
    <ContentWrapper>
      <Loader />
    </ContentWrapper>
  ) : (
    <Router history={history}>
      <React.Fragment>
        <MainWrapper isMobile={isMobile}>
          {isMobile ? (
            <MenuMobile />
          ) : 
          auth?
           (
                <>
              <Sidebar />
              <SearhBarWrapper>
                <SearchBar />
              </SearhBarWrapper>
              </>):<></>
          }
          <ContentWrapper>
            <Switch>
               <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} /> 
               <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} /> 
              <PrivateRoute
                path={process.env.PUBLIC_URL + '/'}
                exact
                render={() => (
                  <Redirect
                    from={process.env.PUBLIC_URL + '/'}
                    to={process.env.PUBLIC_URL + '/discover/Popular'}
                  />
                )}
              />
              <PrivateRoute
                path={process.env.PUBLIC_URL + '/genres/:name'}
                exact
                component={Genre}
              />
              <PrivateRoute
                path={process.env.PUBLIC_URL + '/discover/:name'}
                exact
                component={Discover}
              />
              <PrivateRoute
                path={process.env.PUBLIC_URL + '/search/:query'}
                exact
                component={Search}
              />
              <PrivateRoute
                path={process.env.PUBLIC_URL + '/movie/:id'}
                exact
                component={Movie}
              />
              <Route
                path={process.env.PUBLIC_URL + '/person/:id'}
                exact
                component={Person}
              />
              <Route
                path="/404"
                component={() => (
                  <NotFound title="Upps!" subtitle={`This doesn't exist...`} />
                )}
              />
              <Route
                path={process.env.PUBLIC_URL + '/error'}
                component={ShowError}
              />
              <Route
                component={() => (
                  <NotFound title="Upps!" subtitle={`This doesn't exist...`} />
                )}
              />
              
            </Switch>
          </ContentWrapper>
        </MainWrapper>
      </React.Fragment>
    </Router>
  );
};

const mapStateToProps = ({ geral , user}) => {
  return { isLoading: geral.loading , user :user};
};

export default connect(
  mapStateToProps,
  { init }
)(App);
