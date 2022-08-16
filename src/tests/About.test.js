import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import About from '../pages/About';

test('Teste se a página contém as informações sobre a Pokédex;', () => {
  renderWithRouter(<About />);
  const aboutPokedex = screen.getByText(/This application simulates a Pokédex/i);
  const moreAboutPokedex = screen.getByText(/One can filter Pokémons by type/i);
  expect(aboutPokedex).toBeInTheDocument();
  expect(moreAboutPokedex).toBeInTheDocument();
});

test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  renderWithRouter(<About />);
  const aboutPokedex = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
  expect(aboutPokedex).toBeInTheDocument();
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
  renderWithRouter(<About />);
  const paragraphs = screen.getAllByText(/Pokémons/i);
  expect(paragraphs).toHaveLength(2);
});

test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
  renderWithRouter(<About />);
  const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const img = screen.getByRole('img');
  expect(img).toHaveAttribute('src', URL);
});
