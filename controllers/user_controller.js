const express = require(`express`)
const router = express.Router()

router.get(`/users`) // list of users
router.post(`/users`) // create user
router.delete(`/users/:user_id`) // delete a user
router.put(`/users/:id`) // update a user
router.get(`/users/new`) // new user form
router.get(`/users/:id/edit`) // new user form
router.get(`/users/:id`) // details of a user
