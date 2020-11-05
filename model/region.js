const BaseModel = require('./base')

class Region extends BaseModel {
  constructor(){
    super()
  }

  async getChildsByParent(parentCode, codeLength){
    let raw = this._buildChildsByParentCodeQuery()
    let param = [codeLength, `${parentCode}%`]
    let sql = this.db.conn.format(raw, param)

    const result = await this.db.exec(sql)

    return result
  }

  async getProvinces(){
    let sql = this._buildAllProvincesQuery()

    return await this.db.exec(sql)
  }

  async getCitiesByProvince(code){
    return await this.getChildsByParent(code, this.codeLength.CITI)
  }

  async getDistrictsByCity(code){
    return await this.getChildsByParent(code, this.codeLength.DIST)
  }

  async getVillagesByDistrict(code){
    return await this.getChildsByParent(code, this.codeLength.VILL)
  }
}

module.exports = new Region()