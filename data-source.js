"use strict";
exports.__esModule = true;
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("src/users/entities/user.entity");
var profile_entity_1 = require("src/profile/entities/profile.entity");
var project_entity_1 = require("src/project/entities/project.entity");
var post_entity_1 = require("src/post/entities/post.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'mynest',
    entities: [user_entity_1.User, profile_entity_1.Profile, project_entity_1.Project, post_entity_1.Post],
    migrations: ['src/migration/*.ts'],
    synchronize: false
});
exports.AppDataSource.initialize()
    .then(function () {
    console.log('Data Source has been initialized!');
})["catch"](function (err) {
    console.error('Error during Data Source initialization', err);
});
