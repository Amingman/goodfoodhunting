const express = require(`express`)
const router = express.Router()
const ensureLoggedIn = require(`../middlewares/code ensure_logged_in`)
// const {Pool} = require(`pg`) // Use this instead (abstraction)
// const db = new Pool({
//     database: `goodfoodhunting`,
// })
const db = require(`../db`)




// client.connect() // Do this globally. Will crash probably due to asynchronous function call
router.get(["/", "", "/dishes"] /* route for all these */, (req, res) => {
    console.log(req.session.userID);
    const sql = `SELECT * FROM dishes;`
    // client.query(sql, (err, dbRes) => {
    db.query(sql, (err, dbRes) => {
        // console.log(dbRes);
        // console.log(err);
        // console.log(`hello`);
        // res.send(dbRes.rows)
        // client.end() // This must be before render because otherwise it will not close the client
        res.render("home", {dishes:dbRes.rows, email: req.session.userEmail })
    })

})


// router.get(`/dishes/cake`, (req, res) => {
//     const sql = `SELECT * FROM dishes;`

//     db.query(sql, (err, dbRes) => {

//         // client.end() // This must be before render because otherwise it will not close the client
//         res.render("cake", {dishes:dbRes.rows})
//     })
//     // res.render(`cake`)
// })
router.get(`/dishes/new`, ensureLoggedIn, (req, res) => {
    res.render(`new_dish`)
})

router.get(`/dishes/:dishID`, ensureLoggedIn, (req, res) => {
    const sql = `SELECT * FROM dishes where id = '${req.params.dishID}';`

    // res.send(sql)
    db.query(sql, (err, dbRes) => {
        const dish = dbRes.rows[0]
        // res.send(dbRes)
        res.render("details", { dish })
    })

})




/*
// router.get(`/share_dish`, (req, res) => { // Wrong semantics
router.post(`/share_dish`, (req, res) => { // Same but different but still the same... and correct
    // INSERT INTO players (name, score) VALUES ('whoopi', 5);

    const sql = `INSERT INTO dishes (title, image_url) VALUES ('${req.query.title}', '${req.query.image_url}');`

    // https://images.immediate.co.uk/production/volatile/sites/30/2022/09/cropped-miguel-b9e922f.jpg?quality=90&resize=960,872
    // res.send(`dish shared`)
    // res.send(sql)

    db.query(sql, (err, dbRes) => {
        // console.log(err);
        res.redirect("/") // redirect always get
    })
})

*/




router.post(`/dishes`, ensureLoggedIn, (req, res) => { // post has no query string. we use instead
    // INSERT INTO players (name, score) VALUES ('whoopi', 5);
    // console.log(req.body); // this does not work on its own because express is limited --> must use express.urlencoded like above ^
    // req.body will return the object like req.query

    const sql = `INSERT INTO dishes (title, image_url, user_id) VALUES ($1, $2, $3);` // Note that it is now req.body

    console.log(`Adding new dish...`);
    // Crispy pork belly
    // https://www.recipetineats.com/wp-content/uploads/2021/04/Slow-Roasted-Pork-Belly-with-Jus-and-routerle-Sauce-SQ.jpg
    let dataInsert = [req.body.title, req.body.image_url, req.session.userID]
    db.query(sql, dataInsert, (err, dbRes) => {
        res.redirect("/")
    })
})



router.delete(`/dishes/:id/delete_dish`, (req, res) => { //if you want to use delete, must add additional info in the ejs, as well as using express method-override. go check it out
// router.post(`/delete_dish`, (req, res) => {
    console.log(`Trying to delete...`);
    const id = req.params.id

    const sql = `DELETE FROM dishes WHERE id = ${id};`
    db.query(sql, (err, dbRes) => {
        // console.log(err);
        console.log(`Deleted. Redirecting....`);

        res.redirect("/")
    })
})





router.get(`/dishes/:id/edit_dish`, (req, res) => {
    const sql = `SELECT * FROM dishes WHERE id = $1;`
    // console.log(sql);
    db.query(sql, [req.session.userID], (err, dbRes) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(dbRes);
            let dish = dbRes.rows[0]
            res.render(`edit_dish`, {dish})
        }
    })
})


router.post(`/dishes/:id`, (req, res) => {
    const sql = `UPDATE dishes SET title = '${req.body.title}' WHERE id = ${req.body.id};`
    // console.log(sql);
    db.query(sql, (err, dbRes) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(dbRes);
            const dish = dbRes.rows[0]
            // console.log(dish);
            // res.send(dish)
            // console.log(dbRes);
            res.redirect(`/dishes/${req.body.id}`)
        }
    })

    // res.send(sql)
})

module.exports = router