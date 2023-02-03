import { DataTypes, Model } from "sequelize";
import { ActorMovieInterface } from "../interface/actormovie.interface";
import { sequelizeInstance } from "../config/database";

class ActorMovieModel extends Model<ActorMovieInterface> implements ActorMovieInterface {
  
  movieId!: number;
  actorId!: number;

};

ActorMovieModel.init({
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: false,
  },
  actorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: false,
  }
}, {
  sequelize: sequelizeInstance,
  modelName: 'actor_movie_assign',
});

export default ActorMovieModel;
