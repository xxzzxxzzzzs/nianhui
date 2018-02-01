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

  var mycars = new Array();
  mycars[0] = "张三丰";
  mycars[1] = "李世民";
  mycars[2] = "康熙";
  mycars[3] = "雍正";
  mycars[4] = "太上老君";
  mycars[5] = "玉皇大帝";
  mycars[6] = "王母娘娘";
  mycars[7] = "某人";
  mycars[8] = "孙悟空";

  var mycars2 = new Array();
  mycars2[0] = '/stylesheets/images/1.jpg';
  mycars2[1] = '/stylesheets/images/2.jpg';
  mycars2[2] = '/stylesheets/images/3.jpg'
  mycars2[3] = '/stylesheets/images/4.jpg'
  mycars2[4] = '/stylesheets/images/5.jpg'
  mycars2[5] = '/stylesheets/images/6.jpg'
  mycars2[6] = '/stylesheets/images/7.jpg'
  mycars2[7] = '/stylesheets/images/8.jpg'
  mycars2[8] = '/stylesheets/images/8.jpg'
  var mycars3 = new Array();
  mycars3[0] = 'timeline-content';
  mycars3[1] = 'timeline-content right';
  todo.set('content', content);
  todo.set('imgType',mycars2[i]);
  todo.set('name',mycars[i]);
  todo.set('type',mycars3[i%2]);

  todo.save().then(function(todo) {
    res.redirect('/todos');
  }).catch(next);
});

module.exports = router;
