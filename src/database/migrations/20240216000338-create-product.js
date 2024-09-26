module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      discount: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      value: {
        type: Sequelize.INTEGER
      },
      brandId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Brands',
          key: 'id'
        }
      },
      specieId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Species',
          key: 'id'
        }
      },
      filingId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Filings',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};