/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = function (knex) {
  return knex.raw(
    `
  insert into manufacturer (id, name)
  values (1, "Aurora"), (2, "BabyMad"),(3,"Bakugan"),
  (4,"Barbie"),(5,"BBC"),(6,"Halsall"),(7,"Henbrandt"),(8,"Hornby"),(9,"Imaginext"),(10,"Intex")
  as new_data
  on duplicate key update
  name=new_data.name;
  `
  );
};
