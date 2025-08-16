// 安装mysql2包: npm install mysql2

const mysql = require('mysql2');

// 创建数据库连接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lotto'
});

// 连接数据库
connection.connect(err => {
    if (err) {
        console.error('连接失败:', err.stack);
        return;
    }
    console.log('连接成功，ID:', connection.threadId);
});

// 查询数据
connection.query('SELECT * FROM ssq', (err, results, fields) => {
    if (err) throw err;

    console.log('查询结果:', results);

    // 处理结果...
});

// 关闭连接
connection.end();