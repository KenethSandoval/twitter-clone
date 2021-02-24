import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUsers, faComment } from '@fortawesome/free-solid-svg-icons';

import BasicModal from '../../components/Modal/BasicModal';
import SignUpForm from '../../components/SignUpForm' 
import SignInForm from '../../components/SignInForm';

import LogoWhite from '../../assets/img/logo-white.png';
import Logo from '../../assets/img/logo.png';

import './Auth.scss';

export default function Auth() {
  const [showModal, setShowModal] = useState(false);
  const [ contentModal, setContentModal ] = useState(null);

  //Se encarga de abrir el modal y pasar el contenido del mismo por el parametro de la función
  const openModal = content => {
    setShowModal(true);
    setContentModal(content);
  }

  return (
    <>
      <Container className="signin-signup" fluid>
        <Row>
        <LeftComponent />
        <RightComponent 
          openModal={openModal}
          setShowModal={setShowModal}
        />
        </Row>
      </Container>
      <BasicModal 
        show={showModal}
        setShow={setShowModal}
      >
        {contentModal}
      </BasicModal>
    </>
  );  
}

function LeftComponent() {
  return (
    <Col className="signin-signup__left" xs={ 6 }>
      <img src={ Logo } alt="Twittor" />
      <div>
        <h2>
          <FontAwesomeIcon icon={faSearch} />
          Sigue lo que te interesa.
        </h2>
        <h2>
          <FontAwesomeIcon icon={faUsers} />
          Enterate de que está hablando la gente.
        </h2>
        <h2> 
          <FontAwesomeIcon icon={faComment} />
          Únete a la conversación 
        </h2>
      </div>
    </Col>
  );
}

function RightComponent(props) {
  const { openModal, setShowModal } = props;

  return (
    <Col className="signin-signup__right" xs={ 6 }>
      <div>
        <img src={LogoWhite} alt="Twittor"/>
        <h2>Mira lo que paso en el mundo en este momento.</h2>
        <h3>Únete a Twittor hoy mismo</h3>
        <Button 
          variant="primary"
          onClick={() => openModal(<SignUpForm setShowModal={setShowModal} />)}
        >
          Regístrate
        </Button>
        <Button 
          variant="outline-primary"
          onClick={() => openModal(<SignInForm />)}
        >
          Inicar sesión
        </Button>
      </div>
    </Col>
  );
}
