import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileTop = ({
  profile: {
    gender,
    birthday,
    occupation,
    location,
    description,
    social,
    user: { name, avatar }
  }
}) => {
  return (
    <div className='profile-top bg-primary p-1'>
      <img className='round-img my-1' src={avatar} alt='' />
      <h1 className='large'>{name}</h1>
      <p>
        {gender} <Moment format='YYYY/MM/DD'>{birthday}</Moment> {occupation}{' '}
        {location}
      </p>
      <p>{description}</p>
      <div className='icons my-1'>
        {social && social.twitter && (
          <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-twitter fa-2x' />
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x' />
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-linkedin fa-2x' />
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-youtube fa-2x' />
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-instagram fa-2x' />
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = { profile: PropTypes.object.isRequired };

export default ProfileTop;
