import styled from "styled-components";
import { AccountBox } from "../containers/accountBox"; 
import Navbar from '../components/navbar/Navbar'

const AppContainer = styled.div`
  width: 100%;
  height: 100vh; /* Ensures the container covers the full viewport height */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function LoginPage() {
  return (
    <>
      <Navbar /> 
      <AppContainer>
        <AccountBox/>
      </AppContainer>
    </>
  );
}

export default LoginPage;
