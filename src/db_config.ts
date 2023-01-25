import Database from "better-sqlite3"
const dbFile = __dirname + '/../local.db';

const database = new Database(dbFile, { verbose: console.log })
database.pragma('journal_mode = WAL')

export default database