


const DataBase = require('./DataBase')
const DML = require('./DML')



class Model {



    constructor (schema = {}) {
        this.schema = schema
    }



    /**
     * Return just one object from database
     * --------------------------------------------------------------------------------
     * @param {number}      id          The id of record to find in a table
     * @param {function}    callback    A function to call as a return value
     */
    find (id, callback) {
        this.validateCallback('list', callback)

        let db = DataBase.getConnection().toRead()

        db.get(DML.select(this.schema.table, ['id']), [id], (err, row) => {
            if (err) throw err
            else {
                db.close()
                return callback(row)
            }
        })
    }



    /**
     * Returns a collection of objects
     * --------------------------------------------------------------------------------
     * @param {array}       columns     The names of the columns that will be used in the query
     * @param {array}       params      The parameters of each column to use in the query
     * @param {function}    callback    A function to call as a return value
     */
    select (conditions = {}, callback = undefined) {
        this.validateCallback('list', callback)

        let columnKeys = this.getKeys(conditions, false)
        let columnVals = this.getVals(conditions, false)

        let db = DataBase.getConnection().toRead()

        db.all(DML.select(this.schema.table, columnKeys), columnVals, (err, rows) => {
            if (err) throw err
            else {
                db.close()
                return callback(rows) || rows
            }
        })
    }



    /**
     * Store data into a table
     * --------------------------------------------------------------------------------
     * @param {Object}  inserts The names of the columns to insert
     */
    insert (inserts = {}) {

        let insertKeys = this.getKeys(inserts)
        let insertVals = this.getVals(inserts)

        let db = DataBase.getConnection().toWrite()

        db.run(DML.insert(this.schema.table, insertKeys), insertVals, (err) => {
            if (err) throw err
        })

        db.close()
    }



    /**
     * Update fields from one or more records on database
     * ----------------------------------------------------------------------
     * @param {Object}  conditions  The conditions for updating records
     * @param {Object}  updates     The records to update
     */
    update (conditions = {}, updates = {}) {

        let sql = DML.update(
            this.schema.table,
            this.getKeys(conditions),
            this.getKeys(updates)
        )

        let columnVals = this.getVals(conditions)
        let updateVals = this.getVals(updates)
        
        let db = DataBase.getConnection().toWrite()

        db.run(sql, updateVals.concat(columnVals), (err) => {
            if (err) throw err
        })
        
        db.close()
    }



    /**
     * Remove records from a table
     * --------------------------------------------------------------------------------
     * @param {Object}  conditions  The conditions for delete records
     */
    delete (conditions = {}) {
        
        let columnKeys = this.getKeys(conditions)
        let columnVals = this.getVals(conditions)

        let db = DataBase.getConnection().toWrite()

        db.run(DML.delete(this.schema.table, columnKeys), columnVals, (err) => {
            if (err) throw err
        })

        db.close()
    }



    /**
     * Get an array containing the property names of the object 'conditions'
     * --------------------------------------------------------------------------------
     * @param {Object}  conditions  The object from which the array will be obtained
     */
    getKeys(conditions, validate = true) {
        
        if (validate) {
            this.validateObjectEntries(conditions)
        }

        return Object.keys(conditions)
    }


    /**
     * Get an array containing the property values of the object 'conditions'
     * --------------------------------------------------------------------------------
     * @param {Object}  conditions  The object from which the array will be obtained
     */
    getVals(conditions, validate = true) {

        if (validate) {
            this.validateObjectEntries(conditions)
        }

        let values = []
        let entries = Object.entries(conditions)

        entries.map(entrie => {
            values.push( entrie[1] )
        })

        return values
    }



    /**
     * Checks if all values ​​of parameter 'object' are valid
     * --------------------------------------------------------------------------------
     * @param {Object}  object  The object to check
     */
    validateObjectEntries(object = {}) {

        let entries = Object.entries(object)
        let throwlable = (!entries.length)
    
        for (let key in entries) {
            if (throwlable) break
            throwlable = ((entries[key][1] === null) || (typeof entries[key][1] === 'undefined'))
        }

        if (throwlable) {
            throw new Error(`The 'object' parameter is invalid`)
        }
    }



    /**
     * Checks whether the callback parameter is a function
     * --------------------------------------------------------------------------------
     * @param {string}    caller    The name of the function performing the verification
     * @param {function}  callback  The callback to check
     */
    validateCallback (caller, callback) {
        if (typeof callback !== 'function') {
            throw new Error(
                `${ this.constructor.name }.${ caller }(...) => The callback parameter must be a function`
            )
        }
    }
}



module.exports = Model
