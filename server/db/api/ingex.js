const connection = require('../config');

function getData(){
    return new Promise((resolve, reject) => {
        
            connection.query(` SELECT * FROM mainTable `, (error, results, fields) => {
                if(error) {
                    reject(error)
                    return
                };
            resolve(results) ;
        });
    })
}

function postData(user_name, numbers_range, the_number_of_user, amount_of_tries, all_numbers_of_comp){
    return new Promise((resolve, reject) => {
            console.log(`INSERT INTO mainTable (user_name,  numbers_range, the_number_of_user, amount_of_tries, all_numbers_of_comp )
			values (?,?,?,?,?)`, [user_name, numbers_range, the_number_of_user, amount_of_tries, all_numbers_of_comp])
            connection.query(`INSERT INTO mainTable (user_name, numbers_range, the_number_of_user, amount_of_tries, all_numbers_of_comp )
			values (?,?,?,?,?)`, [user_name, numbers_range, the_number_of_user, amount_of_tries, all_numbers_of_comp], (error, results, fields) => {
                if(error) {
                    reject(error)
                    return
                };
            resolve(results) ;
        });
    })
}

module.exports = {getData, postData}