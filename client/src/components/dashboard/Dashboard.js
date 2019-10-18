import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import ProfileTop from './ProfileTop';
import MyRecipes from './MyRecipes';
import { getCurrentProfile } from '../../actions/profile';
import { getCurrentUserRecipes } from '../../actions/recipes';

const Dashboard = ({
  getCurrentProfile,
  getCurrentUserRecipes,
  auth: { user },
  profile: { profile, loading },
  recipes: { myrecipes }
}) => {
  useEffect(() => {
    getCurrentProfile();
    getCurrentUserRecipes();
  }, [getCurrentProfile, getCurrentUserRecipes]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.username}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
      {myrecipes !== null ? (
        <Fragment>
          <MyRecipes myrecipes={myrecipes} />
        </Fragment>
      ) : (
        <Fragment>
          <p>You do not have a recipe, try create one</p>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getCurrentUserRecipes: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  myrecipes: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  recipes: state.recipes
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getCurrentUserRecipes }
)(Dashboard);
