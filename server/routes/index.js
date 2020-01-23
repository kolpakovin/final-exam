var express = require('express');
var router = express.Router();

const { getData, postData } = require('../db/api/ingex')

router.get('/', function (req, res, next) {
  getData()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json({ error: error.message }))
})

router.post('/', async function (req, res, next) {
  try {
    console.log('req.body1: ', req.body)
    const { user_name, numbers_range, the_number_of_user, amount_of_tries, all_numbers_of_comp } = req.body
    await postData(user_name, numbers_range, the_number_of_user, amount_of_tries, all_numbers_of_comp)
    res.status(201).json( "Ok" );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})
module.exports = router;
