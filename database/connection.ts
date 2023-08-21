// Load environment variables
require("dotenv").config();
import mysql, { Connection, MysqlError, QueryOptions } from "mysql";

// // Function to perform a query on the database
// export default function queryDatabase(
//   query: string,
//   params?: any[]
// ): Promise<any> {
//   // Database configuration
//   const dbConfig = {
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_DATABASE,
//   };

//   // Create a MySQL connection pool
//   const pool = mysql.createPool(dbConfig);
//   return new Promise((resolve, reject) => {
//     pool.getConnection((err, connection) => {
//       if (err) {
//         reject(err);
//         return;
//       }

//       const options: QueryOptions = {};
//       if (params) {
//         options.values = params;
//       }

//       connection.query(
//         query,
//         options,
//         (error: MysqlError | null, results?: any[]) => {
//           connection.release(); // Release the connection back to the pool

//           if (error) {
//             reject(error);
//           } else {
//             resolve(results);
//           }
//         }
//       );
//     });
//   });
// }
