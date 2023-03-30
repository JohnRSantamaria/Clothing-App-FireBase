import { useState } from "react";

import FormInput from "../form-input/from-input.component";
import Button from "../button/button.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import './sign-up-form.styless.scss'

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const SingUpForm = ()=> {
  
  const [formFields, setFormFields] = useState(defaultFormFields);

  const {displayName, email, password, confirmPassword} =  formFields;

  const resetFormFields = ()=> {
    setFormFields(defaultFormFields);
  }
  const handleSubmit = async(event)=> {
    event.preventDefault();

    if(password !== confirmPassword) return alert('passwords do not match');
    try {
        const {user} = await createAuthUserWithEmailAndPassword(email,password);
        await createUserDocumentFromAuth(user,{displayName});
        resetFormFields();
        
    } catch (error) { 
      if(error.code === 'auth/email-already-in-use' ) return alert('Cannot create user, Email already in use');
      console.log('user creation encountered an error', error.message);
    }

  }

  const handleChange = (event)=>{
    const {name, value} = event.target;

    setFormFields({
      ...formFields,
      [name]:value
    });
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        
        <FormInput
          label="Display Name"
          required
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}           
        />
        
        <FormInput 
          label="Email"
          required 
          type="email" 
          onChange={handleChange} 
          name="email" 
          value={email} 
        />
        
        <FormInput 
          label="Password"
          required 
          type="password" 
          onChange={handleChange} 
          name="password" 
          value={password} 
        />
        
        <FormInput 
          label="Confrim Password"
          required 
          type="password" 
          onChange={handleChange} 
          name="confirmPassword" 
          value={confirmPassword} 
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default SingUpForm;