require('dotenv').config();
const path = require('path');
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

// Database Pool Configuration
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Start Server
async function startServer() {
    try {
        await pool.getConnection();
        console.log('Database connected successfully');

        app.listen(process.env.PORT || 3000, () => {
            console.log('Server started on port 3000');
        });
    } catch (error) {
        console.error('Failed to connect to the database', error);
    }
}
startServer();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/admin', async(req, res) => {
    const { destination, minPrice, maxPrice, minDuration, maxDuration } = req.query;

    // Start the base SQL query
    let query = 'SELECT * FROM TourPackages WHERE 1=1';
    const queryParams = [];

    // Filter by destination
    if (destination) {
        query += ' AND destination LIKE ?';
        queryParams.push(`%${destination}%`);
    }

    // Filter by price range
    if (minPrice && maxPrice) {
        query += ' AND price BETWEEN ? AND ?';
        queryParams.push(minPrice, maxPrice);
    }

    // Filter by duration range
    if (minDuration && maxDuration) {
        query += ' AND duration BETWEEN ? AND ?';
        queryParams.push(minDuration, maxDuration);
    }
    let connection;
    try {
        connection = await pool.getConnection(); // Get a connection from the pool
        const [results] = await connection.query(query, queryParams); // Execute the query
        if (req.xhr) {
            res.json({ packages: results });
        } else {
            res.render('admin', { packages: results, filters: req.query });
        } // Render the results in a view
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error fetching packages'); // Handle error response
    } finally {
        if (connection) connection.release(); // Release the connection back to the pool
    }
});

// Add Tour Package
app.post('/admin/add_tourpackage', async (req, res) => {
    const { package_name, destination, price, duration, start_date, end_date, description } = req.body;
    const insert_query = `
        INSERT INTO TourPackages 
        (package_name, description, price, duration, start_date, end_date, destination) 
        VALUES (?, ?, ?, ?, ?, ?, ?);`;
    const values = [package_name, description, price, duration, start_date, end_date, destination];

    let connection;
    try {
        connection = await pool.getConnection(); // Get a connection from the pool
        await connection.query(insert_query, values);
        console.log('Package added successfully');
        res.redirect('/admin'); // Redirect on success
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error adding package'); // Handle the error response
    } finally {
        if (connection) connection.release(); // Release the connection back to the pool
    }
});

// Update Tour Package
app.get('/admin/update_tourpackage/:id', async (req, res) => {
    const packageId = req.params.id;
    const query = 'SELECT * FROM TourPackages WHERE package_id = ?';

    let connection;
    try {
        connection = await pool.getConnection();
        const [results] = await connection.query(query, [packageId]);
        if (results.length > 0) {
            res.render('update_tourpackage', { package: results[0] });
        } else {
            res.status(404).send('Package not found');
        }
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error fetching package for update');
    } finally {
        if (connection) connection.release();
    }
});

app.post('/admin/update_tourpackage/:id', async (req, res) => {
    const packageId = req.params.id;
    const { package_name, destination, price, duration, start_date, end_date, description } = req.body;

    const update_query = `
        UPDATE TourPackages 
        SET package_name = ?, description = ?, price = ?, duration = ?, start_date = ?, end_date = ?, destination = ? 
        WHERE package_id = ?;
    `;

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.query(update_query, [package_name, description, price, duration, start_date, end_date, destination, packageId]);
        res.redirect('/admin'); // Redirect after update
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error updating package');
    } finally {
        if (connection) connection.release();
    }
});

// Delete Tour Package
app.post('/admin/delete_tourpackage/:id', async (req, res) => {
    const packageId = req.params.id;
    const delete_query = 'DELETE FROM TourPackages WHERE package_id = ?';

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.query(delete_query, [packageId]);
        res.redirect('/admin'); // Redirect after deletion
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error deleting package');
    } finally {
        if (connection) connection.release();
    }
});


//customer
app.get('/customer', async (req, res) => {
    const { destination, minPrice, maxPrice, minDuration, maxDuration } = req.query;

    // Start the base SQL query
    let query = 'SELECT * FROM TourPackages WHERE 1=1';
    const queryParams = [];

    // Filter by destination
    if (destination) {
        query += ' AND destination LIKE ?';
        queryParams.push(`%${destination}%`);
    }

    // Filter by price range
    if (minPrice && maxPrice) {
        query += ' AND price BETWEEN ? AND ?';
        queryParams.push(minPrice, maxPrice);
    }

    // Filter by duration range
    if (minDuration && maxDuration) {
        query += ' AND duration BETWEEN ? AND ?';
        queryParams.push(minDuration, maxDuration);
    }
    let connection;
    try {
        connection = await pool.getConnection(); // Get a connection from the pool
        const [results] = await connection.query(query, queryParams); // Execute the query
        if (req.xhr) {
            res.json({ packages: results });
        } else {
            res.render('customer', { packages: results, filters: req.query });
        } // Render the results in a view
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error fetching packages'); // Handle error response
    } finally {
        if (connection) connection.release(); // Release the connection back to the pool
    }
});
//customer book tour package
app.get('/customer/book_tourpackage/:id',async (req,res)=>{
    const packageId = req.params.id;
    const query = 'SELECT * FROM TourPackages WHERE package_id = ?';

    let connection;
    try {
        connection = await pool.getConnection();
        const [results] = await connection.query(query, [packageId]);
        if (results.length > 0) {
            res.render('book_tourpackage', { package: results[0] });
        } else {
            res.status(404).send('Package not found');
        }
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error fetching package for update');
    } finally {
        if (connection) connection.release();
    }
})

app.post('/customer/book_tourpackage/:id', async (req, res) => {
    const { first_name, last_name, phone_number, email, address } = req.body;

    const insert_query = `
        INSERT INTO customers (first_name, last_name, email, phone_number, address) 
        VALUES (?, ?, ?, ?, ?);
    `;
    const values = [first_name,last_name, email, phone_number, address];

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.query(insert_query, values);
        res.render('booking_completed');
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error booking customer');
    } finally {
        if (connection) connection.release();
    }
});