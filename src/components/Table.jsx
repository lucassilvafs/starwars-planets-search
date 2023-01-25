import React, { useEffect, useState } from 'react';

function Table() {
  const [dataPlanets, setDataPlanets] = useState([]);
  const [arrayFilters, setArrayFilters] = useState([]);
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
      const data = await response.json();
      // const dataResults = data.results;
      setDataPlanets(data.results.filter((key) => delete key.residents));
    };
    fetchPlanets();
  }, []);

  const tableHeader = ['Nome', 'Tempo de rotação', 'Tempo de órbita',
    'Diâmetro', 'Clima', 'Gravidade', 'Tipo de terreno', 'Água?', 'População',
    'Films', 'Criação', 'Edição', 'Imagem'];

  const tableColumns = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  const filteredPlanets = dataPlanets.filter((planet) => planet.name
    .toLowerCase().includes(valueInput.toLowerCase()));

  const arrayFiltersColumns = arrayFilters.map((e) => e.column);

  const columnFiltered = tableColumns.filter((e) => !arrayFiltersColumns.includes(e));

  const handleChange = ({ target }) => {
    setFilteredData({
      ...filteredData,
      [target.name]: target.value,
    });
  };

  const handleClick = () => {
    let filtered = [];
    const isFilter = filteredData.isCliked
      ? filteredData.searchFiltered : filteredPlanets;

    if (filteredData.comparison === 'maior que') {
      filtered = isFilter.filter((planet) => (
        +planet[filteredData.column] > +filteredData.valueNumber
      ));
    } else if (filteredData.comparison === 'menor que') {
      filtered = isFilter.filter((planet) => (
        +planet[filteredData.column] < +filteredData.valueNumber
      ));
    } else { // if (filteredData.comparison === 'menor que')
      filtered = isFilter.filter((planet) => (
        +planet[filteredData.column] === +filteredData.valueNumber
      ));
    }
    setArrayFilters([...arrayFilters,
      { column: filteredData.column,
        comparison: filteredData.comparison,
        valueNumber: filteredData.valueNumber,
      },
    ]);
    setFilteredData({
      ...filteredData,
      searchFiltered: filtered,
      column: 'population',
      comparison: 'maior que',
      valueNumber: 0,
      isCliked: true,
    });
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
            <p data-testid="data">
              { `${data.column} ${data.comparison} ${data.valueNumber}` }
              <button
                type="button"
                // onClick={ handleRemoveFilter }
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
          // onClick={ removeAll }
        >
          Remover todos os filtros
        </button>
      </section>

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
                <tr key={ planet.name }>
                  <td data-testid="planet-name">{planet.name}</td>
                  <td>{planet.rotation_period}</td>
                  <td>{planet.orbital_period}</td>
                  <td>{planet.diameter}</td>
                  <td>{planet.climate}</td>
                  <td>{planet.gravity}</td>
                  <td>{planet.terrain}</td>
                  <td>{planet.surface_water}</td>
                  <td>{planet.population}</td>
                  <td>{planet.films}</td>
                  <td>{planet.created}</td>
                  <td>{planet.edited}</td>
                  <td>{planet.url}</td>
                </tr>
              )))
              : (filteredData.searchFiltered.map((planet) => (
                <tr key={ planet.name }>
                  <td data-testid="planet-name">{planet.name}</td>
                  <td>{planet.rotation_period}</td>
                  <td>{planet.orbital_period}</td>
                  <td>{planet.diameter}</td>
                  <td>{planet.climate}</td>
                  <td>{planet.gravity}</td>
                  <td>{planet.terrain}</td>
                  <td>{planet.surface_water}</td>
                  <td>{planet.population}</td>
                  <td>{planet.films}</td>
                  <td>{planet.created}</td>
                  <td>{planet.edited}</td>
                  <td>{planet.url}</td>
                </tr>
              )))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
