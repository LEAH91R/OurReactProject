const bookData = [
    {
      id: 1,
      name: "The Hitchhiker's Guide to the Galaxy",
      author: "Douglas Adams",
    },
    {
      id: 2,
      name: "Dune",
      author: "Frank Herbert",
    },
    {
      id: 3,
      name: "Project Hail Mary",
      author: "Andy Weir",
    },
    {
      id: 4,
      name: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
    },
  ];
  export const getBooks = () => {
    return new Promise((resolve, reject) => {
      const num = Math.random() * 3;
      if (num >  2) {
          reject('something happen');
      } else {
          resolve([...bookData]);
      }
      
  })
}
export const addNewBook = (book)=> {
  bookData.push(book);
  return Promise.resolve([...bookData]);
}