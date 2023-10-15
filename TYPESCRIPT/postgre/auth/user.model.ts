// user.model.ts
import { DataTypes, Model, Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'postgres',
    database: 'your_database_name',
    username: 'your_username',
    password: 'your_password',
    host: 'localhost',
    port: 5432,
});

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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
    },
    {
        sequelize,
        modelName: 'User',
    }
);

export default User;
