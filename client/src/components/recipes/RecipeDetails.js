import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Spinner from '../layout/Spinner';
import {
  likeRecipe,
  editRecipe,
  deleteRecipe,
  getRecipeByID
} from '../../actions/recipes';
import { addToList } from '../../actions/list';

const RecipeDetails = ({
  addToList,
  likeRecipe,
  editRecipe,
  deleteRecipe,
  getRecipeByID,
  recipes: { recipe, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getRecipeByID(match.params.id);
  }, [getRecipeByID, match.params.id]);

  let ingredientsList = null;
  if (recipe !== null && !loading) {
    ingredientsList = recipe.ingredients.map(ing => (
      <tr key={ing._id}>
        <td>{ing.item_name}</td>
        <td>{ing.quantity}</td>
      </tr>
    ));
  }

  let prep_steps = null;
  if (recipe !== null && !loading) {
    prep_steps = recipe.prep_work.map(prep => <p key={prep._id}>{prep}</p>);
  }

  let true_steps = null;
  if (recipe !== null && !loading) {
    true_steps = recipe.steps.map(step => <p key={step._id}>{step.text}</p>);
  }

  let comments1 = null;
  if (recipe !== null && !loading) {
    comments1 = recipe.comments.map(comment => (
      <p key={comment._id}>
        {comment.date}, {comment.name}:{comment.text}{' '}
      </p>
    ));
  }

  return (
    <Fragment>
      {recipe === null || loading ? (
        <Spinner />
      ) : (
        <div className='recipe bg-white'>
          <h1 className='large text-primary'>{recipe.title}</h1>
          <button
            onClick={() => addToList(recipe._id)}
            type='button'
            className='btn btn-success'
          >
            Add to list
          </button>
          {!auth.loading && auth.user._id === recipe.user._id && (
            <Fragment>
              <button
                onClick={() => editRecipe(recipe._id)}
                type='button'
                className='btn btn-light'
              >
                Edit recipe
              </button>
              <button
                onClick={() => deleteRecipe(recipe._id)}
                type='button'
                className='btn btn-danger'
              >
                Delete recipe
              </button>
            </Fragment>
          )}
          <h4>
            created by{' '}
            <strong>
              {recipe.user.username} on{' '}
              <Moment format='YYYY/MM/DD'>{recipe.date}</Moment>
            </strong>
          </h4>
          <h4>liked by {recipe.likes.length} users</h4>
          <button
            onClick={() => likeRecipe(recipe._id)}
            type='button'
            className='btn btn-light'
          >
            Like this recipe
          </button>
          <p>
            prep time: {recipe.prep_time}, cook time: {recipe.cook_time}, for:{' '}
            {recipe.for_how_many} people
          </p>
          <h2 className='my-1'>Ingredients</h2>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>{ingredientsList}</tbody>
          </table>
          <div>
            <h2 className='my-1'>Prep work</h2>
            {prep_steps}
          </div>
          <div>
            <h2 className='my-1'>Steps</h2>
            {true_steps}
          </div>
          <div>
            <h2 className='my-1'>Comments</h2>
            {comments1}
          </div>
        </div>
      )}
    </Fragment>
  );
};

RecipeDetails.propTypes = {
  addToList: PropTypes.func.isRequired,
  likeRecipe: PropTypes.func.isRequired,
  editRecipe: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  getRecipeByID: PropTypes.func.isRequired,
  recipes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipes,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addToList, likeRecipe, editRecipe, deleteRecipe, getRecipeByID }
)(RecipeDetails);
