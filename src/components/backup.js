// const handleClick = () => {
//   let filtered = [];
//   const isFilter = filteredData.isCliked
//     ? filteredData.searchFiltered : filteredPlanets;

//   if (filteredData.comparison === 'maior que') {
//     filtered = isFilter.filter((planet) => (
//       +planet[filteredData.column] > +filteredData.valueNumber
//     ));
//   } else if (filteredData.comparison === 'menor que') {
//     filtered = isFilter.filter((planet) => (
//       +planet[filteredData.column] < +filteredData.valueNumber
//     ));
//   } else { // if (filteredData.comparison === 'menor que')
//     filtered = isFilter.filter((planet) => (
//       +planet[filteredData.column] === +filteredData.valueNumber
//     ));
//   }
//   setArrayFilters([...arrayFilters,
//     { column: filteredData.column,
//       comparison: filteredData.comparison,
//       valueNumber: filteredData.valueNumber,
//     },
//   ]);
//   setFilteredData({
//     ...filteredData,
//     searchFiltered: filtered,
//     column: 'population',
//     comparison: 'maior que',
//     valueNumber: 0,
//     isCliked: true,
//   });
// };

// const handleRemoveFilter = ({ target }) => setArrayFilters(arrayFilters
//   .filter((e) => e.column !== target.value));

// const handleRemoveAllFilters = () => setArrayFilters([]);
