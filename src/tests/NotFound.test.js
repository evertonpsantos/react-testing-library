import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { NotFound } from '../pages';

test('Teste se a página contém um heading h2 com o texto Page requested not found',
  () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notexistingpage');
    const message = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i });
    expect(message).toBeInTheDocument();
  });

test('Teste se a página mostra a imagem com a URL certa', () => {
  const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  renderWithRouter(<NotFound />);
  const pikachuImg = screen
    .getByAltText('Pikachu crying because the page requested was not found');
  expect(pikachuImg).toHaveAttribute('src', URL);
});
