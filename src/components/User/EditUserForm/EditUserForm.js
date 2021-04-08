import React, { useState, useCallback } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify';

import { API_HOST } from '../../../utils/constant';
import { Camera } from '../../../utils/icons';
import { uploadBannerApi, uploadAvatarApi, updateInfoApi } from '../../../api/user';

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

  //estado para el spinner
  const [loading, setLoading] = useState(false);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(bannerFile) {
      await uploadBannerApi(bannerFile).catch(() => {
        toast.error("Error al subir el nuevo banner");
      });
    }

    if (avatarFile) {
      await uploadAvatarApi(avatarFile).catch(() => {
        toast.error("Error al subir el nuevo avatar.");
      });
    }

    await updateInfoApi(formData).then(() => {
      setShowModal(false);
    })
    .catch(() => {
      toast.error("Error al actualizar los datos");
    });
    
    setLoading(false);
    window.location.reload();
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
        className="avatar" style={{ backgroundImage: `url('${avatarUrl}')` }}
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
             name="biography"
             defaultValue={formData.biography}
             onChange={onChange}
         />
        </Form.Group>
          
        <Form.Group>
          <Form.Control 
            type="text"
            placeholder="Sitio web"
            name="website"
            defaultValue={formData.webSite}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group>
          <DatePicker 
            placeholder="Fecha de nacimiento"
            selected={new Date(formData.birthdate)}
            onChange={ value => 
              setFormData({ ...formData, birthdate: value })
            }
          />
        </Form.Group>

         <Button className="btn-submit" variant="primary" type="submit">
          { loading && <Spinner animation="border" size="sm" /> } Actualizar
         </Button>
      </Form>
    </div>
  )
}

function initialValue(user) {
  return {
    name: user.name || "",
    lastname: user.lastname || "",
    biography: user.biography || "",
    location: user.location || "",
    webSite: user.webSite || "",
    birthdate: user.birthdate || "",
  }
}
