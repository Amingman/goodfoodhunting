const express = require(`express`)
const router = express.Router()
const bcrypt = require(`bcrypt`);

// const {Pool} = require (`pg`) // Not pool because we only use once

// const db = new Pool({
//     database: `goodfoodhunting`
// })
const db = require(`../db`)

router.get(`/login`, (req, res) => {
    res.render(`login`)
}) // session


// This is not the session. This is just checking your ID. To start a session, see server.js
router.post(`/sessions`, (req, res) => {
    // This to check if session is active
    console.log(req.session)

    const email = req.body.email
    const textpassword = req.body.password
    
    
    // do you even exist?
    const sql = `SELECT * FROM users WHERE email = '${email}';`
    
    db.query(sql, (err, dbRes) => {
        if (dbRes.rows.length == 0) {
            // no good, user doesn't exist in the users table. Stay at the login page
            // console.log(err);
            res.render(`login`)
            // either put the bcrypt inside an else or use return after res.render(`login`)
        } else {
            const user = dbRes.rows[0]
            bcrypt.compare(textpassword, user.password_digest, (err, result) => {
                if (result) {
                    // checked your id
                    req.session.userID = user.id
                    req.session.userEmail = user.email


                    res.redirect(`/`)
                } else {
                    res.render(`login`)
                }
            })
        }
    })
    // res.json(req.body)
})






// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(textpassword, salt, (err, digestedPass) => {

//         const sql = `INSERT INTO users (email, password_digest) VALUES ('${email}', '${digestedPass}');`
//         // digestedPass is what we save in db
//         console.log(digestedPass);

//         db.query(sql, (err, dbRes) => {
//             console.log(err);
//             db.end()
//         })

//     })
// })

router.get(`/logout`, (req, res) => { // change this to delete instead of get when got time
    req.session.destroy(() => {
        res.redirect(`/`)
    })
})



module.exports = router