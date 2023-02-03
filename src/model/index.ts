import { hashPassword } from "../helper/helper";
import ActorModel from "./actor.model";
import ActorMovieModel from "./actormovie.model";
import AuthorModel from "./author.model";
import MovieModel from "./movie.model";
import UserModel from "./user.model";

const isDev = process.env.NODE_ENV === 'development';

const dbInit = async () => Promise.all([
  AuthorModel.hasMany(MovieModel, {
    sourceKey: 'id',
    foreignKey: 'authorId',
    as: 'movies',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }),
  
  MovieModel.belongsTo(AuthorModel, {
    foreignKey: 'authorId',
    targetKey: 'id',
    as: 'authors',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }),
  
  MovieModel.belongsToMany(ActorModel, { through: ActorMovieModel }),
  ActorModel.belongsToMany(MovieModel, { through: ActorMovieModel }),

  ActorMovieModel.belongsTo(MovieModel, {
    foreignKey: 'movieId',
    targetKey: 'id',
    constraints: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }),

  ActorMovieModel.belongsTo(MovieModel, {
    foreignKey: 'actorId',
    targetKey: 'id',
    constraints: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }),

  UserModel.sync({ alter: isDev }),
  UserModel.upsert({
    id: 1,
    username: 'user',
    password: await hashPassword('123123'),
  }),
  AuthorModel.sync({ alter: isDev }),
  ActorModel.sync({ alter: isDev }),
  MovieModel.sync({ alter: isDev }),
  ActorMovieModel.sync({ alter: isDev }),
  
]);

export default dbInit;
