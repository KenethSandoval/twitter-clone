import React from 'react';
import { API_HOST } from '../../../utils/constant';
import AvatarNoFound from '../../../assets/img/avatar-no-found.png';

import './BannerAvatar.scss';

export default function BannerAvatar(props) {
  const { user } = props;
  const bannerUrl = user?.banner ? `${API_HOST}/obtenerBanner?id=${user.id}` : null;
  const avatarUrl = user?.avatar ? `${API_HOST}/obtenerAvatar?id=${user.id}` : AvatarNoFound;
  return (
    <div className="banner-avatar" style={{ backgroundImage: `url('${bannerUrl}')` }}>
      <div className="avatar"style={{ backgroundImage: `url('${avatarUrl}')` }}></div>
    </div>
  )
}
