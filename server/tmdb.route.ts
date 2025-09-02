const BASE_URL = 'https://api.themoviedb.org/3';

export function upcomingMovies(req: Request, res: Response) {
  console.log('Upcoming movies requested');

  const url = `${BASE_URL}/movie/upcoming?language=en-US&page=1`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  };

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.error('Error fetching upcoming movies:', error);
      res.sendStatus(500);
    });
}
