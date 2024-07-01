const express = require('express')
const cors = require('cors')
const app = express()

// Cấu hình cors để chỉ cho phép domain cụ thể
app.use(
  cors()
)

app.use(express.json())

// Ví dụ route
app.get('/api/v1/books', (req, res) => {
  res.json({ message: 'Danh sách sách' })
})

// Lắng nghe trên cổng 8080 và tất cả các địa chỉ IP
app.listen(8080, '0.0.0.0', () => {
  console.log('Server is running on port 8080')
})
