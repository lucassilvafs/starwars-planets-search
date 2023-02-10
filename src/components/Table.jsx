import React from 'react';
// import InputRadio from './InputRadio';
// import TableBody from './TableBody';
// import TableHead from './TableHead';

const tableHeader = ['Nome', 'Tempo de rotação', 'Tempo de órbita',
  'Diâmetro', 'Clima', 'Gravidade', 'Tipo de terreno', 'Água?', 'População',
  'Films', 'Criação', 'Edição', 'Imagem'];

function Table({ filteredData, filteredPlanets }) {
  return (
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
  );
}

Table.propTypes = {
  filteredData: PropTypes.shape({
    isCliked: PropTypes.bool,
    searchFiltered: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      rotation_period: PropTypes.string,
      orbital_period: PropTypes.string,
      diameter: PropTypes.string,
      climate: PropTypes.string,
      gravity: PropTypes.string,
      terrain: PropTypes.string,
      surface_water: PropTypes.string,
      population: PropTypes.string,
      films: PropTypes.string,
      created: PropTypes.string,
      edited: PropTypes.string,
      url: PropTypes.string,
    })).isRequired,
  }).isRequired,
  filteredPlanets: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    rotation_period: PropTypes.string,
    orbital_period: PropTypes.string,
    diameter: PropTypes.string,
    climate: PropTypes.string,
    gravity: PropTypes.string,
    terrain: PropTypes.string,
    surface_water: PropTypes.string,
    population: PropTypes.string,
    films: PropTypes.string,
    created: PropTypes.string,
    edited: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
};

export default Table;
