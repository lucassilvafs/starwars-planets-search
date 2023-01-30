import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
// import useFetch from '../hooks/useFetch';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  // const { data: planetsData, loading, error, fetchData } = useFetch();
  const [planetsData, setPlanetsData] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const makeFetch = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const json = await response.json();
      setPlanetsData(json);
    };
    makeFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => ({
    planetsData,
  }), [planetsData]);

  return (
    <PlanetsContext.Provider value={ value }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.shape(),
}.isReqired;

export default PlanetsProvider;
