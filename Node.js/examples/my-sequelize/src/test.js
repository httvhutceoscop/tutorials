/* eslint-disable no-console  */
const Sequelize = require('sequelize');
const TodoFactory = require('../models/todo');

const sequelize = new Sequelize('mysql://root:123456@192.168.10.34/nodejs_db');
sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
		const Todo = TodoFactory(sequelize, Sequelize);
		Todo.findAll().then(todos => console.log(todos));
	})
	.catch((err) => {
		console.error('Unable to connect to the database: ', err);
	});
