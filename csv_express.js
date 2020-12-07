const express = require('express')
const fs = require('fs')

const app = express()

app.get('/employees/:id/:attribute?', function(req, res){
  fs.readFile('employees.csv', 'utf8', function(err, data) {
    if (err) {
      console.log(err.message)
      return;
    }
    let headers = data.split(/\r?\n/)[0]
    headers = headers.split(",")
    let objectEmployee = {}
  
    data.split(/\r?\n/).forEach(function(row) {
      row.split(',').forEach(function(column, columnIndex) {
        if (columnIndex == 0 && column == req.params.id) {
          row.split(',').map(function(column, columnIndex) {
          objectEmployee[headers[columnIndex]] = column        
        })
        return
      }
      })  
    })
    
    if (req.params.attribute != "" && req.params.attribute != null) {
      res.send(objectEmployee[req.params.attribute])
    } else {
      res.send(objectEmployee)
    }
})
}) 

app.listen(3000, function() {
  console.log("Application")
})