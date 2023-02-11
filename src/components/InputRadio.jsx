import PropTypes from 'prop-types';
import React, { useState } from 'react';

function InputRadio({ handleSort }) {
  const [directionSort, setDirectionSort] = useState('ASC');
  return (
    <div>
      <label htmlFor="directionSort1">
        <input
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
          data-testid="column-sort-input-desc"
          id="directionSort2"
          type="radio"
          name="directionSort"
          value="DESC"
          onChange={ ({ target }) => setDirectionSort(target.value) }
        />
        Descendente
      </label>

      <button
        type="button"
        data-testid="column-sort-button"
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
