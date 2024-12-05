import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          home: 'Home',
          signUp: 'Sign up',
          magazine: 'Magazine',
          gallery: 'Gallery',
          creatives: 'Creatives',

          price: 'Price',
          description: 'Description',
          title: 'Title',

          selectArtist: 'Select an artist',

          upload: 'Upload an image',
          createArt: 'Create artwork',
          SketchList: 'Interactives',
          draw: 'Draw',
          movies: 'Movies',
          sketchText: 'Step 1: Press U to upload an image. Step 2: Click over the sketch to start drawing your image',
          profile: 'Profile',
          logout: 'Logout',
          signIn: 'Log in',
          password: 'Password',
          username: 'Username'
        },
      },
      es: {
        translation: {
          home: 'Inicio',
          signUp: 'Crear cuenta',
          gallery: 'Galería',
          creatives: 'Creativos',

          price: 'Precio',
          description: 'Descripción',
          title: 'Título',
          upload: 'Carga una imagen',
          magazine: 'Revista',
          SketchList: 'Interactivos',
          draw: 'Dibujar',
          movies: 'Películas',
          sketchText: 'Paso 1: Aprieta U para cargar una imagen. Paso 2: Presiona el click encima del sketch y dibuja tu imagen',
          profile: 'Perfil',
          logout: 'Cerrar sesión',
          signIn: 'Iniciar sesión',
          password: 'Contraseña',
          username: 'Nombre de usuario'
        },
      },
    },
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
