
const pg = require('pg');


const pool = new pg.Pool({
  user: 'nightcalls',
  host: '135.0.72.83',
  database: 'nightcalls',
  password: 'realhero',
  port: 8090,
})

module.exports = {
	createUser : (username, password, callback) =>
	{
		const text = 'INSERT INTO users (username, password) VALUES ($1, $2)'
		const values = [username,password]

		pool.query(text, values, (err, res) => {
		  if (err) 
		  {
		    console.log(err.stack)
		    callback('Error with query in createUser')
		  } 
		  else 
		  {
		    console.log('Inserted User' + username);
        	console.log(res);
        	callback('SUCCESS')
		  }
		})
	}
	,
	loginUser : (username, password, callback) =>
	{
		const text = 'SELECT userid, username FROM users WHERE username = $1 AND password = $2'
		const values = [username,password]


		pool.query(text, values, (err, res) => {
		  if (err) 
		  {
		    console.log(err.stack)
		    callback('Error with query in loginUser')
		  } 
		  else 
		  {
		    console.log('Found User:' + username);
        	console.log(res);

        	if(res.rows.length > 0)
        	{
        		callback(res.rows[0])
        	}
        	else
        	{	
        		callback("UNKNOWN");
        	}
        	
		  }
		})
	}
	,
	closeClient : () =>
	{
		pool.end();
	}

};