import React ,{useState,useEffect}from 'react'
import { Link, Redirect } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast ,ToastContainer} from 'react-toastify';
import { connect } from 'react-redux';
import { userLogin} from '../actions';
import * as TYPES from '../actions/types';

const Login = ({user,userLogin}) => {
  const history = useHistory();
  const [values,setValues] = useState({});
  const handleInputChange =(event) =>{
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(value);
    setValues({...values,
      [name]: value
    },);
  };

  useEffect(() => {
      localStorage.getItem("auth") ? history.push("/discover/Popular"):history.push("/login");
  }, [])

  useEffect(() => {
     if(user.type === TYPES.LOGIN_SUCCESS){
        localStorage.setItem("auth",true);
         history.push("/discover/Popular");
     }else if(user.type === TYPES.LOGIN_FAIL){
         console.log("123123")
     }
  }, [user]);

   const login = ()=>{
    
    userLogin(values);
//      axios.post(`http://localhost:8080/api/v1/login`,values).then(res => {
//       if(res.status === 200){
//        if(res.data.token !== "" && res.data.roles[0] === "ROLE_USER"){
//              axios.get(`http://localhost:8080/api/v1/user/${res.data.id}`).then(res =>{
//                     if(res.data.member["premium"] === "PREMIUM"){
//                         localStorage.setItem("auth",true);
//                         history.push("/discover/Popular");
//                     }
//             })
//         }
//       }
//   }).catch(error => toast.error("Username orr Passsword Incorrect"));
};

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
       <ToastContainer></ToastContainer>

      <CContainer>
        <CRow className="justify-content-center mh-100">
          <CCol md="12">
            <CCardGroup>
              <CCard className="p-4 h-100" style={{height:"300px !important"}}>
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" name="username" onChange={handleInputChange}/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" name="password"  onChange={handleInputChange}/>
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={login}>Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '100%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
       
      </CContainer>

    </div>
  )
}

const mapStateToProps = ({ user }) => {
    return { user };
  };


export default connect(
    mapStateToProps,
    { userLogin}
  ) (Login);
