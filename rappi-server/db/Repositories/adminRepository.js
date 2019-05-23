'use strict'

const knex = require('../knex')

module.exports = {
  findOne: (userName) => {
    return knex('administrators').select().where({
      user_name: userName
    }).first()
  }
}
