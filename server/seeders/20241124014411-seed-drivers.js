'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('drivers', [
      {
        driver_id: '1',
        name: 'Homer Simpson',
        description:
          'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
        vehicle: 'Plymouth Valiant 1973 rosa e enferrujado',
        comment:
          '2/5 Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
        rating: 2.5,
        minimumKm: 1,
        created_at: new Date(),
      },
      {
        driver_id: '2',
        name: 'Dominic Toretto',
        description:
          'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
        vehicle: 'Dodge Charger R/T 1970 modificado',
        comment:
          '4/5 Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo! ',
        rating: 5,
        minimumKm: 5,
        created_at: new Date(),
      },
      {
        driver_id: '3',
        name: 'James Bond',
        description:
          'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem. ',
        vehicle: 'Aston Martin DB5 clássico ',
        comment:
          '5/5 Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
        rating: 10,
        minimumKm: 10,
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('drivers', null, {});
  },
};
