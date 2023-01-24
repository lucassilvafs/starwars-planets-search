import React, { useEffect, useState } from 'react';

function Table() {
  const [dataAPI, setDataAPI] = useState([]);
  const [valueInput, setValueInput] = useState('');
  const [filteredData, setFilteredData] = useState({
    searchFiltered: [],
    column: 'population',
    comparison: 'maior que',
    inputNumber: 0,
    isCliked: false,
  });

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      setDataAPI(data.results);
    };
    fetchPlanets();
  }, []);

  const tableHeader = ['Nome', 'Tempo de rotação', 'Tempo de órbita',
    'Diâmetro', 'Clima', 'Gravidade', 'Tipo de terreno', 'Água?', 'População',
    'Films', 'Criação', 'Edição', 'Imagem'];

  const planets = dataAPI.filter((key) => delete key.residents);

  const filteredPlanets = planets.filter((planet) => planet.name
    .toLowerCase().includes(valueInput.toLowerCase()));

  const handleChange = ({ target }) => {
    setFilteredData({
      ...filteredData,
      [target.name]: target.value,
    });
  };

  const handleClick = () => {
    if (filteredData.comparison === 'maior que') {
      const filtered = filteredPlanets.filter((planet) => (
        +planet[filteredData.column] > +filteredData.inputNumber
      ));
      setFilteredData({
        ...filteredData,
        searchFiltered: filtered,
        column: 'population',
        comparison: 'maior que',
        inputNumber: 0,
        isCliked: true,
      });
    } else if (filteredData.comparison === 'menor que') {
      const filtered = filteredPlanets.filter((planet) => (
        +planet[filteredData.column] < +filteredData.inputNumber
      ));
      setFilteredData({
        ...filteredData,
        searchFiltered: filtered,
        column: 'population',
        comparison: 'maior que',
        inputNumber: 0,
        isCliked: true,
      });
    } else {
      const filtered = filteredPlanets.filter((planet) => (
        +planet[filteredData.column] === +filteredData.inputNumber
      ));
      setFilteredData({
        ...filteredData,
        searchFiltered: filtered,
        column: 'population',
        comparison: 'maior que',
        inputNumber: 0,
        isCliked: true,
      });
    }
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
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
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
          name="inputNumber"
          placeholder="Valor"
          value={ filteredData.inputNumber }
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

      <table>
        <thead>
          <tr>
            { tableHeader.map((name) => (
              <th key={ name }>{ name }</th>
            ))}
          </tr>
        </thead>
        {
          !filteredData.isCliked
            ? (filteredPlanets.map((planet) => (
              <tbody key={ planet.name }>
                <tr>
                  <td>{planet.name}</td>
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
              </tbody>
            ))) : (
              filteredData.searchFiltered.map((planet) => (
                <tbody key={ planet.name }>
                  <tr>
                    <td>{planet.name}</td>
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
                </tbody>
              ))
            )
        }
      </table>

    </div>
  );
}

export default Table;
