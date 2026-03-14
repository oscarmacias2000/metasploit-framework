import { Sequelize } from '@sequelize/core';
import {PostgresDialect} from '@sequelize/postgres'
import { DataTypes } from '@sequelize/core';



const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: 'modules',
    user: 'arqerito',
    password: '123456',
    host: 'localhost',
    port: 5433,
    ssl: false,
    clientMinMessages: 'notice'
})


async function main(){
     try {

    await sequelize.authenticate()
    console.log("ha iniciado exitosamente!")
    console.log("conexion establecida!")

    // ✅ Define primero el modelo
    const ModulesHTTP = sequelize.define("arqerito", {
      modules_metasploit_http_windows: {
        type: DataTypes.STRING,
       
      },
       modules_metasploit_https_windows:{
                  type: DataTypes.STRING,
                  allowNull: true
       },

         modules_metasploit_http_unix:{
            type: DataTypes.BOOLEAN,
         
         },

         Msf__Exploits__Remote__HttpServer:{type: DataTypes.BOOLEAN, allowNull: true},
         Msf__Exploits__Remote__HttpServer__HTML:{type: DataTypes.BOOLEAN, allowNull:true},
         Msf__Exploits__Remote__BrowserExploitServer:{type: DataTypes.BOOLEAN, getDataTypeId: DataTypes.UUID, allowNull:true}
    },  {tableName: "modulesHTTP", timestamps: true}
);

//more models or tables
    const ModulesFTP = sequelize.define("arqerito", {
        modules_ftp: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {tableName: "modulesFTP", timestamps: true}
)
  

    const ModulesTCP = sequelize.define("arqerito",
        {
            modules_tcp:{
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {tableName: "modulesTCP", timestamps: true}
    )

    const modules = sequelize.define("arqerito",
        {
            namemodule:{
                type: DataTypes.STRING,
                allowNull: true
            },
                description:{
                type: DataTypes.STRING,
                allowNull: true
             },   type:{
                type: DataTypes.STRING,
                allowNull: true
                },   plataform:{
                type: DataTypes.STRING,
                allowNull: true
             }  
        },
        {tableName: "modules", timestamps: false}
        //namemodule, description, type, plataform
    )

    await sequelize.getQueryInterface().dropTable("table_name");

    // ✅ Luego sincroniza
    await sequelize.sync({ force: true})

    const tables = await sequelize.queryInterface.listTables()
    console.log("Tablas existentes:", tables)

  } catch (error) {
    console.error("conexion no encontrada!", error)
  }

}

main();

export default sequelize;