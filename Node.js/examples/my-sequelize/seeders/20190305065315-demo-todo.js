'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Todos', [{
            note: 'Hello Todos',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            note: 'Another Todo',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
       return queryInterface.bulkDelete('Todos', null, {});
    }
};