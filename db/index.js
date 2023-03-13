const {Pool} = require(`pg`) // Use this instead (abstraction)

const config = {
    dev: {
        database: `goodfoodhunting`,
    }, 
    prod: {
        connectionString: process.env.DATABASE_URL
    }
}
// const db = new Pool({
//     database: `goodfoodhunting`,
// })

const db = new Pool(process.env.DATABASE_URL ? config.prod : config.dev) // if in database production, use the config prod. else use config dev

module.exports = db