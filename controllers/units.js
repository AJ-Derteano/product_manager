/**
 * Sheet information
 * =============================================================================
 * Date: 26/11/2022
 * 
 * 
 * Functions
 *  getAllUnits
 *  getUnitById
 *  getAllUnitsDelete
 *  getUnitByIdDelete
 *  createUnit
 *  deleteUnit
 *  updateUnit
 */
const knex = require('../config/mysql')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleHttpError');
const handleHttpResponse = require('../utils/handleHttpResponse');

/**
 * @name getAllUnits
 * @param {object} req 
 * @param {object} res 
 * @description
 * Find and return all active units (status = 1)
 */
const getAllUnits = async (req, res) => {
  try {
    let units = await knex('units').select().where({ status: 1 })
    handleHttpResponse(res, units)
  } catch (err) {
    console.log(`[UNITS:ERROR_FIND_ALL] ${err}`)
    handleHttpError(res, `[UNITS:ERROR_FIND_ALL] ${err}`)
  }
}

/**
 * @name getUnitById
 * @param {object} req 
 * @param {object} res 
 * @description
 * Search and return a brand by its identifier,
 * only if it is active (status = 1)
 */
const getUnitById = async (req, res) => {
  try {
    const { id } = req.params;
    let brand = await knex('units')
      .select()
      .where({ idunit: id, status: 1 })

    handleHttpResponse(res, brand)
  } catch (err) {
    console.log(`[UNITS:ERROR_FIND_ONE_BY_ID] ${err}`)
    handleHttpError(res, `[UNITS:ERROR_FIND_ONE_BY_ID] ${err}`)
  }
}

/**
 * @name getAllUnitsDelete
 * @param {object} req 
 * @param {object} res 
 * @description
 * Find and return all inactive units (status = 0)
 */
const getAllUnitsDelete = async (req, res) => {
  try {
    let units = await knex('units').select().where({ status: 0 })
    handleHttpResponse(res, units)
  } catch (err) {
    console.log(`[UNITS:ERROR_FIND_ALL] ${err}`)
    handleHttpError(res, `[UNITS:ERROR_FIND_ALL] ${err}`)
  }
}

/**
 * @name getUnitByIdDelete
 * @param {object} req 
 * @param {object} res 
 * @description
 * Find and return a brand by its identifier,
 * only if it is inactive (status = 0)
 */
const getUnitByIdDelete = async (req, res) => {
  try {
    const { id } = req.params;
    let brand = await knex('units')
      .select()
      .where({ idunit: id, status: 0 })

    handleHttpResponse(res, brand)
  } catch (err) {
    console.log(`[UNITS:ERROR_FIND_ONE_BY_ID] ${err}`)
    handleHttpError(res, `[UNITS:ERROR_FIND_ONE_BY_ID] ${err}`)
  }
}

/**
 * @name createUnit
 * @param {object} req 
 * @param {object} res
 * @description
 * Register a brand, for this it requires the following data:
 *  body:
 *    brand
 *    user_created
 *    user_updated
 */
const createUnit = async (req, res) => {
  try {
    const body = matchedData(req)

    let id = await knex('units').insert(body)

    handleHttpResponse(res, { id: id[0] })
  } catch (err) {
    console.log(`[UNITS:ERROR_CREATE] ${err}`)
    handleHttpError(res, `[UNITS:ERROR_CREATE] ${err}`)
  }

}

/**
 * @name deleteUnit
 * @param {object} req 
 * @param {object} res
 * @description
 * Delete a brand by changing its status
 *    status = 1 =>> status = 0
 */
const deleteUnit = async (req, res) => {
  try {
    const { id } = req.params;
    let brand = await knex('units')
      .where({ idunit: id, status: 1 })
      .update({
        status: 0
      })

    handleHttpResponse(res, brand)
  } catch (err) {
    console.log(`[UNITS:ERROR_DELETE] ${err}`)
    handleHttpError(res, `[UNITS:ERROR_DELETE] ${err}`)
  }
}

/**
 * @name updateUnit
 * @param {object} req 
 * @param {object} res 
 * @description
 * Update the name of the brand if it is active,
 * it requires the following data:
 *  params:
 *    id => Unit identifier
 *  body:
 *    brand => New brand name
 */
const updateUnit = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) throw 'The identifier[ID], is required'

    const body = matchedData(req)

    let brand = await knex('units')
      .where({ idunit: id, status: 1 })
      .update(body)

    handleHttpResponse(res, brand)
  } catch (err) {
    console.log(`[UNITS:ERROR_UPDATE] ${err}`)
    handleHttpError(res, `[UNITS:ERROR_UPDATE] ${err}`)
  }
}


module.exports = {
  getAllUnits,
  getUnitById,
  getAllUnitsDelete,
  getUnitByIdDelete,
  createUnit,
  deleteUnit,
  updateUnit
}