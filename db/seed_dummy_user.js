const bcrypt = require(`bcrypt`);
const {Client} = require (`pg`) // Not pool because we only use once

const db = new Client({
    database: `goodfoodhunting`
})

db.connect()

const email = `dt@ga.co`
const textpassword = `pudding`

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(textpassword, salt, (err, digestedPass) => {

        const sql = `INSERT INTO users (email, password_digest) VALUES ('${email}', '${digestedPass}');`
        // digestedPass is what we save in db
        console.log(digestedPass);

        db.query(sql, (err, dbRes) => {
            console.log(err);
            db.end()
        })

    })
})
