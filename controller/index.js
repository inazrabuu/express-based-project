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

  async getData(req, res, next){
    let type = req.params.type || 'province'
    let code = req.query.code || '10'

    let acceptedType = [
      'province', 'city', 'district', 'village'
    ]

    let body = {
      message: '', 
      data: []
    }

    if (acceptedType.includes(type)){
      body.message = 'success'
      
      if (type == 'province'){
        try{
          body.data = await regionModel.getProvinces()
        } catch (err){
          return next(new Error(err))
        }
        
      } else {
        let exec = ''
        switch (type){
          case 'city':
            exec = regionModel.getCitiesByProvince(code)
            break
          case 'district':
            exec = regionModel.getDistrictsByCity(code)
            break
          case 'village':
            exec = regionModel.getVillagesByDistrict(code)
            break
        }
        try{
          body.data = await exec
        } catch (err){
          return next(new Error(err))
        }
      }
    } else{
      body.message = 'Unknown type'
    }

    res.json({
      code: 200,
      body: body
    })
  }
}

module.exports = Index