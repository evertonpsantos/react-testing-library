import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Testa se as informações detalhadas do pokémon selecionado são mostradas', () => {
  renderWithRouter(<App />);
  const moreDetailsLink = screen.getByRole('link', { name: /More details/i });
  userEvent.click(moreDetailsLink);
  const titleDetails = screen.getByRole('heading', {
    level: 2,
    name: /Pikachu details/i,

  });
  const summaryDetails = screen.getByRole('heading', {
    level: 2,
    name: /Summary/i,
  });
  const text = screen.getByText(/ with electricity/i);
  expect(moreDetailsLink).not.toBeInTheDocument();
  expect(titleDetails).toBeInTheDocument();
  expect(summaryDetails).toBeInTheDocument();
  expect(text).toBeInTheDocument();
});

test('Testa se há uma seção com mapas de localização do Pokemon', () => {
  renderWithRouter(<App />);
  const moreDetailsLink = screen.getByRole('link', { name: /More details/i });
  userEvent.click(moreDetailsLink);
  const locationsText = screen.getByRole('heading', {
    level: 2,
    name: /Game Locations of Pikachu/i });
  const locationsNames = screen.getAllByText(/Kanto/i);
  const locationImgs = screen.getAllByAltText('Pikachu location');
  expect(locationImgs[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(locationImgs[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(locationsNames).toHaveLength(2);
  expect(locationsText).toBeInTheDocument();
});

test('Testa se o usuário pode favoritar um pokémon através da página de detalhes', () => {
  renderWithRouter(<App />);
  const moreDetailsLink = screen.getByRole('link', { name: /More details/i });
  userEvent.click(moreDetailsLink);
  const checkbox = screen.getByLabelText('Pokémon favoritado?');
  userEvent.click(checkbox);
  const favoriteImg = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
  expect(favoriteImg).toBeInTheDocument();
  userEvent.click(checkbox);
  expect(favoriteImg).not.toBeInTheDocument();
});
