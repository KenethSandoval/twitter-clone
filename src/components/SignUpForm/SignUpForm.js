import React, { useState } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Spinner
} from 'react-bootstrap';

import './SignUpForm.scss'

export default function SignUpForm(props) {
  const { setShowModal } = props;
  const [formtData, setFormData] = useState(initialFormValue());
  
  const onSubmit = e => {
    e.preventDefault();
    setShowModal(false);
    console.log(formtData);
  };

  const onChange = e => {
    setFormData({ ...formtData, [e.target.name]: e.target.value })
  };

  return (
   <div className="sign-up-form">
    <h2>Crear tu cuenta</h2>
    <Form onSubmit={onSubmit} onChange={onChange}>
      <Form.Group>
        <Row>
          <Col> 
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Nombre"
              defaultValue={formtData.nombre}
            />    
          </Col>
          <Col> 
            <Form.Control 
              type="text"
              name="apellido"
              placeholder="Apellidos"
              defaultValue={formtData.apellido}
            />    
          </Col>
        </Row>
      </Form.Group>  

      <Form.Group>
       <Form.Control 
          type="email" 
          placeholder="Correo Electronico"  
          name="email"
          defaultValue={formtData.email}
      />
      </Form.Group>

      <Form.Group>
        <Row>
          <Col> 
            <Form.Control 
              type="password" 
              placeholder="Contraseña"
              name="password"
              defaultValue={formtData.password}
            />    
          </Col>
          <Col> 
            <Form.Control 
              type="password"
              placeholder="Repetir contraseña" 
              name="repeatPassword"
              defaultValue={formtData.repeatPassword}
            />    
          </Col>
        </Row>
      </Form.Group>

      <Button variant="primary" type="submit">
        Registrarse
      </Button>
    </Form>
   </div>
    
  );
}

function initialFormValue() {
  return {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    repeatPassword: ""
  }
}
