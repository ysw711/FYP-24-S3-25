import React, { useState, useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      switchToSignin();
    } else {
      alert(data.message);
    }
  };

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleSubmit}>
        <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required/>
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
        <Marginer direction="vertical" margin={20} />
        <SubmitButton type="submit">Signup</SubmitButton>
      </FormContainer>      
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Sign in
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
