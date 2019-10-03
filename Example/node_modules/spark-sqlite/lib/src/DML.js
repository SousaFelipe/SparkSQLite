


class DML {



    /**
     * Create a query string to insert data into a table
     * ----------------------------------------------------------------------
     * @param {String}  table   The name of the table
     * @param {Array}   inserts The names of the columns that will be inserted
     */
    insert (table, inserts) {

        let sql = `INSERT INTO ${ table } (`
    
        for (let i = 0; i < inserts.length; i++) {
            sql += (i < (inserts.length - 1)) ? `${ inserts[i] }, ` : `${ inserts[i] }) VALUES (`
        }
    
        for (let i = 0; i < inserts.length; i++) {
            sql += (i < (inserts.length - 1)) ? `?, ` : `?)`
        }
    
        return sql
    }

    

    /**
     * Create a query string to select one or more records from a table
     * ----------------------------------------------------------------------
     * @param {String}  table       The name of the table
     * @param {Array}   conditions  An array containing the query conditions
     */
    select (table, conditions) {

        let sql = `SELECT * FROM ${ table } `
    
        if (conditions.length > 0) {

            sql += `WHERE `

            for (let i = 0; i < conditions.length; i++) {
                sql += (i < (conditions.length - 1)) ? `${ conditions[i] }=? AND ` : `${ conditions[i] }=?`
            }
        }
    
        return sql
    }



    /**
     * Create a query string to update one or more records from a table
     * ----------------------------------------------------------------------
     * @param {String}  table       The name of the table
     * @param {Array}   conditions  An array containing the query conditions
     * @param {Array}   updates     The names of the columns that will be updated
     */
    update (table, conditions, updates) {

        let sql = `UPDATE ${ table } SET `
                
        for (let i = 0; i < updates.length; i++) {
            sql += (i < (updates.length - 1)) ? `${ updates[i] }=? AND ` : `${ updates[i] }=? WHERE `
        }
    
        for (let i = 0; i < conditions.length; i++) {
            sql += (i < (conditions.length - 1)) ? `${ conditions[i] }=? AND ` : `${ conditions[i] }=?`
        }
    
        return sql
    }



    /**
     * Create a query string to remove one or more records from a table
     * ----------------------------------------------------------------------
     * @param {String}  table       The name of the table
     * @param {Array}   conditions  An array containing the query conditions
     */
    delete (table, conditions) {

        let sql = `DELETE FROM ${ table } `
        
        if (conditions.length > 0) {

            sql += `WHERE `

            for (let i = 0; i < conditions.length; i++) {
                sql += (i < (conditions.length - 1)) ? `${ conditions[i] }=? AND ` : `${ conditions[i] }=?`
            }
        }

        return sql
    }



    table (name) {

        return {

            exists: () => {
                return `SELECT count(*) FROM sqlite_master WHERE type='table' AND name='${ name }'`
            },

            truncate: () => {
                return `TRUNCATE TABLE ${ name }`
            }
        }
    }
}



module.exports = new DML()
