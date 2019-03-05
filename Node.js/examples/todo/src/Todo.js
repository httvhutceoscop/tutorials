const DELAY = 1000;
const todoById = {
  1516820260715: {
    id: '1516820260715',
    note: 'Hello Todos',
  },
  1516820289796: {
    id: '1516820289796',
    note: 'Another Todo',
  },
};
const todoIds = [
  '1516820260715',
  '1516820289796',
];
const Todo = ({ id, note }) => ({
  id,
  note,
  destroy() {
    return new Promise((resolve) => {
      delete todoById[this.id];
      todoIds.splice(todoIds.indexOf(this.id), 1);
      resolve();
    }, DELAY);
  },
});
module.exports = {
  create({ note }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const id = Date.now().toString();
        todoById[id] = {
          id,
          note,
        };
        todoIds.push(id);
        resolve(Todo(todoById[id]));
      }, DELAY);
    });
  },
  findAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(todoIds.map(id => Todo(todoById[id])));
      }, DELAY);
    });
  },
  findById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Todo(todoById[id]));
      }, DELAY);
    });
  },
};
