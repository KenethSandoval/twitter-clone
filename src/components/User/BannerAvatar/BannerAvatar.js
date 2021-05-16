import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import { API_HOST } from '../../../utils/constant';
import ConfigModal from '../../Modal/ConfigModal';
import EditUserForm from '../../User/EditUserForm';
import AvatarNoFound from '../../../assets/img/avatar-no-found.png';
import { checkFollowApi, followUserApi, unfollowUserApi } from '../../../api/follow';

import './BannerAvatar.scss';

export default function BannerAvatar(props) {
  const { user, loggedUser } = props;
  const [showModal, setShowModal] = useState(false);
  const [following, setFollowing] = useState(null);
  const [reloadFollow, setReloadFollow] = useState(false);

  const bannerUrl = user?.banner ? `${API_HOST}/obtenerBanner?id=${user.id}` : null;
  const avatarUrl = user?.avatar ? `${API_HOST}/obtenerAvatar?id=${user.id}` : AvatarNoFound;
 
  //se va a encargar de verificar si seguimos al usuario
  useEffect(() => {
   if(user) { 
    checkFollowApi(user?.id)
      .then(response => {
        if (response?.status) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });

    setReloadFollow(false);
   }
  }, [user, reloadFollow])

  const onFollow = () => {
    followUserApi(user.id)
      .then(() => {
        setReloadFollow(true);
      });
  }

  const offunFollow = () => {
    unfollowUserApi(user.id)
      .then(() => {
        setReloadFollow(true);
      });
  }

  return (
    <div className="banner-avatar" style={{ backgroundImage: `url('${bannerUrl}')` }}>
      <div className="avatar"style={{ backgroundImage: `url('${avatarUrl}')` }}></div>
      {user && (
        <div className="options">
          {loggedUser._id === user.id && (
            <Button
              onClick={() => setShowModal(true)}  
            >
              Editar perfil
            </Button>
          )}
          
          {loggedUser._id !== user.id && (
            following !== null && (
              (following ? 
                <Button onClick={offunFollow} className="unfollow">
                  <span>Following</span>
                </Button> 
                :
                <Button onClick={onFollow}>Follow</Button>
              )
              
            )
          )}
        </div>
      )}

      <ConfigModal 
        show={showModal}
        setShow={setShowModal} 
        title="Editar Perfil"
      >
        <EditUserForm user={user} setShowModal={setShowModal}/>
      </ConfigModal>
    </div>
  )
}
