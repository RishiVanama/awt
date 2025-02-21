const id = Symbol("id");
const user = {
  name: "Varun",
  [id]: 101
};

console.log(user[id]);
