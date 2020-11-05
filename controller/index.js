const regionModel = require('../model/region')

class Index{
  constructor(){

  }

  index(req, res, next){
    res.json({
      code: 200,
      body: process.env.APP_NAME
    })
  }

  async test(req, res, next){
    let response = {}

    try {
      // response = await regionModel.getProvices()
      // response = await regionModel.getCitiesByProvince('17')
      // response = await regionModel.getDistrictsByCity('17.02')
      response = await regionModel.getVillagesByDistrict('17.02.10')
    } catch (err){
      return next(new Error(err))
    }
    
    res.json({
      code: 200,
      body: response
    })
  }
}

module.exports = Index