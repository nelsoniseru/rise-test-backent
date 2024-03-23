

import {Sequelize } from 'sequelize';

class DatabaseService {
    private sequelize:Sequelize;
  constructor() {
    this.sequelize = new Sequelize(
        process.env.DB_NAME, 
        process.env.DB_USER,
         process.env.DB_PASSWORD, 
         {
        host: process.env.HOST || 'localhost',
        dialect: process.env.DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' || 'mysql', // Specify available dialects
      port:parseInt(process.env.DB_PORT)

    });
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log('Database connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error;
    }
  }

  async synchronizeAllModelsWithDatabase(models) {
    try {
      for (const model of models) {
        const tableExists = await this.doesTableExist(model);
        if (!tableExists) {
            await model.sync();
          console.log(`${model.name} table has been synchronized.`);
        }
       
      }
    } catch (error) {
      console.error('Error synchronizing models with the database:', error);
      throw error;
    }
  }


  
  getSequelizeInstance() {
    return this.sequelize;
  }
  async  doesTableExist(tableName:any): Promise<boolean> {
   
      try {
        const tableNames = await this.sequelize.getQueryInterface().showAllTables();
        console.log('Retrieved table names:', tableNames);

        // Check if the tableName exists in the array of tableNames
        const exists = tableNames.find(name => name === tableName) !== undefined;
        return exists;
    } catch (error) {
        console.error('Error checking table existence:', error);
        throw error;
    
}
  }
  async close() {
    await this.sequelize.close();
    console.log('Database connection has been closed.');
  }
}
export default new DatabaseService();