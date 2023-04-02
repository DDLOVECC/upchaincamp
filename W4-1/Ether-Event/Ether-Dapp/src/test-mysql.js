var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "db_chain"
});

const sql = "INSERT INTO t_chain_text (tx_from, tx_to) VALUES ('Ox', 'mk')";
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});