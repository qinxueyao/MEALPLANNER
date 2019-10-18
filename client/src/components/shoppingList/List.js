import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getList } from '../../actions/list';
import RecipeItem from '../dashboard/RecipeItem';

const List = ({ getList, auth, list }) => {
  useEffect(() => {
    getList();
  }, [getList]);

  return list === null && list.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>My Shopping List</h1>
      {list !== null ? (
        <Fragment>
          {list.recipes.length > 0 ? (
            list.recipes.map(recipe => (
              <RecipeItem key={recipe._id} recipe={recipe} />
            ))
          ) : (
            <Fragment>
              <p>You have not yet created a list</p>
              <Link to='/create-list' className='btn btn-primary my-1'>
                Create List
              </Link>
            </Fragment>
          )}
        </Fragment>
      ) : (
        <p>create a list</p>
      )}
    </Fragment>
  );
};

List.propTypes = {
  getList: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  list: state.list,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getList }
)(List);
