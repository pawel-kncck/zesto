import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../../firebase';
import styled from 'styled-components';

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

const AuthContainer = styled.div`
  padding: 50px 20px;
  margin: 30px auto 0;
  width: 300px;
  background: #fafafa;
`;

class SignInScreen extends React.Component {
  render() {
    return (
      <AuthContainer>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </AuthContainer>
    );
  }
}

export default SignInScreen;
