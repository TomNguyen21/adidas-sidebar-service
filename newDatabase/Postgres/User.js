const database = require('./index.js');

const User = {
  // async readAll(req, res) {
  //   try {
  //     const query = `SELECT * FROM inventory where inventory_id<1000`;
  //     const { rows } = await database.query(query);
  //     return res.send({ rows });
  //   }
  //   catch (error) {
  //     return res.send(error);
  //   }
  // }
  getAll: function (callback) {
    let queryStr = `SELECT * FROM inventory where inventory_id<1000`;
    database.query(queryStr, (err, results) => {
      callback(results);
    })
  }
};

module.exports = User;