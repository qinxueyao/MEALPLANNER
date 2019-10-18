import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editRecipe, deleteRecipe } from '../../actions/recipes';
import { addToList } from '../../actions/list';

const RecipeItem = ({
  addToList,
  editRecipe,
  deleteRecipe,
  auth,
  recipe: { _id, user, title, prep_time, cook_time, for_how_many }
}) => {
  return (
    <div className='recipe bg-white p-1 my-1'>
      <h1 className='text-primary'>{title}</h1>
      <h4>
        by <strong>{user.username}</strong>
      </h4>
      <p>
        prep time: {prep_time}, cook time: {cook_time}, for: {for_how_many}
      </p>
      <Link to={`/recipes/${_id}`}>Details</Link>
      <button
        onClick={() => addToList(_id)}
        type='button'
        className='btn btn-success'
      >
        Add to list
      </button>
      <button
        onClick={() => editRecipe(_id)}
        type='button'
        className='btn btn-light'
      >
        Edit recipe
      </button>
      {!auth.loading && user._id === auth.user._id && (
        <button
          onClick={() => deleteRecipe(_id)}
          type='button'
          className='btn btn-danger'
        >
          Delete recipe
        </button>
      )}
    </div>
  );
};

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addToList: PropTypes.func.isRequired,
  editRecipe: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { addToList, editRecipe, deleteRecipe }
)(RecipeItem);
