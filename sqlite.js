var sqlite3 = require('sqlite3').verbose()
var file = './subscribeList.db' //这里写的就是数据库文件的路径
var db = new sqlite3.Database(file)

let email = []
let emailList = new Array()

function getEmail() {
  let p = new Promise(function(resolve, reject) {
    db.all('select email from email', function(err, row) {
      for (let key in row) {
        emailList.push(row[key].email)
      }
    })
    setTimeout(() => {
      resolve(emailList)
    }, 100);
  })
  return p
}

Promise.all([getEmail()])
  .then(function(data) {
    console.log(JSON.stringify(data[0]))
  })
  .catch(function(err) {
    console.log('获取数据失败： ', err)
  })
  
