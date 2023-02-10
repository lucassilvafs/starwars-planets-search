import React from 'react';

function TableHead() {
  const tableHeader = ['Nome', 'Tempo de rotação', 'Tempo de órbita',
    'Diâmetro', 'Clima', 'Gravidade', 'Tipo de terreno', 'Água?', 'População',
    'Films', 'Criação', 'Edição', 'Imagem'];

  return (
    <thead>
      <tr>
        { tableHeader.map((name) => (
          <th key={ name }>{ name }</th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHead;
