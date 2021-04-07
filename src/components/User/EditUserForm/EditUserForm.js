import React, { useState, useCallback } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import { useDropzone } from 'react-dropzone'
import { API_HOST } from '../../../utils/constant';
import { Camera } from '../../../utils/icons';


import './EditUserForm.scss'

export default function EditUserForm(props) {
  const { user, setShowModal } = props;
  const [formData, setFormData] = useState(initialValue(user));
  
  //estado para el banner
  const [bannerUrl, setBannerUrl] = useState(
    user?.banner ? `${API_HOST}/obtenerBanner?id=${user.id}` : null
  );
  const [bannerFile, setBannerFile] = useState(null);

  //estado para el avatar
  const [avatarUrl, setAvatarUrl] = useState(
    user?.avatar ? `${API_HOST}/obtenerAvatar?id=${user.id}` : null
  );
  const [avatarFile, setAvatarFile] = useState(null);

  //BANNER
  //eslint-disable-next-line react-hooks/exhaustive-deps
  const onDropBanner = useCallback(acceptedFile => {
    const file = acceptedFile[0];
    setBannerUrl(URL.createObjectURL(file));
    setBannerFile(file);
  }); 

  const { 
    getRootProps: getRootBannerProps, 
    getInputProps: getInputBannerProps 
  } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropBanner
  });

  //AVATAR
  //eslint-disable-next-line react-hooks/exhaustive-deps
  const onDropAvatar = useCallback(acceptedFile => {
    const file = acceptedFile[0];
    setAvatarUrl(URL.createObjectURL(file));
    setAvatarFile(file);
  });
  
  const { 
    getRootProps: getRootAvatarProps, 
    getInputProps: getInputAvatarProps 
  } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropAvatar
  });

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="edit-user-form">

      <div 
        className="banner" 
        style={{ backgroundImage: `url('${bannerUrl}')` }}
        {...getRootBannerProps()}
    >
        <input {...getInputBannerProps()} />
        <Camera />
      </div>

      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
        {...getRootAvatarProps()}
      >
        <input {...getInputAvatarProps()} />
        <Camera />
      </div>

      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control 
                type="text"
                placeholder="Name"
                name="name"
                defaultValue={formData.name}
                onChange={onChange}
              />
            </Col>
            <Col>
              <Form.Control 
                type="text"
                placeholder="Last Name"
                name="lastname"
                defaultValue={formData.lastname}
                onChange={onChange}
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
             onChange={onChange}
         />
        </Form.Group>
          
        <Form.Group>
          <Form.Control 
            type="text"
            placeholder="Sitio web"
            name="website"
            defaultValue={formData.website}
            onChange={onChange}
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
