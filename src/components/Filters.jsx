import React from 'react';

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

export default Filters;
