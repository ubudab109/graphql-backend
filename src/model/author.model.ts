import { DataTypes, Model } from "sequelize";
import { AuthorInterface } from "../interface/author.interface";
import { sequelizeInstance } from "../config/database";

class AuthorModel extends Model<AuthorInterface> implements AuthorInterface {
    
  id!: number;
  fullname!: string;
  email!: string;
  
}

AuthorModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize: sequelizeInstance,
  timestamps: true,
  updatedAt: true,
  modelName: 'authors'
});

export default AuthorModel;
