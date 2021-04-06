import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import DatePicker from 'react-datepicker';

import './EditUserForm.scss'

export default function EditUserForm(props) {
  const { user, setShowModal } = props;
  const [formData, setFormData] = useState(initialValue(user));

  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="edit-user-form">
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control 
                type="text"
                placeholder="Name"
                name="name"
                defaultValue={formData.name}
              />
            </Col>
            <Col>
              <Form.Control 
                type="text"
                placeholder="Last Name"
                name="lastname"
                defaultValue={formData.lastname}
              />
            </Col>
          </Row> 
        </Form.Group>

        <Form.Group>
          <Form.Control 
             as="textarea"
             row="3"
             placeholder="Agrega tu biografia"
             type="text"
             name="biograpy"
             defaultValue={formData.biograpy}
         />
        </Form.Group>
          
        <Form.Group>
          <Form.Control 
            type="text"
            placeholder="Sitio web"
            name="website"
            defaultValue={formData.website}
          />
        </Form.Group>

        <Form.Group>
          <DatePicker 
            placeholder="Fecha de nacimiento"
            selected={new Date(formData.birthdate)}
          />
        </Form.Group>

         <Button className="btn-submit" variant="primary" type="submit">
          Actualizar
         </Button>
      </Form>
    </div>
  )
}

function initialValue(user) {
  return {
    name: user.name || "",
    lastname: user.lastname || "",
    biograpy: user.biograpy || "",
    location: user.location || "",
    website: user.website || "",
    birthdate: user.birthdate || "",
  }
}
