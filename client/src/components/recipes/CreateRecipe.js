import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createRecipe } from '../../actions/recipes';

const CreateRecipe = ({
  createRecipe,
  recipes: { recipe, loading },
  history
}) => {
  const [formData, setFormData] = useState({
    title: '',
    prep_time: '',
    cook_time: '',
    for_how_many: ''
  });
  const { title, prep_time, cook_time, for_how_many } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    createRecipe(formData, history);
  };

  return loading && recipe === null ? (
    <Redirect to='/dashboard' />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Share your recipe!</h1>
      <small>* = required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='title'
            name='title'
            value='title'
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='prepration time'
            name='prep_time'
            value='prep_time'
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='cook time'
            name='cook_time'
            value='cook_time'
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='for how many people'
            name='for_how_many'
            value='for_how_many'
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateRecipe.propTypes = {
  createRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipes
});

export default connect(
  mapStateToProps,
  { createRecipe }
)(withRouter(CreateRecipe));
