


class DDL {



    create (table, columns) {
        
        let cols = Object.keys(columns)
        let sql = `CREATE TABLE IF NOT EXISTS ${ table } ( id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `

        for (let i = 0; i < cols.length; i++) {
            const col = cols[i]

            sql += (i < (cols.length - 1))
                ? `${ col } ${ this.columnDefinitions(col) }, `
                : `${ col } ${ this.columnDefinitions(col) });`
        }

        return sql
    }



    columnDefinitions (col) {

        let colDefs = `${ col.type || `TEXT` } ${ col.nullable ? `NULL` : `NOT NULL` }`
    
        if (col.index) {
            colDefs += `${ col.index } `
        }
    
        if (col.increments) {
            colDefs += ` AUTOINCREMENT`
        }
    
        return colDefs
    }
}



module.exports = new DDL()