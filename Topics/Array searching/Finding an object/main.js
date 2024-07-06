function search(objects) {
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].name === "John" && objects[i].age === 30) {
      return i;
    }
  }
  return -1;
}

// console.log(search(exampleObj));
