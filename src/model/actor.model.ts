import { DataTypes, Model } from "sequelize";
import { ActorInterface } from "../interface/actor.interface";
import { sequelizeInstance } from "../config/database";

class ActorModel extends Model<ActorInterface> implements ActorInterface {
  
  id!: number;
  fullname!: string;

}

ActorModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},
  {
  sequelize: sequelizeInstance,
  modelName: 'actors',
  timestamps: true,
  updatedAt: true,
});

export default ActorModel;
