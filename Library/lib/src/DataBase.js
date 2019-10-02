const sqlite3 = require('sqlite3')
const path = require('path')



class DataBase {
    static getConnection() {

        const file = path.resolve('./data/sparklite')

        return {

            toRead: () => {
                return new sqlite3.Database(file, sqlite3.OPEN_READONLY, err => {
                    if (err) throw err
                })
            },

            toWrite: () => {
                return new sqlite3.Database(file, sqlite3.OPEN_READWRITE, err => {
                    if (err) throw err
                })
            }
        }
    }
}



module.exports = DataBase
