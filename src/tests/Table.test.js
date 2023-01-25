import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
    // const input = screen.getByRole('input', { name: /buscar/i });
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

  it('verifica se os filtros númericos funcionam corretamente', async () => {
    await act(() => render(<App />));
    const colum = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(colum, 'diameter');
    userEvent.selectOptions(comparison, 'maior que');
    userEvent.type(value, '9000');

    act(() => userEvent.click(btnFilter));

    const planets = screen.getAllByTestId('planet-name');
    const btnRomeve = screen.getAllByTestId('button-remove-filter');
    expect(planets).toHaveLength(7);
    expect(btnRomeve).toHaveLength(1);

    userEvent.selectOptions(colum, 'population');
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.type(value, '1000000');
    userEvent.click(btnFilter);
    const btnRomeve2 = screen.getAllByTestId('button-remove-filter');
    const planets2 = screen.getAllByTestId('planet-name');
    expect(planets2).toHaveLength(2);
    expect(btnRomeve2).toHaveLength(2);

    userEvent.selectOptions(colum, 'rotation_period');
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.type(value, '23');
    userEvent.click(btnFilter);
    const btnRomeve3 = screen.getAllByTestId('button-remove-filter');
    const planets3 = screen.getAllByTestId('planet-name');
    expect(planets3).toHaveLength(1);
    expect(btnRomeve3).toHaveLength(3);
  });
})