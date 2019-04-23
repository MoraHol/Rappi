'use strict'
module.exports = {
    addTimeStamps: (knex, name) => {
        return knex.schema.alterTable(name, table => {
          table.timestamp('created_at').defaultTo(knex.fn.now())
          table.timestamp('updated_at').defaultTo(knex.fn.now())
        })
          .then(() => {
            return knex.raw(`
              CREATE OR REPLACE FUNCTION update_modified_column()
              RETURNS TRIGGER AS $$
              BEGIN
                NEW.updated_at = now();
                RETURN NEW;
              END;
              $$ language 'plpgsql';
      
              CREATE TRIGGER update_${name}_updated_at
              BEFORE UPDATE ON ${name}
              FOR EACH ROW
              EXECUTE PROCEDURE update_modified_column();
            `)
          })
      }
}