namespace CREDITS {
  type GetResponse = ICredits;
  type GetRequest = {
    movie_tv: string;
    id: string;
  };
}

// const data: ICredits = {}
// data.cast[0].name