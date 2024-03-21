import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import InputRadio from '../components/InputRadio';
import '../styles/Home.css';
import Filters from '../components/Filters';

const tableColumns = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];

const tableColumnBr = {
  population: 'População',
  orbital_period: 'Tempo de órbita',
  diameter: 'Diâmetro',
  rotation_period: 'Tempo de rotação',
  surface_water: 'Superfície da água',
};

function Home() {
  const [dataPlanets, setDataPlanets] = useState([]);
  const [arrayFilters, setArrayFilters] = useState([]);
  const [sortByColumn, setSortByColumn] = useState(
    { order: { column: 'population', sort: 'ASC' } },
  );
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
      } else if (filter.comparison === 'igual a') {
        filtered = isFilter.filter((planet) => (
          +planet[filter.column] === +filter.valueNumber
        ));
      }
    });
    setFilteredData({
      ...filteredData,
      searchFiltered: filtered,
      column: columnFiltered[0],
      comparison: 'maior que',
      valueNumber: 0,
      isCliked: true,
    });
  };

  const handleLoadAllData = () => {
    let filtered = [];
    filtered = filteredPlanets.filter((planet) => (
      +planet[filteredData.column] > +filteredData.valueNumber
    ));
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
    if (columnFiltered.length > 0) {
      setArrayFilters([...arrayFilters,
        { column: filteredData.column,
          comparison: filteredData.comparison,
          valueNumber: filteredData.valueNumber,
        },
      ]);
      return;
    }

    alert('Limite de filtros excedido!');
  };

  useEffect(() => {
    const { order: { column, sort } } = sortByColumn;
    const toSort = [...dataPlanets];
    toSort.sort((a, b) => {
      if (sort === 'ASC') {
        return a[column] - b[column];
      }
      return b[column] - a[column];
    });
    const top = toSort.filter((e) => e[column] !== 'unknown');
    const bot = toSort.filter((e) => e[column] === 'unknown');
    const sortedPlanets = [...top, ...bot];
    setDataPlanets(sortedPlanets);
  }, [sortByColumn]);

  const handleSort = (directionSort) => {
    setSortByColumn({ order: { column: columnSort, sort: directionSort } });
  };

  return (
    <div className="container-principal">
      <p className="title">Star Wars - Planetas</p>
      <input
        type="text"
        className="form-control input-filter"
        value={ valueInput }
        placeholder="Buscar"
        data-testid="name-filter"
        onChange={ ({ target }) => setValueInput(target.value) }
      />
      <div className="mid-container">
        <label htmlFor="column">
          Coluna
          <select
            id="column"
            className="form-select"
            name="column"
            value={ filteredData.column }
            data-testid="column-filter"
            onChange={ handleChange }
          >
            {columnFiltered.map((column) => (
              <option key={ `index-${column}` } value={ column }>
                { tableColumnBr[column] }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="comparison">
          Operador
          <select
            name="comparison"
            className="form-select"
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
        <label htmlFor="valueNumber">
          Valor
          <input
            type="number"
            className="form-control input-value"
            name="valueNumber"
            placeholder="Valor"
            value={ filteredData.valueNumber }
            data-testid="value-filter"
            onChange={ handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          className="filter-button btn btn-outline-warning"
          onClick={ handleClick }
        >
          Filtrar
        </button>

        <hr width="2" size="80" color="white" />

        <label htmlFor="column">
          Ordenar por
          <select
            id="column"
            className="form-select"
            name="column"
            value={ columnSort }
            data-testid="column-sort"
            onChange={ ({ target }) => setColumnSort(target.value) }
          >
            {columnFiltered.map((column) => (
              <option key={ `index-${column}` } value={ column }>
                { tableColumnBr[column] }
              </option>
            ))}
          </select>
        </label>
        <InputRadio handleSort={ handleSort } />
        <button
          type="button"
          data-testid="button-remove-filters"
          className="btn btn-outline-warning button-remove-all"
          onClick={ () => setArrayFilters([]) }
        >
          Remover todos os filtros
        </button>
      </div>
      { arrayFilters.length > 0
        ? (
          <Filters
            arrayFilters={ arrayFilters }
            setArrayFilters={ setArrayFilters }
            tableColumnBr={ tableColumnBr }
          />
        ) : null }
      <Table filteredData={ filteredData } filteredPlanets={ filteredPlanets } />
    </div>
  );
}

export default Home;
