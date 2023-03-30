import {   
  signInWithGooglePopup, 
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SingUpFrom from "../../components/sign-up-form/sign-up-form.component";

const SignIn = ()=> {

  const logGoogleUser = async ()=> {
    const {user } = await signInWithGooglePopup(); //UserCredentialImpl also has a uid inique identifier
    const userDocRef = await createUserDocumentFromAuth(user); 
  }

  return(
  <div>
    <h1>Sign In page</h1>
    <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    <SingUpFrom/>
  </div>
  );
  
}

export default SignIn