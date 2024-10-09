import SqlBricks from "sql-bricks";
import { createServer } from "node:http";
import { setTimeout } from "node:timers/promises";
import { select, insert } from "./db.js";
import { once } from "node:events";

createServer(async (req, res) => {
  if (req.method === "GET") {
    const query = SqlBricks.select("name, phone")
      .orderBy("name")
      .from("students")
      .toString();
    const items = select(query);

    res.end(JSON.stringify(items));
  }

  if (req.method === "POST") {
    const items = JSON.parse(await once(req, "data"));
    insert({ table: "students", items: [items] });
    res.end(
      JSON.stringify({
        message: "success",
        items: [items],
      })
    );
  }
}).listen(3000, () => {});

await setTimeout(500);

{
  const result = await (
    await fetch("http://localhost:3000", {
      method: "POST",
      body: JSON.stringify(
        {
          name: "David",
          phone: "7777777777",
        },
        {
          name: "Eve",
          phone: "2222222222",
        }
      ),
    })
  ).json();

  console.log("POST", result);
}
{
  const result = await (await fetch("http://localhost:3000")).json();

  console.log("GET", result);
}
