import React from "react";
import "./Magazine.css";
import AnimatedCollectionVisual from "../animated-collection/AnimatedCollectionVisual.jsx";
import DragAndDrop from "../animated-collection/DragAndDropCollection.jsx";

const Magazine = () => {
  return (
    <>
      <div className="magazine">
        <h2 className="title"> MAGAZINE </h2>
      </div>
      <div className="animated">
        <div className="text-animation">
          Outlaw Man (アウトロー・マン, Autorō Man): Fue publicado como una
          historia especial en la revista Shōnen Jump en 1982. La trama gira en
          torno a un personaje principal que se encuentra en situaciones de
          conflicto y aventuras en un entorno que puede ser hostil o lleno de
          peligros. La obra destaca por su narrativa llena de acción y su estilo
          distintivo de dibujo.<br></br>
          <br></br>
          Mashōnen B. T. (魔少年ビーティー, Mashōnen bītī): Este manga fue
          serializado en la revista Shōnen Jump semanal desde 1982 hasta 1983.
          La historia sigue las aventuras de un joven protagonista que posee
          habilidades especiales o sobrenaturales, y su lucha contra fuerzas
          malignas o situaciones complicadas. El manga fue recopilado en un
          volumen en 1984.<br></br>
          <br></br>
          Baoh (バオー来訪者, Baō Raohōsha): Publicado en la revista Shōnen Jump
          semanal de 1984 a 1985, Baoh es una obra que mezcla acción, ciencia
          ficción y elementos sobrenaturales. La trama se centra en un
          adolescente que adquiere poderes especiales después de ser sometido a
          experimentos científicos. La serie destaca por sus intensas batallas y
          su estilo visual único.<br></br>
          <br></br>
          Gorgeous Irene: Esta obra es una colección de one-shots, que son
          historias autoconclusivas, publicada en 1987. Cada historia ofrece una
          narrativa independiente con personajes y situaciones únicas. Estas
          historias pueden variar en género y tono, desde la comedia hasta el
          drama o la acción.<br></br>
          <br></br>
        </div>
        <AnimatedCollectionVisual />
      </div>
      <DragAndDrop/>
    </>
  );
};

export default Magazine;
