
function makeUUID() {
  let lengthsUUID = [8, 4, 4, 4, 12]; 
  let characters = 'abcdef0123456789';
  let charactersLength = characters.length;
  
  let arrUUID = lengthsUUID.map(length => {
    let string = '';
    while (string.length < length) {
      let randomCharacter = characters[Math.floor(Math.random() * charactersLength)];
      string += randomCharacter;
    }
    return string; 
  })

  let UUID = arrUUID.join('-')
  console.log(UUID);
}

makeUUID();
makeUUID();
makeUUID();