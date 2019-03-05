/* eslint-disbale no-console  */
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Todo = require('./Todo');

const ADMIN = 'admin';
const ADMIN_PASSWORD = '123456';
const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('cache-control', 'private, max-age=0, no-cache, no-store, must-revalidate');
    res.setHeader('expires', '0');
    res.setHeader('pragma', 'no-cache');
    next();
});
passport.use(new LocalStrategy((username, password, done) => {
    if (username === ADMIN && password === ADMIN_PASSWORD) {
        done(null, 'TOKEN');
        return;
    }
    done(null, false);
}));

app.post('/login',
    passport.authenticate('local', { session: false }),
    (req, res) => {
        res.send({
            token: req.user,
        });
    }
);

app.get('/todos', (_, res) => {
    Todo.findAll().then((todos) => {
        res.send(todos);
    });
});
app.post('/todos', (req, res) => {
    Todo.create({ note: req.body.note })
        .then((todo) => {
            res.send(todo);
        });
});
app.delete('/todos/:id', (req, res) => {
    Todo.findById(req.params.id)
        .then(todo => todo.destroy())
        .then(() => res.send());
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));