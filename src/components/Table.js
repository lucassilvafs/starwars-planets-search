import React, { useEffect, useState } from 'react';
import InputRadio from './InputRadio';
import TableBody from './TableBody';

const tableHeader = ['Nome', 'Tempo de rotação', 'Tempo de órbita',
  'Diâmetro', 'Clima', 'Gravidade', 'Tipo de terreno', 'Água?', 'População',
  'Films', 'Criação', 'Edição', 'Imagem'];

const tableColumns = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];

function Table() {
  const [dataPlanets, setDataPlanets] = useState([]);
  const [arrayFilters, setArrayFilters] = useState([]);
  // const [sortByColumn, setSortByColumn] = useState({});
  const [columnSort, setColumnSort] = useState(tableColumns[0]);
  const [valueInput, setValueInput] = useState('');
  const [filteredData, setFilteredData] = useState({
    searchFiltered: [],
    column: 'population',
    comparison: 'maior que',
    valueNumber: 0,
    isCliked: false,
  });

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json(); // const dataResults = data.results;
      setDataPlanets(data.results.filter((key) => delete key.residents));
    };
    fetchPlanets();
  }, []);

  const filteredPlanets = dataPlanets.filter((planet) => planet.name
    .toLowerCase().includes(valueInput.toLowerCase()));

  const arrayFiltersColumns = arrayFilters.map((e) => e.column);

  const columnFiltered = tableColumns.filter((e) => !arrayFiltersColumns.includes(e));

  const handleFilter = () => {
    let filtered = [];
    const isFilter = arrayFilters.length === 1
      ? filteredPlanets : filteredData.searchFiltered;

    arrayFilters.forEach((filter) => {
      if (filter.comparison === 'maior que') {
        filtered = isFilter.filter((planet) => (
          +planet[filter.column] > +filter.valueNumber
        ));
      } else if (filter.comparison === 'menor que') {
        filtered = isFilter.filter((planet) => (
          +planet[filter.column] < +filter.valueNumber
        ));
      } else if (filter.comparison === 'igual a') { // if (filter.comparison === 'igual a')
        filtered = isFilter.filter((planet) => (
          +planet[filter.column] === +filter.valueNumber
        ));
      }
    });
    setFilteredData({
      ...filteredData,
      searchFiltered: filtered,
      column: 'population',
      comparison: 'maior que',
      valueNumber: 0,
      isCliked: true,
    });
  };

  const handleLoadAllData = () => {
    let filtered = [];
    if (filteredData.comparison === 'maior que') {
      filtered = filteredPlanets.filter((planet) => (
        +planet[filteredData.column] > +filteredData.valueNumber
      ));
    } else if (filteredData.comparison === 'menor que') {
      filtered = filteredPlanets.filter((planet) => (
        +planet[filteredData.column] < +filteredData.valueNumber
      ));
    } else if (filter.comparison === 'igual a') { // if (filter.comparison === 'igual a')
      filtered = filteredPlanets.filter((planet) => (
        +planet[filteredData.column] === +filteredData.valueNumber
      ));
    }
    setFilteredData({
      ...filteredData,
      searchFiltered: filtered,
      column: 'population',
      comparison: 'maior que',
      valueNumber: 0,
      isCliked: false,
    });
  };

  useEffect(() => {
    if (arrayFilters.length > 0) {
      handleFilter();
    } else {
      handleLoadAllData();
    }
  }, [arrayFilters]);

  const handleChange = ({ target }) => {
    setFilteredData({
      ...filteredData,
      [target.name]: target.value,
    });
  };

  const handleClick = () => {
    setArrayFilters([...arrayFilters,
      { column: filteredData.column,
        comparison: filteredData.comparison,
        valueNumber: filteredData.valueNumber,
      },
    ]);
  };

  return (
    <div>
      <section>
        <input
          type="text"
          value={ valueInput }
          placeholder="Buscar"
          data-testid="name-filter"
          onChange={ ({ target }) => setValueInput(target.value) }
        />
      </section>

      <section>
        <label htmlFor="column">
          Coluna
          <select
            id="column"
            name="column"
            value={ filteredData.column }
            data-testid="column-filter"
            onChange={ handleChange }
          >
            {columnFiltered.map((column) => (
              <option key={ `index-${column}` } value={ column }>{ column }</option>
            ))}
          </select>
        </label>

        <label htmlFor="comparison">
          Operador
          <select
            name="comparison"
            id="comparison"
            data-testid="comparison-filter"
            value={ filteredData.comparison }
            onChange={ handleChange }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <input
          type="number"
          name="valueNumber"
          placeholder="Valor"
          value={ filteredData.valueNumber }
          data-testid="value-filter"
          onChange={ handleChange }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </section>

      <section>
        { arrayFilters
        && arrayFilters.map((data, index) => (
          <div key={ `data-${index}` }>
            <p data-testid="filter">
              { `${data.column} ${data.comparison} ${data.valueNumber}` }
              <button
                type="button"
                onClick={ ({ target }) => setArrayFilters(arrayFilters
                  .filter((e) => e.column !== target.value)) }
                value={ data.column }
                data-testid="button-remove-filter"
              >
                Remover
              </button>
            </p>
          </div>
        ))}
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => setArrayFilters([]) }
        >
          Remover todos os filtros
        </button>
      </section>

      <label htmlFor="column">
        Coluna
        <select
          id="column"
          name="column"
          value={ columnSort }
          data-testid="column-sort"
          onChange={ ({ target }) => setColumnSort(target.value) }
        >
          {columnFiltered.map((column) => (
            <option key={ `index-${column}` } value={ column }>{ column }</option>
          ))}
        </select>
      </label>
      <InputRadio />

      <table>
        <thead>
          <tr>
            { tableHeader.map((name) => (
              <th key={ name }>{ name }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            !filteredData.isCliked
              ? (filteredPlanets.map((planet) => (
                <TableBody key={ planet.name } planet={ planet } />
              )))
              : (filteredData.searchFiltered.map((planet) => (
                <TableBody key={ planet.name } planet={ planet } />
              )))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
