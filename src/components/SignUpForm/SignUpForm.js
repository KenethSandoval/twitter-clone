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
  const [formData, setFormData] = useState(initialFormValue());
  const [signUpLoading, setSignUpLoading] = useState(false);


  const onSubmit = e => {
    e.preventDefault();
    let validCount = 0;
    
    values(formData).some(value => {
      value && validCount++
      return null
    });
    if (validCount !== size(formData)) {
      toast.warning("Completa todos los campos del formulario")
    } else {
      if (!isEmailValid(formData.email)) {
        toast.error("Email invalido");
      } else if (formData.password !== formData.repeatPassword) {
        toast.error("La contraseña no coincide");
      } else if(size(formData.password) < 6) {
        toast.error("La contraseña tiene que tener al menos 6 caracteres")
      } else {
        setSignUpLoading(true)
        signUpApi(formData)
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
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
              defaultValue={formData.nombre}
            />    
          </Col>
          <Col> 
            <Form.Control 
              type="text"
              name="lastname"
              placeholder="Apellidos"
              defaultValue={formData.apellido}
            />    
          </Col>
        </Row>
      </Form.Group>  

      <Form.Group>
       <Form.Control 
          type="email" 
          placeholder="Correo Electronico"  
          name="email"
          defaultValue={formData.email}
      />
      </Form.Group>

      <Form.Group>
        <Row>
          <Col> 
            <Form.Control 
              type="password" 
              placeholder="Contraseña"
              name="password"
              defaultValue={formData.password}
            />    
          </Col>
          <Col> 
            <Form.Control 
              type="password"
              placeholder="Repetir contraseña" 
              name="repeatPassword"
              defaultValue={formData.repeatPassword}
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
