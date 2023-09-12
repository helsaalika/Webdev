import {Sequelize} from "sequelize"

const db = new Sequelize('db_fullstack', 'root', '',{
    host: 'localhost',
    dialect : 'mysql'
});

export default db;