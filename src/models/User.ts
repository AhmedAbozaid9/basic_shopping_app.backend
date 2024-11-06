import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/database";
import bcrypt from "bcrypt";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Define the UserInstance type that extends Model with attributes and creation attributes
interface UserInstance
  extends Model<UserAttributes, Omit<UserAttributes, "id">>,
    UserAttributes {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the User model
const User = sequelize.define<UserInstance>("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Hash the password before saving
User.beforeSave(async (user: UserInstance) => {
  if (user.changed("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

export default User;
