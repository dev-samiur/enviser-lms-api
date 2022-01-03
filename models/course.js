'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Course.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    owner: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    gallery_1: DataTypes.STRING,
    gallery_2: DataTypes.STRING,
    lesson: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};