import SignInForm from "../../components/sign-in-from/sign-in-form.component";
import SingUpFrom from "../../components/sign-up-form/sign-up-form.component";

import './authentication.styles.scss';

const Authentication = ()=> {
  return(
  <div className="authentication-container">    
    <SignInForm/>
    <SingUpFrom/>
  </div>
  );
  
}

export default Authentication