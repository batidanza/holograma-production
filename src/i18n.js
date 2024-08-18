import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          home: 'HOME',
          signUp: 'SIGN UP',
          magazine: 'MAGAZINE',
          gallery: 'GALLERY',
          creatives: 'CREATIVES',

          price:'PRICE',
          description:'DESCRIPTION',
          title:'TITLE',
     
          selectArtist:'SELECT AN ARTIST',

          upload:'UPLOAD AN IMAGE',
          createArt:'CREATE ARTWORK',
          SketchList: 'INTERACTIVES',
          draw: 'DRAW',
          movies: 'MOVIES',
          sketchText: 'STEP 1: PRESS U TO UPLOUD AN IMAGE     STEP 2: CLICK OVER THE SKETCH TO START DRAWING YOUR IMAGE',
          profile: 'PROFILE',
          logout: 'LOGOUT',
          signIn: 'LOG IN',
          password: 'PASSWORD',
          username: 'USERNAME'
        },
      },
      es: {
        translation: {
          home: 'INICIO',
          signUp: 'CREAR CUENTA',
          gallery: 'GALERIA',
          creatives: 'CREATIVOS',
    
          price:'PRECIO',
          description:'DESCRIPCION',
          title:'TITULO',
          upload:'CARGA UNA IMAGEN',
          magazine:'REVISTA',
          SketchList: 'INTERACTIVOS',
          draw: 'DIBUJAR',
          movies: 'PELICULAS',
          sketchText: 'PASO 1: APRIETA U PARA CARGAR UNA IMAGEN     PASO 2: PRESIONA EL CLICK ENCIMA DEL SKETCH Y DIBUJA TU IMAGEN',
          profile: 'PERFIL',
          logout: 'CERRAR SESION',
          signIn: 'INICIAR SESION',
          password: 'CONTRASEÑA',
          username: 'NOMBRE DE USUARIO'
        },
      },
    },
    lng: 'en', 
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
