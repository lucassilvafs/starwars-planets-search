import PropTypes from 'prop-types';
import React from 'react';

function TableBody({ planet }) {
  return (
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
  );
}

TableBody.propTypes = {
  planet: PropTypes.shape({
    climate: PropTypes.string,
    created: PropTypes.string,
    diameter: PropTypes.number,
    edited: PropTypes.string,
    films: PropTypes.string,
    gravity: PropTypes.string,
    name: PropTypes.string,
    orbital_period: PropTypes.number,
    population: PropTypes.number,
    rotation_period: PropTypes.number,
    surface_water: PropTypes.number,
    terrain: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default TableBody;
