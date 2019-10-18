import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RecipeItem from './RecipeItem';

const MyRecipes = ({ recipes: { myrecipes } }) => {
  return (
    <Fragment>
      <h2 className='text-primary'>My Recipes</h2>
      <div className='recipes'>
        {myrecipes.map(recipe => (
          <RecipeItem key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </Fragment>
  );
};

MyRecipes.propTypes = {
  recipes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipes
});

export default connect(mapStateToProps)(MyRecipes);
