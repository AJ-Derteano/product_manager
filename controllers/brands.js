/**
 * Sheet information
 * =============================================================================
 * Date: 26/11/2022
 * 
 * 
 * Functions
 *  getAllBrands
 *  getBrandById
 *  getAllBrandsDelete
 *  getBrandByIdDelete
 *  createBrand
 *  deleteBrand
 *  updateBrand
 */
const knex = require('../config/mysql')
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleHttpError');
const handleHttpResponse = require('../utils/handleHttpResponse');

/**
 * @name getAllBrands
 * @param {object} req 
 * @param {object} res 
 * @description
 * Find and return all active brands (status = 1)
 */
const getAllBrands = async (req, res) => {
  try {
    let brands = await knex('brands').select().where({ status: 1 })
    handleHttpResponse(res, brands)
  } catch (err) {
    console.log(`[BRANDS:ERROR_FIND_ALL] ${err}`)
    handleHttpError(res, `[BRANDS:ERROR_FIND_ALL] ${err}`)
  }
}

/**
 * @name getBrandById
 * @param {object} req 
 * @param {object} res 
 * @description
 * Search and return a brand by its identifier,
 * only if it is active (status = 1)
 */
const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    let brand = await knex('brands')
      .select()
      .where({ idbrand: id, status: 1 })

    handleHttpResponse(res, brand)
  } catch (err) {
    console.log(`[BRANDS:ERROR_FIND_ONE_BY_ID] ${err}`)
    handleHttpError(res, `[BRANDS:ERROR_FIND_ONE_BY_ID] ${err}`)
  }
}

/**
 * @name getAllBrandsDelete
 * @param {object} req 
 * @param {object} res 
 * @description
 * Find and return all inactive brands (status = 0)
 */
const getAllBrandsDelete = async (req, res) => {
  try {
    let brands = await knex('brands').select().where({ status: 0 })
    handleHttpResponse(res, brands)
  } catch (err) {
    console.log(`[BRANDS:ERROR_FIND_ALL_DELETE] ${err}`)
    handleHttpError(res, `[BRANDS:ERROR_FIND_ALL_DELETE] ${err}`)
  }
}

/**
 * @name getBrandByIdDelete
 * @param {object} req 
 * @param {object} res 
 * @description
 * Find and return a brand by its identifier,
 * only if it is inactive (status = 0)
 */
const getBrandByIdDelete = async (req, res) => {
  try {
    const { id } = req.params;
    let brand = await knex('brands')
      .select()
      .where({ idbrand: id, status: 0 })

    handleHttpResponse(res, brand)
  } catch (err) {
    console.log(`[BRANDS:ERROR_FIND_ONE_BY_ID] ${err}`)
    handleHttpError(res, `[BRANDS:ERROR_FIND_ONE_BY_ID] ${err}`)
  }
}

/**
 * @name createBrand
 * @param {object} req 
 * @param {object} res
 * @description
 * Register a brand, for this it requires the following data:
 *  body:
 *    brand
 *    user_created
 *    user_updated
 */
const createBrand = async (req, res) => {
  try {
    const body = matchedData(req)

    let id = await knex('brands').insert(body)

    handleHttpResponse(res, { id: id[0] })
  } catch (err) {
    console.log(`[BRANDS:ERROR_CREATE] ${err}`)
    handleHttpError(res, `[BRANDS:ERROR_CREATE] ${err}`)
  }

}

/**
 * @name deleteBrand
 * @param {object} req 
 * @param {object} res
 * @description
 * Delete a brand by changing its status
 *    status = 1 =>> status = 0
 */
const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    let brand = await knex('brands')
      .where({ idbrand: id, status: 1 })
      .update({
        status: 0
      })

    handleHttpResponse(res, brand)
  } catch (err) {
    console.log(`[BRANDS:ERROR_DELETE] ${err}`)
    handleHttpError(res, `[BRANDS:ERROR_DELETE] ${err}`)
  }
}

/**
 * @name updateBrand
 * @param {object} req 
 * @param {object} res 
 * @description
 * Update the name of the brand if it is active,
 * it requires the following data:
 *  params:
 *    id => Brand identifier
 *  body:
 *    brand => New brand name
 */
const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) throw 'The identifier[ID], is required'

    const body = matchedData(req)

    let brand = await knex('brands')
      .where({ idbrand: id, status: 1 })
      .update(body)

    handleHttpResponse(res, brand)
  } catch (err) {
    console.log(`[BRANDS:ERROR_UPDATE] ${err}`)
    handleHttpError(res, `[BRANDS:ERROR_UPDATE] ${err}`)
  }
}


module.exports = {
  getAllBrands,
  getBrandById,
  getAllBrandsDelete,
  getBrandByIdDelete,
  createBrand,
  deleteBrand,
  updateBrand
}