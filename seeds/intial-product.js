/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// exports.seed = async function(knex) {
//   // Deletes ALL existing entries
//   await knex('table_name').del()
//   await knex('table_name').insert([
//     {id: 1, colName: 'rowValue1'},
//     {id: 2, colName: 'rowValue2'},
//     {id: 3, colName: 'rowValue3'}
//   ]);
// };

exports.seed = function (knex) {
  return knex.raw(
    `
  insert into product (id, name, price,
 manufacturer_id)
  values (1, "Aurora 5 inch Yoohoo and Friends Beaver", 23.42, 1), 
  (2, "Aurora 7-inch Gruffalo Owl", 90.2, 1),
  (3,"Gruffalo Fox 7 inch",8.87,1), 
  (4,"Water Kids Child's Swimming Jacket 18-30Kg 3-6 Years (Blue/Black) - 8 Removable Floats",12.45,2),
  (5,"Bakugan Booster Pack - B3 BAKULYTE Series - Translucent Subterra STUG (Clear Brown)",4.99,3),
  (6,"Bakugan Battle Arena",44.1,3),
  (7,"Barbie Advent Calendar",13.21,4),
  (8,"Barbie Swim Ring 20",25.99,4),
  (9,"Top Gear Extra Trading Cards Sealed Box (24 packs) [Toy]",15.69,5),
  (10,"Doctor Who Tardis Jigsaw Puzzle (500 Pieces)",9.99,5),
  (11,"Classic Spiderman Inflatable Swim Ring (20)",45.21,6),
  (12,"Roary Wheeled Swim Ring",3.5,6),
  (13,"12 pirate temporary transfer tattoos",0.9,7),
  (14,"Womens Red Space Traveller Fancy Dress Costume",12.39,7),
  (15,"Child Knight Fancy Dress Costume age 4-6",11.95,7),
  (16,"Hornby BMW E30 Coupe (Diamond Black)",19.99,8),
  (17,"Hornby R9687 Thomas and Friends British Stamps: James 00 Gauge Limited Edition Steam Locomotive",36.95,8),
  (18,"FisherPrice Imaginext Advent Calendar",24.47,9),
  (19,"Intex 160cm x 94cm x 29cm Explorer Pro 100 Boat only #58355",16.75,10),
  (20,"Intex 58864EU Comfy Cool Lounge pool chair (approx. 185 x 120 cm)",49.00,10)
  as new_data
  on duplicate key update
  name=new_data.name,
  price=new_data.price,
  manufacturer_id=new_data.manufacturer_id;
  `
  );
};
