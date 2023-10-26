function generateUUID() {
  let characters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  let sectionLengths = [8, 4, 4, 4, 12];

  let UUID = '';

  sectionLengths.forEach((length, lengthIndex) => {
    for (let i = 0; i < length; i += 1) {
      let randomIndex = Math.floor(Math.random() * characters.length);
      UUID += characters[randomIndex];
    }

    if (lengthIndex < sectionLengths.length - 1) {
      UUID += '-';
    }
  });

  console.log(UUID);
}

generateUUID();