import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom'
import BasicLayout from '../../layout/BasicLayout';
import BannerAvatar from '../../components/User/BannerAvatar';
import InfoUser from '../../components/User/InfoUser';
import { getUserApi } from '../../api/user';
import { getUserTweetApi } from '../../api/tweet';
import userAuth from '../../hooks/userAuth';

import './User.scss';

function User(props) {
  //estado para ver la existencia del usario
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState(null);
  const { match } = props;
  const loggedUser = userAuth();

  //cada vez que el params cambie la pagina trae un nuevo resultado 
  useEffect(() => {
    getUserApi(match.params.id).then(response => {
      setUser(response);
      //si el params no existe(id invalido)
      if(!response) {
        toast.error("El usuario que has visitado no existe"); 
      }
    }).catch(() => {
      toast.error("El usuario que has visitado no existe"); 
    });
  }, [match.params]);
 
  useEffect(() => {
     getUserTweetApi(match.params.id, 1)
      .then(response => {
        setTweets(response);
      })
      .catch(() => {
        setTweets([]);
      });
  }, [match.params]);
 
  return (
    <BasicLayout className="user">
      <div className="user__title">
        <h2>
          {user ? `${user.name} ${user.lastname}` : "El usuario no existe"}
        </h2>
      </div>
      <BannerAvatar user={user} loggedUser={loggedUser}/> 
      <InfoUser user={user}/>
      <div className="user__tweets">Lista de tweets</div>
    </BasicLayout>
  )
}

export default withRouter(User);
