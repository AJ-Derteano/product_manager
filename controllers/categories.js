const knex = require('../config/mysql')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleHttpError')

const registerCategories = async (req, res) => {
  try {
    const body = matchedData(req)

    let id = await knex('categories').insert(body)

    res.status(200).send(id[0])
  } catch (err) {
    console.log(`[CATEGORY:ERROR_CREATE] ${err}`)
    handleHttpError(res, `[CATEGORY:ERROR_CREATE] ${err}`)
  }

}


module.exports = {
  registerCategories
}