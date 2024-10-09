import { DatabaseSync } from "node:sqlite";
import SqlBricks from "sql-bricks";
const database = new DatabaseSync("./db.sqlite");

function runSeed(items) {
  database.exec(`
        DROP TABLE IF EXISTS students`);

  database.exec(`
        CREATE TABLE students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL
        ) STRICT
        
    `);
  insert({ table: "students", items });
}

export function select(query) {
  return database.prepare(query).all();
}

export function insert({ table, items }) {
  const { text, values } = SqlBricks.insertInto(table, items).toParams({
    placeholder: "?",
  });

  const insertStatement = database.prepare(text);
  insertStatement.run(...values);
}

runSeed([
  {
    name: "John",
    phone: "1234567890",
  },
  {
    name: "Jane",
    phone: "0987654321",
  },
  {
    name: "Bob",
    phone: "5555555555",
  },
  {
    name: "Alice",
    phone: "1111111111",
  },
  {
    name: "Charlie",
    phone: "9999999999",
  },
]);
