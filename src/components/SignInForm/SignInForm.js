import React from 'react';
import {
  Form,
  Button,
  Spinner
} from 'react-bootstrap';

import './SignInForm.scss'

export default function SignInForm() {
  const onSubmit = e => {
    e.preventDefault();

  }

  return (
    <div className="signin-form">
      <h2>Entrar</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Control 
            type="email"
            placeholder="Correo electronico"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control 
            type="password"
            placeholder="Contraseña"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Iniciar Sesion
        </Button>
      </Form>
    </div>
  );
}
