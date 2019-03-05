/* eslint-disbale no-console  */
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jwt-simple');
const Todo = require('./Todo');
const ADMIN = 'admin';
const ADMIN_PASSWORD = '123456';
const SECRET = 'vietnt@2019';
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
        done(null, jwt.encode({ username }, SECRET));
        return;
    }
    done(null, false);
}));
passport.use(new BearerStrategy((token, done) => {
    try {
        const { username } = jwt.decode(token, SECRET);
        if (username === ADMIN) {
            done(null, username);
            return;
        }
        done(null, false);
    } catch (error) {
        done(null, false);
    }
}));

app.post('/login',
    passport.authenticate('local', { session: false }),
    (req, res) => {
        res.send({
            token: req.user,
        });
    }
);

app.get('/todos',
    passport.authenticate('bearer', { session: false }),
    (_, res) => {
        Todo.findAll().then((todos) => {
            res.send(todos);
        });
    });
app.post('/todos',
    passport.authenticate('bearer', { session: false }),
    (req, res) => {
        Todo.create({ note: req.body.note })
            .then((todo) => {
                res.send(todo);
            });
    });
app.delete('/todos/:id',
    passport.authenticate('bearer', { session: false }),
    (req, res) => {
        Todo.findById(req.params.id)
            .then(todo => todo.destroy())
            .then(() => res.send());
    });

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));