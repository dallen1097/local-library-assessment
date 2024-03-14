function findAccountById(accounts, id) {
  // YOUR SOLUTION HERE
  // Hint: You can use the [`find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) method here. 
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  // YOUR SOLUTION HERE
  // Hint: You can use the [`sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method here. 
  // Create a shallow copy of the accounts array to avoid mutating the original data
  const accountsCopy = [...accounts];

  // Use the sort() method to sort the copied accounts array
  accountsCopy.sort((a, b) => {
    // Compare the last names from the name object in each account
    const lastNameA = a.name.last.toLowerCase(); // Normalize casing
    const lastNameB = b.name.last.toLowerCase(); // Normalize casing

    // Comparison logic for sorting
    if (lastNameA < lastNameB) {
      return -1; // a comes before b
    }
    if (lastNameA > lastNameB) {
      return 1; // a comes after b
    }

    // names are equal
    return 0;
  });

  // Return the sorted copy of the accounts array
  return accountsCopy;
}

function getAccountFullNames(accounts) {
  // YOUR SOLUTION HERE
  // Hint: You can use the [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method here.
  return accounts.map(account =>
    account.name.first && account.name.last 
    ? `${account.name.first} ${account.name.last}` 
    : 'Unknown Name');
}

// NOTE: YOU DON'T HAVE TO EDIT THE FUNCTIONS BELOW
function getTotalNumberOfBorrows(account, books) {
  return books.reduce((acc, book) => {
    const count = book.borrows.reduce((borrowAcc, borrow) => {
      return borrow.id === account.id ? borrowAcc + 1 : borrowAcc;
    }, 0);

    return acc + count;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  return books
    .filter((book) => {
      const recent = book.borrows[0];
      return !recent.returned && recent.id === account.id;
    })
    .map((book) => {
      const author = authors.find((author) => author.id === book.authorId);
      return { ...book, author };
    });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getAccountFullNames,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
