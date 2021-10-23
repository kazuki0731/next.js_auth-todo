const obj = {
  name: { f: "a", l: "b" },
  age: 31,
};

const newObj = {
  ...obj.name,
};

newObj.age = obj.age

console.log(newObj);
