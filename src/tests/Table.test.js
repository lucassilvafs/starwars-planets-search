import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import mockPlanet from './mocks/mockPlanet';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste do componente Table', () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockPlanet),
    });
  }) 

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Deverá renderizar o campo de busca', () => {
    render(<App />);
    const inputSearch = screen.getByTestId('name-filter');
    expect(inputSearch).toBeInTheDocument();
  });
  
  it('Deverá atualizar o estado quando o valor do input for atualizado', () => {
    render(<App />);
    const inputSearch = screen.getByTestId('name-filter');
    userEvent.type(inputSearch, 'test');
    expect(inputSearch.value).toBe('test');
  });
  
  it('Deverá atualizar o estado quando o valor do filtro da coluna for atualizada', () => {
    render(<App />);
    const selectColumn = screen.getByTestId('column-filter');
    userEvent.selectOptions(selectColumn, 'diameter');
    expect(selectColumn.value).toBe('diameter');
  });
  
  it('Deverá atualizar o estado quando o valor do filtro de comparação for atualizado', () => {
    render(<App />);
    const selectComparison = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(selectComparison, 'menor que');
    expect(selectComparison.value).toBe('menor que');

    userEvent.selectOptions(selectComparison, 'maior que');
    expect(selectComparison.value).toBe('maior que');

    userEvent.selectOptions(selectComparison, 'igual a');
    expect(selectComparison.value).toBe('igual a');
  });
  
  it('Deverá atualizar o estado quando o valor do filtro numérico for atualizado', () => {
    render(<App />);
    const selectNumber = screen.getByTestId('value-filter');
    userEvent.clear(selectNumber);
    userEvent.type(selectNumber, '100');
    expect(selectNumber.value).toBe('100');
  });

  it('Deverá renderizar as opções corretas de filtro da coluna da tabela', () => {
    render(<App />);
    const selectColumn = screen.getByTestId('column-filter');
    expect(selectColumn.options.length).toBe(5);
    expect(selectColumn.options[0].value).toBe('population');
    expect(selectColumn.options[1].value).toBe('orbital_period');
    expect(selectColumn.options[2].value).toBe('diameter');
    expect(selectColumn.options[3].value).toBe('rotation_period');
    expect(selectColumn.options[4].value).toBe('surface_water');
  });
  
  it('Deverá renderizar as opções corretas de filtro de comparações da tabela', () => {
    render(<App />);
    const selectComparison = screen.getByTestId('comparison-filter');
    expect(selectComparison.options.length).toBe(3);
    expect(selectComparison.options[0].value).toBe('maior que');
    expect(selectComparison.options[1].value).toBe('menor que');
    expect(selectComparison.options[2].value).toBe('igual a');
  });

  it('Testa os botões de Sort', async () => {
    render(<App />);
    const columnSort = screen.getByTestId('column-sort');
    expect(columnSort).toBeInTheDocument();
    expect(columnSort.value).toBe('population');
    userEvent.selectOptions(columnSort, 'orbital_period');
    expect(columnSort.value).toBe('orbital_period');
    userEvent.selectOptions(columnSort, 'diameter');
    expect(columnSort.value).toBe('diameter');
    userEvent.selectOptions(columnSort, 'rotation_period');
    expect(columnSort.value).toBe('rotation_period');
    userEvent.selectOptions(columnSort, 'surface_water');
    expect(columnSort.value).toBe('surface_water');
    userEvent.selectOptions(columnSort, 'population');
    const sortASC = screen.getByTestId('column-sort-input-asc');
    const sortDESC = screen.getByTestId('column-sort-input-desc');
    expect(sortASC).toBeInTheDocument();
    expect(sortDESC).toBeInTheDocument();
    expect(sortASC).toBeChecked();
    expect(sortDESC).not.toBeChecked();
    userEvent.click(sortDESC);
    expect(sortDESC).toBeChecked();
    expect(sortASC).not.toBeChecked();
    const filterBtn = screen.getByRole('button', { name: /ordenar/i });
    expect(filterBtn).toBeInTheDocument();
    userEvent.click(filterBtn);
    await waitFor(() => {
      const row = screen.getAllByRole('row');
      expect(row.length).toBe(11);
      expect(row[1].childNodes[0].textContent).toBe('Tatooine');
    });
    userEvent.click(sortASC);
    userEvent.click(filterBtn);
    await waitFor(() => {
      const row = screen.getAllByRole('row');
      expect(row[1].childNodes[0].textContent).toBe('Yavin IV');
    });

  });

  it('Testa as opções maior que e igual a', async () => {
    render(<App />);
    const getColumnFilter = screen.getByTestId('column-filter');
    userEvent.selectOptions(getColumnFilter, 'diameter');
    const getComparisonFilter = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(getComparisonFilter, 'maior que');
    const getValueFilter = screen.getByTestId('value-filter');
    userEvent.type(getValueFilter, '10000');
    const getBtn = screen.getByTestId('button-filter');
    userEvent.click(getBtn);
    const getColumnFilter2 = screen.getByTestId('column-filter');
    userEvent.selectOptions(getColumnFilter2, 'population');
    const getComparisonFilter2 = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(getComparisonFilter2, 'igual a');
    const getValueFilter2 = screen.getByTestId('value-filter');
    userEvent.type(getValueFilter2, '200000');
    const getBtn2 = screen.getByTestId('button-filter');
    userEvent.click(getBtn2);
  });

  it('Testa os botões de remover os filtros', async () => {
    render(<App />);
    const getColumnFilter = screen.getByTestId('column-filter');
    userEvent.selectOptions(getColumnFilter, 'diameter');
    const getComparisonFilter = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(getComparisonFilter, 'maior que');
    const getValueFilter = screen.getByTestId('value-filter');
    userEvent.type(getValueFilter, '10000');
    const getBtn = screen.getByTestId('button-filter');
    userEvent.click(getBtn);
    const getRemoveFilter = screen.getByTestId('filter');
    userEvent.click(getRemoveFilter);
  });

  it('Testa o botão de remover apenas um filtro', async () => {
    render(<App />);
    const getColumnFilter = screen.getByTestId('column-filter');
    userEvent.selectOptions(getColumnFilter, 'diameter');
    const getComparisonFilter = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(getComparisonFilter, 'maior que');
    const getValueFilter = screen.getByTestId('value-filter');
    userEvent.type(getValueFilter, '10000');
    const getBtn = screen.getByTestId('button-filter');
    userEvent.click(getBtn);
    const getColumnFilter2 = screen.getByTestId('column-filter');
    userEvent.selectOptions(getColumnFilter2, 'population');
    const getComparisonFilter2 = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(getComparisonFilter2, 'maior que');
    const getValueFilter2 = screen.getByTestId('value-filter');
    userEvent.type(getValueFilter2, '200000');
    const getBtn2 = screen.getByTestId('button-filter');
    userEvent.click(getBtn2);
    const getRemoveFilter = screen.getAllByTestId('filter');
    userEvent.click(getRemoveFilter[0]);
  });

  it('verifica se os filtros númericos funcionam corretamente', async () => {
    await act(() => render(<App />));
    const colum = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');

    expect(colum).toHaveValue('population');
    userEvent.selectOptions(colum, 'diameter');
    userEvent.selectOptions(comparison, 'maior que');
    userEvent.type(value, '9000')
    userEvent.click(btnFilter);
    const planets = screen.getAllByTestId('planet-name');
    const btnRomeve = screen.getAllByTestId('button-remove-filter')
    expect(planets).toHaveLength(7);
    expect(planets[0]).toHaveTextContent('Tatooine');
    expect(planets[1]).toHaveTextContent('Alderaan');
    expect(planets[2]).toHaveTextContent('Yavin IV');
    expect(planets[3]).toHaveTextContent('Bespin');
    expect(planets[4]).toHaveTextContent('Naboo');
    expect(planets[5]).toHaveTextContent('Coruscant');
    expect(planets[6]).toHaveTextContent('Kamino');
    expect(btnRomeve).toHaveLength(1);
    const usedFilters = screen.getAllByTestId('filter');
    expect(usedFilters).toHaveLength(1);
    expect(colum).toHaveValue('population');

    userEvent.selectOptions(colum, 'population');
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.type(value, '1000000');
    userEvent.click(btnFilter);
    const btnRomeve2 = screen.getAllByTestId('button-remove-filter');
    const planets2 = screen.getAllByTestId('planet-name');
    expect(planets2).toHaveLength(2);
    expect(planets2[0]).toHaveTextContent('Tatooine');
    expect(planets2[1]).toHaveTextContent('Yavin IV');
    expect(btnRomeve2).toHaveLength(2);
    const usedFilters1 = screen.getAllByTestId('filter');
    expect(usedFilters1).toHaveLength(2);
    expect(colum).toHaveValue('orbital_period');

    userEvent.selectOptions(colum, 'rotation_period');
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.type(value, '23');
    userEvent.click(btnFilter);
    const btnRomeve3 = screen.getAllByTestId('button-remove-filter');
    const planets3 = screen.getAllByTestId('planet-name');
    expect(planets3).toHaveLength(1);
    expect(planets3[0]).toHaveTextContent('Tatooine');
    expect(btnRomeve3).toHaveLength(3);
    const usedFilters3 = screen.getAllByTestId('filter');
    expect(usedFilters3).toHaveLength(3);

    userEvent.click(btnRomeve3[2]);
    const planets4 = screen.getAllByTestId('planet-name');
    expect(planets4).toHaveLength(1);
    expect(planets4[0]).toHaveTextContent('Tatooine');
    const btnRomeve4 = screen.getAllByTestId('button-remove-filter');
    expect(btnRomeve4).toHaveLength(2);
    const usedFilters4 = screen.getAllByTestId('filter');
    expect(usedFilters4).toHaveLength(2);

    const btnRemoveAll = screen.getByTestId('button-remove-filters');
    userEvent.click(btnRemoveAll);
    const planets5 = screen.getAllByTestId('planet-name');
    expect(planets5).toHaveLength(10);
    expect(planets5[0]).toHaveTextContent('Tatooine');
    expect(planets5[1]).toHaveTextContent('Alderaan');
    expect(planets5[2]).toHaveTextContent('Yavin IV');
    expect(planets5[3]).toHaveTextContent('Hoth');
    expect(planets5[4]).toHaveTextContent('Dagobah');
    expect(planets5[5]).toHaveTextContent('Bespin');
    expect(planets5[6]).toHaveTextContent('Endor');
    expect(planets5[7]).toHaveTextContent('Naboo');
    expect(planets5[8]).toHaveTextContent('Coruscant');
    expect(planets5[9]).toHaveTextContent('Kamino');
  });

  it('verifica o filtro descendente', async () => {
    await act(() => render(<App />));
    const desc = screen.getByTestId('column-sort-input-desc');
    const columSort = screen.getByTestId('column-sort');
    const btnSort = screen.getByTestId('column-sort-button');

    userEvent.click(desc);
    expect(desc).toBeChecked();
    userEvent.selectOptions(columSort, 'population'); 
    userEvent.click(btnSort);
    const planets = screen.getAllByTestId('planet-name');
    expect(planets).toHaveLength(10);
    expect(planets[0]).toHaveTextContent('Coruscant');
    expect(planets[1]).toHaveTextContent('Naboo');
    expect(planets[2]).toHaveTextContent('Alderaan');
    expect(planets[3]).toHaveTextContent('Kamino');
    expect(planets[4]).toHaveTextContent('Endor');
    expect(planets[5]).toHaveTextContent('Bespin');
    expect(planets[6]).toHaveTextContent('Tatooine');
    expect(planets[7]).toHaveTextContent('Yavin IV');
    expect(planets[8]).toHaveTextContent('Hoth');
    expect(planets[9]).toHaveTextContent('Dagobah');
  });
})