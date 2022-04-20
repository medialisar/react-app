import { render, userEvent, screen, waitFor } from 'test/app-test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from 'App';
import spotifySearchResponse from '__test__/data/spotifySearchResponse.json';

const server = setupServer(
  rest.get('https://api.spotify.com/v1/search', (req, res, ctx) => {
    return res(ctx.json(spotifySearchResponse));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('try to access guest page with token and search', async () => {
  render(<App />, {
    route: `/#access_token=asdfasf&token_type=Bearer&expires_in=3600`,
  });
  expect(window.location.pathname).toStrictEqual('/create-playlist');
  // screen.debug();
  const input = screen.getByRole('textbox');
  const btnSearch = screen.getByText('Search');
  userEvent.type(input, '88rising');
  userEvent.click(btnSearch);
  await waitFor(() => {
    screen.getAllByRole('button', { name: 'Select' }).forEach((el) => expect(el).toBeInTheDocument());
  });
});

export {};
