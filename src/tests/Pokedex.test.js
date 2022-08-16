import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Testa se a página contém um heading h2 com o texto Encountered pokémons', () => {
  renderWithRouter(<App />);
  const title = screen.getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i });
  expect(title).toBeInTheDocument();
});

test('Testa se muda o pokemon ao clicar Próximo pokemon', () => {
  renderWithRouter(<App />);
  const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
  const pokemons = ['Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash',
    'Snorlax', 'Dragonair', 'Pikachu'];
  pokemons.forEach((pokemon) => {
    userEvent.click(nextButton);
    const pokemonOnScreen = screen.getByText(pokemon);
    expect(pokemonOnScreen).toBeInTheDocument();
  });
});

test('Testa se é mostrado apenas um pokémon por vez', () => {
  renderWithRouter(<App />);
  const pikachuCard = screen.getByText('Pikachu');
  const charmanderCard = screen.queryByText('Charmander');
  expect(pikachuCard).toBeInTheDocument();
  expect(charmanderCard).not.toBeInTheDocument();
});

test('Testa se a Pokédex tem os botões de filtro:', () => {
  renderWithRouter(<App />);
  const filterAll = screen.getByRole('button', { name: /All/i });
  expect(filterAll).toBeInTheDocument();
  const buttons = screen.getAllByTestId('pokemon-type-button');
  buttons.forEach((buttonPoke) => {
    expect(buttonPoke).toBeInTheDocument();
  });

  const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic',
    'Normal', 'Dragon'];
  types.forEach((typess) => {
    const filterType = screen.getByRole('button', { name: typess });
    expect(filterType).toBeInTheDocument();
  });

  userEvent.click(buttons[1]);
  const charmander = screen.getByText('Charmander');
  expect(charmander).toBeInTheDocument();
  const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
  expect(filterAll).toBeInTheDocument();
  userEvent.click(nextButton);
  const rapidash = screen.getByText('Rapidash');
  expect(rapidash).toBeInTheDocument();
  expect(filterAll).toBeInTheDocument();
});

test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
  renderWithRouter(<App />);
  const filterType = screen.getByRole('button', { name: /Fire/i });
  userEvent.click(filterType);
  const charmander = screen.getByText('Charmander');
  expect(charmander).toBeInTheDocument();
  const reset = screen.getByRole('button', { name: /All/i });
  userEvent.click(reset);
  const pikachu = screen.getByText('Pikachu');
  expect(pikachu).toBeInTheDocument();
});
