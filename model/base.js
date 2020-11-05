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
    select kode as code, nama as name, jne_id, sicepat_id from ${this.table} where CHAR_LENGTH(kode) >= ? AND kode LIKE ?
    `
  }

  _buildAllProvincesQuery(){
    return `
    select kode as code, nama as name, jne_id, sicepat_id from ${this.table} where CHAR_LENGTH(kode) = 2
    `
  }

  _buildAllCitiesQuery(){
    return `
    select kode as code, nama as name, jne_id, sicepat_id from ${this.table} where CHAR_LENGTH(kode) = 5
    `
  }

  _buildChildsByParentCodeQuery(){
    return `
    select kode as code, nama as name, jne_id, sicepat_id from ${this.table} where CHAR_LENGTH(kode) = ? AND kode LIKE ?
    `
  }
}

module.exports = BaseModel