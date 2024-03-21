import React from 'react';
import PropTypes from 'prop-types';

function Filters({ arrayFilters, setArrayFilters, tableColumnBr }) {
  return (
    <>
      <p className="title-filter">Filtros</p>
      {arrayFilters.map((data, index) => (
        <div key={ `data-${index}` } className="filter-container">
          <p className="text-filter" data-testid="filter">
            {`${tableColumnBr[data.column]} ${data.comparison} ${data.valueNumber}`}
          </p>
          <button
            type="button"
            className="button-remove"
            onClick={ ({ target }) => setArrayFilters(arrayFilters
              .filter((e) => e.column !== target.value)) }
            value={ data.column }
            data-testid="button-remove-filter"
          >
            x
          </button>
        </div>
      ))}
    </>
  );
}

Filters.propTypes = {
  arrayFilters: PropTypes.arrayOf(PropTypes.shape({
    column: PropTypes.string,
    comparison: PropTypes.string,
    valueNumber: PropTypes.number,
  })).isRequired,
  setArrayFilters: PropTypes.func.isRequired,
  tableColumnBr: PropTypes.shape({
    population: PropTypes.string,
    orbital_period: PropTypes.string,
    diameter: PropTypes.string,
    rotation_period: PropTypes.string,
    surface_water: PropTypes.string,
  }).isRequired,
};

export default Filters;
