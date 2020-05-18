import React from 'react';
import loginFormInputAttributes from './loginFormInputAttributes';
import Form from '../Form/Form';
import Button from '../Button';
import ContainerComponent from '../ContainerComponent/ContainerComponent';

const LoginForm = (props) => {
  return (
    <>
      <div className='login'>
        <div className='content'>
          <h1>Welcome to DIMSUI</h1>
          <Form
            className='login-form'
            inputs={loginFormInputAttributes()}
            onSubmit={(data) => props.logIn(data.userName, data.password)}
            submitButton={<Button classMod='primary'>Log in</Button>}
          />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
