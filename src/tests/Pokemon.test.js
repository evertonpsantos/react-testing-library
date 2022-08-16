import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Testa se é renderizado um card com as informações do pokémon', () => {
  renderWithRouter(<App />);
  const pokemonName = screen.getByTestId('pokemon-name');
  const pokemonType = screen.getByTestId('pokemon-type');
  const pokemonWeight = screen.getByTestId('pokemon-weight');
  const pokemonImg = screen.getByAltText('Pikachu sprite');
  const URLimg = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
  expect(pokemonName).toBeInTheDocument();
  expect(pokemonType).toBeInTheDocument();
  expect(pokemonType).toHaveTextContent('Electric');
  expect(pokemonWeight).toBeInTheDocument();
  expect(pokemonImg).toHaveAttribute('src', URLimg);
});

test('Testa se o card do pokemon tem um link para mais detalhes', () => {
  renderWithRouter(<App />);
  const moreDetailsLink = screen.getByRole('link', { name: /More details/i });
  expect(moreDetailsLink).toBeInTheDocument();
  expect(moreDetailsLink).toHaveAttribute('href', '/pokemons/25');
});

test('Testa se ao clicar em More details é redirecionado para página com detalhes',
  () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /More details/i });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);
    const details = screen.getByRole('heading', { level: 2, name: /Pikachu details/i });
    expect(details).toBeInTheDocument();
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

test('Testa se existe um ícone de estrela nos pokémons favoritados', () => {
  renderWithRouter(<App />);
  const moreDetailsLink = screen.getByRole('link', { name: /More details/i });
  userEvent.click(moreDetailsLink);
  const favoriteButton = screen.getByRole('checkbox');
  userEvent.click(favoriteButton);
  const favoriteImg = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
  expect(favoriteImg).toHaveAttribute('src', '/star-icon.svg');
});
