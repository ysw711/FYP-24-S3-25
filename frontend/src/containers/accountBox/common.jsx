import styled from "styled-components";

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19);
`;

export const MutedLink = styled.a`
  font-size: 11px;
  color: rgba(254, 183, 196, 0.8); /* Adjusted to a muted pink */
  font-weight: 500;
  text-decoration: none;
`;

export const BoldLink = styled.a`
  font-size: 11px;
  color: #FEB7C4; /* Adjusted to the pink color */
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(254, 183, 196, 0.3); /* Adjusted to a muted pink */
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 12px;

  &::placeholder {
    color: rgba(254, 183, 196, 1); /* Adjusted to a pink placeholder */
  }

  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(254, 183, 196, 0.4); /* Adjusted to a pink border */
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid #FEB7C4; /* Adjusted to the pink color */
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 11px 40%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: all 240ms ease-in-out;
  background: #FEB7C4; /* Base pink color */
  background: linear-gradient(
    58deg,
    rgba(254, 183, 196, 1) 20%,
    rgba(243, 172, 18, 1) 100%
  ); /* You can adjust the second color of the gradient if you want a different effect */
  
  &:hover {
    filter: brightness(1.03);
  }
`;
