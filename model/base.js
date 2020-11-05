const Db = require('../config/database')

class BaseModel{
  constructor(){
    this.db = new Db()
    this.table = 'wilayah_indonesia'
    this.codeLength = {
      PROV: 2,
      CITI: 5,
      DIST: 8,
      VILL: 13
    }
  }

  _buildHierarchyQuery(){
    return `
    select kode, nama, jne_id, sicepat_id from ${this.table} where CHAR_LENGTH(kode) >= ? AND kode LIKE ?
    `
  }

  _buildAllProvincesQuery(){
    return `
    select kode, nama, jne_id, sicepat_id from ${this.table} where CHAR_LENGTH(kode) = 2
    `
  }

  _buildAllCitiesQuery(){
    return `
    select kode, nama, jne_id, sicepat_id from ${this.table} where CHAR_LENGTH(kode) = 5
    `
  }

  _buildChildsByParentCodeQuery(){
    return `
    select kode, nama, jne_id, sicepat_id from ${this.table} where CHAR_LENGTH(kode) = ? AND kode LIKE ?
    `
  }

  async test(){
    let sql = this._buildChildsByParentCodeQuery()
    let param = [5, '33%']

    const result = await this.db.exec(sql, param)
    
    return result
  }
}

module.exports = BaseModel