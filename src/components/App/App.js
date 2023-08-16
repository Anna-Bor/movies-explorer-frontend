import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import moviesApi from '../../utils/MoviesApi';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const [savedMovies] = useState([
    {
      movieId: 1,
      nameRU: '«Роллинг Стоунз» в изгнании',
      nameEN: 'Stones in Exile',
      director: 'Стивен Кайак ',
      country: 'США',
      year: '2010',
      duration: 61,
      description:
        'В конце 1960-х группа «Роллинг Стоунз», несмотря на все свои мегахиты и сверхуспешные концертные туры, была разорена. Виной всему — бездарный менеджмент и драконовское налогообложение в Британии. Тогда музыканты приняли не самое простое для себя решение: летом 1971 года после выхода альбома «Stiсky Fingers» они отправились на юг Франции записывать новую пластинку. Именно там, на Лазурном Берегу, в арендованном Китом Ричардсом подвале виллы Неллькот родился сборник «Exile on Main St.», который стал лучшим альбомом легендарной группы.',
      image: '/uploads/thumbnail_stones_in_exile_b2f1b8f4b7.jpeg',
    },
    {
      movieId: 5,
      nameRU: 'Taqwacore: The Birth of Punk Islam',
      nameEN: 'Taqwacore: The Birth of Punk Islam',
      director: ' Омар Маджид',
      country: 'Канада',
      year: '2009',
      duration: 80,
      description:
        "**Don't panic, we're Islamic!**\nПакистанские лесбиянки из Ванкувера, арабские хеви-металлисты из Чикаго, группа Vote Hezbollah, ведомая иранцем из Сан-Антонио, — все это невымышленные, сплошь настоящие персонажи, запечатленные в первом документальном свидетельстве о субкультуре исламского панка. Хотя до недавнего времени исламский панк, он же taqwacore, был художественным вымыслом, вышедшим из-под пера писателя-мусульманина Майкла Мухаммеда Найта, его книга сделала это явление вполне реальным, тогда как сам он стал главным героем фильма.",
      image: '/uploads/thumbnail_taqwacore2_2f487d2e74.jpeg',
    },
    {
      movieId: 9,
      nameRU: ' 196 ударов в минуту',
      nameEN: '196 BPM',
      director: 'Ромуальд Кармакар',
      country: 'Германия',
      year: '2003',
      duration: 60,
      description:
        'Панорамный взгляд на берлинский Лав-парад 2002-го года с трех разных точек зрения, каждая из которых образует отдельную новеллу. Первая, «Интро», показывает происходящее глазами людей, стоящих у входа в клуб Linientreu; вторая, «Габба», переносит зрителя в гущу толпы на площади Брайтшайдплац, где диджейские вертушки установлены даже в кебабной. И третья, «Хелл за работой», дает исчерпывающее представление о том, как DJ Hell сводит пластинки во время своего сета в WMF.',
      trailerLink: 'https://www.youtube.com/watch?v=GsDRVpdgNJ4',
      image: '/uploads/thumbnail_zagruzhennoe_1_fd5faff237.jpeg',
    },
    {
      movieId: 12,
      nameRU: 'Виллалобос',
      nameEN: 'Villalobos',
      director: 'Ромуальд Кармакар',
      country: 'Германия',
      year: '2009',
      duration: 110,
      description:
        'Последний фильм трилогии, опус магнум Ромуальда Кармакара, премьера которого состоялась в основной программе Венецианского кинофестиваля. Рикардо Виллалобос предстает здесь не столько как один самых востребованных диджеев, сколько как визионер от мира современной музыки. Кармакар исследует не феномен популярности Виллалобоса, а то, как устроена его голова, что творится в его аппаратуре, когда он сводит один трек с другим, как рождается музыка и какое отношение тек-хаус имеет к Мусоргскому.',
      trailerLink: 'https://www.kinopoisk.ru/film/586534/video/56500/',
      image: '/uploads/590x400_2eccd40a93.jpeg',
    },
  ]);

  useEffect(() => {
    moviesApi
      .getMovies()
      .then((movieCollection) => {
        setMovies(movieCollection);
      })
      .catch((reason) => window.console.log(reason));
  }, []);

  const login = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 10000);
  };

  const register = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 10000);
  };

  const changeProfileInfo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 10000);
  };

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route
        path="movies"
        element={(
          <Movies
            movies={movies}
            savedMovies={savedMovies}
            isOnSavedPage={false}
          />
        )}
      />
      <Route
        path="saved-movies"
        element={<SavedMovies savedMovies={savedMovies} />}
      />
      <Route
        path="signin"
        element={<main><Login onSubmit={login} isLoading={isLoading} /></main>}
      />
      <Route
        path="signup"
        element={<main><Register onSubmit={register} isLoading={isLoading} /></main>}
      />
      <Route
        path="profile"
        element={(
          <Profile
            user={{ name: 'Виталий', email: 'pochta@yandex.ru' }}
            onSubmit={changeProfileInfo}
            isLoading={isLoading}
          />
        )}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
