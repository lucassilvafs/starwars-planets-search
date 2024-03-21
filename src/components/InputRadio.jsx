import PropTypes from 'prop-types';
import React, { useState } from 'react';
import '../styles/InputRadio.css';

function InputRadio({ handleSort }) {
  const [directionSort, setDirectionSort] = useState('ASC');
  return (
    <div className="radio-container">
      <section className="input-radio">
        <label htmlFor="directionSort1">
          <input
            className="form-check-input radio-input-asc"
            data-testid="column-sort-input-asc"
            id="directionSort1"
            type="radio"
            name="directionSort"
            value="ASC"
            checked={ directionSort === 'ASC' }
            onChange={ ({ target }) => setDirectionSort(target.value) }
          />
          Ascendente
        </label>

        <label htmlFor="directionSort2">
          <input
            className="form-check-input radio-input-desc"
            data-testid="column-sort-input-desc"
            id="directionSort2"
            type="radio"
            name="directionSort"
            value="DESC"
            onChange={ ({ target }) => setDirectionSort(target.value) }
          />
          Descendente
        </label>
      </section>

      <button
        type="button"
        data-testid="column-sort-button"
        className="btn btn-outline-warning button-sort"
        onClick={ () => handleSort(directionSort) }
      >
        Ordenar
      </button>
    </div>
  );
}

InputRadio.propTypes = {
  handleSort: PropTypes.func.isRequired,
};

export default InputRadio;
