import { migrate } from "#postgres/knex.js";
import {
    startWB,
}  from "./utils/functions.js";

await migrate.latest();
await startWB();
