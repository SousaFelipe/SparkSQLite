


const DML = require('./DML')
const DDL = require('./DDL')
const DataBase = require('./DataBase')



class Schema {



    constructor(table, props) {

        this.table = table
        this.props = props

        this.ready(exists => {
            if (!exists) {
                this.up()
            }
        })
    }



    up () {
        this.ready(exists => {
            if (!exists) {
                
                let db = DataBase.getConnection().toWrite()
        
                db.exec(DDL.create(this.table, this.props), err => {
                    if (err) throw err
                    else console.log(`Table '${ this.table }' was [created] successfully!`)
                })
        
                db.close()
            }
        })
    }



    down() {
        this.ready(exists => {
            if (exists) {

                let db = DataBase.getConnection().toWrite()
        
                db.exec(DML.table(this.table).truncate(), err => {
                    if (err) throw err
                    else console.log(`Table '${ this.table }' was [truncated] successfully!`)
                })
        
                db.close()
            }
        })
    }



    ready (callback) {

        let db = DataBase.getConnection().toRead()

        db.each(DML.table(this.table).exists(), (err, result) => {
            if (err) throw err
            else {
                db.close()
                result = (result[`count(*)`] > 0)
                return callback(result) || result
            }
        })
    }
}



module.exports = Schema
