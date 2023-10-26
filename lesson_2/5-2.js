// Practice Problem 2
// How would you order the following array of objects based on the year of publication of each book, from the earliest to the latest?

let books = [
  { title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', published: '1967' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: '1925' },
  { title: 'War and Peace', author: 'Leo Tolstoy', published: '1869' },
  { title: 'Ulysses', author: 'James Joyce', published: '1922' },
  { title: 'The Book of Kells', author: 'Multiple Authors', published: '800' },
];


books.sort((a, b) => {
  return Number(a.published) - Number(b.published);
});

console.log(books);


// longer alternatives
// books.sort((a, b) => {
//   let year1 = a.published;
//   let year2 = b.published;

//   return Number(year1) - Number(year2);
// });

// books.sort((a, b) => {
//   let arr1 = Object.entries(a);
//   let arr2 = Object.entries(b)

//   let year1 = arr1[2][1];
//   let year2 = arr2[2][1];

//   return year1 - year2;
// });



