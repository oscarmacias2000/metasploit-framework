import  Sequelize  from "@sequelize/postgres";
import DataTypes  from "@sequelize/core";

const sequelize = Sequelize

const ModulesAux = sequelize.define('arqerito',
    {
        modules_metasploit_http_windows: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        modules_metasploit_https_windows:{
            type: DataTypes.STRING,
            allowNull: false
        },
        modules_metasploit_http_unix:{
            type: DataTypes.BOOLEAN,
            allowNull: true         }
    },
)
export default ModulesAux;
module.exports = ModulesAux;

