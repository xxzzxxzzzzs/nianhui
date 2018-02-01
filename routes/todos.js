'use strict';
var router = require('express').Router();
var AV = require('leanengine');

var Todo = AV.Object.extend('Todo');

// 查询 Todo 列表
router.get('/', function(req, res, next) {
  var query = new AV.Query(Todo);
  query.descending('createdAt');
  query.find().then(function(results) {
    res.render('todos', {
      title: 'TODO 列表',
      todos: results
    });
  }, function(err) {
    if (err.code === 101) {
      // 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，说明 Todo 数据表还未创建，所以返回空的 Todo 列表。
      // 具体的错误代码详见：https://leancloud.cn/docs/error_code.html
      res.render('todos', {
        title: 'TODO 列表',
        todos: []
      });
    } else {
      next(err);
    }
  }).catch(next);
});

// 新增 Todo 项目
router.post('/', function(req, res, next) {
  var content = req.body.content;
  var todo = new Todo();
  var i=Math.floor(Math.random()*7)+1;
  var imgType="thumb user-"+i
  var mycars = new Array();
  mycars[0] = "Saab";
  mycars[1] = "Volvo";
  mycars[2] = "BMW";
  mycars[3] = "Saab";
  mycars[4] = "Volvo";
  mycars[5] = "BMW";
  mycars[6] = "Saab";
  mycars[7] = "Volvo";
  mycars[8] = "BMW";
  todo.set('content', content);
  todo.set('imgType',imgType);
  todo.set('name',mycars[i]);

  todo.save().then(function(todo) {
    res.redirect('/todos');
  }).catch(next);
});

module.exports = router;
