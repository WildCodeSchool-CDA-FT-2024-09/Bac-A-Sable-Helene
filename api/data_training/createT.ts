import * as fs from "fs";

type Movie = {
  id: string;
  title: string;
  releaseYear: number;
  director_id: string; // Notez que c'est 'director_id' et non 'director'
};

type Director = {
  id: string;
  name: string;
};

type Genre = {
  id: string;
  name: string;
};

type MovieGenre = {
  movie_id: string;
  genre_id: string;
};

(async () => {
  try {
    // Lecture du fichier JSON
    const rawT = await JSON.parse(
      fs.readFileSync("./data_training/rawT.json", { encoding: "utf-8" })
    );

    console.log("Contenu de rawT:", rawT);

    // Vérifier que rawT.movies est bien un tableau
    if (!Array.isArray(rawT.movies)) {
      throw new Error("rawT.movies n'est pas un tableau");
    }

    // Transformation des films
    const movies: Movie[] = rawT.movies.map(
      (movie: { id: string; title: string; releaseYear: number; director: { id: string } }) => ({
        id: movie.id,
        title: movie.title,
        releaseYear: movie.releaseYear,
        director_id: movie.director.id, // Correction ici pour bien accéder à l'ID du réalisateur
      })
    );

    const directors: Director[] = [];
    const genres: Genre[] = [];
    const movieGenres: MovieGenre[] = [];

    // Boucle sur chaque film
    rawT.movies.forEach((movie: { id: string; director: { id: string; name: string }; genres: { id: string; name: string }[] }) => {
      const director = movie.director;

      // Vérifier si le réalisateur n'est pas déjà dans la liste
      if (!directors.some((d: Director) => d.id === director.id)) {
        directors.push({ id: director.id, name: director.name });
      }

      // Ajout des genres et création de l'association film-genre
      movie.genres.forEach((genre: { id: string; name: string }) => {
        // Ajout du genre s'il n'existe pas déjà
        if (!genres.some((g: Genre) => g.id === genre.id)) {
          genres.push({ id: genre.id, name: genre.name });
        }

        // Correction : Créer l'association ici avec le bon ID du film
        movieGenres.push({ movie_id: movie.id, genre_id: genre.id }); // movie.id est accessible ici
      });
    });

    // Écriture des fichiers JSON
    fs.writeFile(
      './data_training/movies.json',
      JSON.stringify(movies, null, 2),
      (err) => (err ? console.log("Erreur lors de l'écriture du fichier movies.json :", err) : console.log("File movie is ready"))
    );

    fs.writeFile(
      './data_training/directors.json',
      JSON.stringify(directors, null, 2),
      (err) => (err ? console.log(err) : console.log("File directors is ready"))
    );

    fs.writeFile(
      './data_training/genres.json',
      JSON.stringify(genres, null, 2),
      (err) => (err ? console.log(err) : console.log("File genres is ready"))
    );

    fs.writeFile(
      './data_training/movieGenres.json',
      JSON.stringify(movieGenres, null, 2),
      (err) => (err ? console.log(err) : console.log("File movieGenres is ready"))
    );

  } catch (error) {
    console.error("Erreur lors de l'éxécution du script:", error);
  }
})();
