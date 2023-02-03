import { DataTypes, Model } from "sequelize";
import { UserInterface } from "../interface/user.interface";
import { sequelizeInstance } from "../config/database";

class UserModel extends Model<UserInterface> implements UserInterface {

  id!: number;
  username!: string;
  password!: string;

}

UserModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize: sequelizeInstance,
  modelName: 'users',
});

export default UserModel;
