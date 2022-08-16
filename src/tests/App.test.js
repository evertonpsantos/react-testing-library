import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação:',
  () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    const aboutLink = screen.getByRole('link', { name: /About/i });
    const favoritesLink = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
  });

test('Testa se é redirecionada para / ao clicar no link Home', () => {
  const { history } = renderWithRouter(<App />);
  const homeLink = screen.getByRole('link', { name: /Home/i });
  userEvent.click(homeLink);
  const { location: { pathname } } = history;
  expect(pathname).toBe('/');
});

test('Testa se é redirecionada para /about ao clicar no link About', () => {
  const { history } = renderWithRouter(<App />);
  const aboutLink = screen.getByRole('link', { name: /About/i });
  userEvent.click(aboutLink);
  const { location: { pathname } } = history;
  expect(pathname).toBe('/about');
});

test('Testa se é redirecionada para /favorites ao clicar no link Favorite Pokemons',
  () => {
    const { history } = renderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoritesLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

test('Testa se é redirecionada para a page Not Found ao entrar em uma URL desconhecida',
  () => {
    const { history } = renderWithRouter(<App />);
    history.push('/URLdesconhecida');
    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i });
    expect(notFoundText).toBeInTheDocument();
  });
