import React, { useState } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Spinner
} from 'react-bootstrap';
import { values, size } from 'lodash';
import { toast } from 'react-toastify';

import { isEmailValid } from '../../utils/validations'
import { signUpApi } from '../../api/auth';
import './SignUpForm.scss'

export default function SignUpForm(props) {
  const { setShowModal } = props;
  const [formtData, setFormData] = useState(initialFormValue());
  const [signUpLoading, setSignUpLoading] = useState(false);


  const onSubmit = e => {
    e.preventDefault();
    let validCount = 0;
    
    values(formtData).some(value => {
      value && validCount++
      return null
    });
    if (validCount !== size(formtData)) {
      toast.warning("Completa todos los campos del formulario")
    } else {
      if (!isEmailValid(formtData.email)) {
        toast.error("Email invalido");
      } else if (formtData.password !== formtData.repeatPassword) {
        toast.error("La contraseña no coincide");
      } else if(size(formtData.password) < 6) {
        toast.error("La contraseña tiene que tener al menos 6 caracteres")
      } else {
        setSignUpLoading(true)
        signUpApi(formtData)
          .then(response => {
            if (response.code) {
              toast.warning(response.message)
            } else {
              toast.success("OK")
              setShowModal(false);
              setFormData(initialFormValue)
            }
          }).catch(() => {
            toast.error("Error del servidor intertar mas tarde")
          }).finally(() => {
            setSignUpLoading(false);
          });
      }
    }
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
              name="name"
              placeholder="Nombre"
              defaultValue={formtData.nombre}
            />    
          </Col>
          <Col> 
            <Form.Control 
              type="text"
              name="lastname"
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
        { !signUpLoading ? "Registrarse" : <Spinner animation="border"/>}
      </Button>
    </Form>
   </div>
    
  );
}

function initialFormValue() {
  return {
    name: "",
    lastname: "",
    email: "",
    password: "",
    repeatPassword: ""
  }
}
