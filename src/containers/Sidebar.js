import React,{useEffect ,useState} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StickyBox from 'react-sticky-box';

import Logo from '../components/Logo';
import TmdbLogo from '../svg/tmdb.svg';
import MenuItem from '../components/MenuItem';
import { CButton } from '@coreui/react';
import {logout} from '../actions/index';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  padding: 2rem;
  margin-top: 4rem;
  color: var(--color-primary-dark);
  border-right: 1px solid var(--border-color);
`;

const Heading = styled.h2`
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  margin: 0 0 1rem 1rem;
  &:not(:first-child) {
    margin-top: 4rem;
  }
`;

const LinkWrap = styled(Link)`
  text-decoration: none;
  display: block;
  outline: none;
  margin-bottom: 0.5rem;
`;

const StyledCoffe = styled.a`
  display: flex !important;
  outline: none;
  justify-content: center !important;
  align-items: center !important;
  padding: 0.5rem 2rem;
  color: #000000;
  background-color: #ffffff;
  border-radius: 3px;
  font-family: 'Montserrat', sans-serif;
  border: 1px solid transparent;
  text-decoration: none;
  font-family: 'Montserrat';
  font-size: 1.2rem;
  letter-spacing: 0.6px;
  box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5);
  margin: 2rem auto;
  transition: 0.3s all linear;

  &img {
    width: 27px;
    box-shadow: none;
    border: none;
    vertical-align: middle;
  }

  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5);
    opacity: 0.85;
    color: #000000;
  }
`;

const CopyRight = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  color: ${props => (props.mobile ? '#fff' : 'var(--color-primary-dark)')};
  margin-bottom: ${props => (props.mobile ? '2rem' : '')};
`;

const StyledLink = styled.a`
  text-decoration: none;
  font-weight: 500;
  margin-left: 4px;
  color: inherit;
`;

const Svg = styled.img`
  max-width: 100%;
  height: 3rem;
`;

const Sidebar = ({ genres, staticCategories, selected,logout ,user}) => {

  const [auth, setAuth] = useState(user.auth);
  const signout= () =>{
    logout();
  }

  useEffect(() => {
    if(user.type === "LOGOUT_SUCCESS"){
      localStorage.removeItem("auth");
      localStorage.removeItem("id");
    }
  }, [user]);

  return (
    
    <StickyBox>
      <Wrapper>
        
        <Logo />

        <CButton color="danger" size="md" className="h-100" onClick={signout}>Sign Out</CButton>
        <Heading>Discover</Heading>
        {renderStatic(staticCategories, selected)}
        <Heading>Genres</Heading>
        {renderGenres(genres, selected)}
      </Wrapper>
    </StickyBox>
    
  );
};

function renderStatic(categories, selected, setisOpened) {
  return categories.map((category, i) => (
    <LinkWrap
      to={`${process.env.PUBLIC_URL}/discover/${category}`}
      key={i}
      onClick={setisOpened ? () => setisOpened(false) : null}
    >
      <MenuItem
        mobile={setisOpened ? 1 : 0}
        title={category}
        selected={category === selected ? true : false}
      />
    </LinkWrap>
  ));
}

function renderGenres(genres, selected, setisOpened) {
  return genres.map(genre => (
    <LinkWrap
      to={`${process.env.PUBLIC_URL}/genres/${genre.name}`}
      key={genre.id}
      onClick={setisOpened ? () => setisOpened(false) : null}
    >
      <MenuItem
        mobile={setisOpened ? 1 : 0}
        title={genre.name}
        selected={genre.name === selected ? true : false}
      />
    </LinkWrap>
  ));
}

const mapStateToProps = ({ geral,user }) => {
  return {
    staticCategories: geral.staticCategories,
    genres: geral.genres,
    selected: geral.selected,
    user:user
  };
};

export default connect(mapStateToProps,{logout})(Sidebar);
