namespace MOVIE {
  type GetResponse = IMovie;
  type GetRequest = {
    genre: string;
    sort: string;
  };
}
