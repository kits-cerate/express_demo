const sqlite3 = require("sqlite3").verbose();
const dbPath = "./server/db/events.sqlite3";

const openDB = () => {
  let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("The database was opened successfully");
    }
  });
  return db;
};

exports.getAll = async (req, res) => {
  const dir = "./";
  let fs = require("fs");
  console.log(fs.readdirSync(dir));
  let db = openDB();
  db.serialize(() => {
    db.all("SELECT * FROM events", (err, row) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        res.json(row);
      }
    });
  });
  db.close;
};

exports.insert = async (req, res) => {
  let db = openDB();
  db.serialize(() => {
    db.run(
      `INSERT
          INTO events(groupid, eventname, startdatetime, enddatetime)
          values (
              '${req.body.groupid}'
              , '${req.body.eventname}'
              , '${req.body.startdatetime}'
              , '${req.body.enddatetime}'
          )`,
      (err, row) => {
        if (err) {
          console.log(err);
          res.json(err);
        } else {
          res.json({ message: "The event was created correctly" });
        }
      }
    );
  });
  db.close();
};

exports.delete = async (req, res) => {
  let db = openDB();
  db.serialize(function () {
    db.all(
      `DELETE
      FROM
          events 
      WHERE
          id = '${req.body.id}'`,
      (err, row) => {
        if (err) {
          console.log(err);
          res.json(err);
        } else {
          res.json({ message: "The event was deleted correctly" });
        }
      }
    );
  });
  db.close();
};

exports.update = async (req, res) => {
  let db = openDB();
  db.serialize(function () {
    db.all(
      `update events 
      set
          groupid = '${req.body.groupid}'
          , eventname = '${req.body.eventname}'
          , startdatetime = '${req.body.startdatetime}'
          , enddatetime = '${req.body.enddatetime}'
      where
          id = '${req.body.id}'`,
      (err, row) => {
        if (err) {
          console.log(err);
          res.json(err);
        } else {
          res.json({ message: "The event was updated correctly" });
        }
        console.log(row.name + ":" + row.age);
      }
    );
  });

  db.close();
};
