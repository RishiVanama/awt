const id = Symbol("id");
const user = {
  name: "Rishi",
  [id]: 101
};

console.log(user[id]);
