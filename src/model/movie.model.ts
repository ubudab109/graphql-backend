import { DataTypes, Model } from "sequelize";
import { MovieInterface } from "../interface/movie.interface";
import {sequelizeInstance} from '../config/database';
import AuthorModel from "./author.model";

class MovieModel extends Model<MovieInterface> implements MovieInterface {

  id!: number;
  authorId!: number;
  title!: string;
  releaseDate!: string;
  rating!: number;

};

MovieModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: AuthorModel,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  releaseDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  sequelize: sequelizeInstance,
  modelName: 'movies',
  timestamps: true,
  updatedAt: true,
});


export default MovieModel;
