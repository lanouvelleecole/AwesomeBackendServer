

// Our function UnquoteString will take a string 'str' as an argument.
export const UnquoteString = (str) => {
  
  // Chain of two functions: first .trim(), then .replace()
  // .trim() method removes whitespaces and such from both ends of the string
  // and returns a copy of the string with the unwanted filler removed.
  str = str.trim();
  
  // The replace() method takes two arguments: a 'searchValue' and a 'newSubstr'.
  // It then returns a new string with some or all matches of the 'searchValue' replaced with 'newSubstr'.
  // In our case 'newSubstr' is empty, effectively deleting the matches.
  // The 'searchValue' is a regular expression, matching strings that start and end with the same kind of quote.
  str = str.replace(/^(['"`])(.*)\1$/, "$2");
  
  // We use ^(['"`]) to capture the starting quote. ^ is an assertion for the start of the string.
  // (['"`]) represents any of the three kinds of quotes.
  // Everything that matches this pattern will be put into a special group that we can refer back to as \1.
  // The sequence (.*) captures everything else inside the quotes. .* means 'zero or more of any character'.
  // Finally, \1 stands for exactly the same as the first captured character (the opening quote).
  
  // The replace function will replace everything that matches our regular expression (i.e., the entire quoted string)
  // with whatever is inside of the quotes ($2 refers to the second captured group, i.e., everything inside the quotes).
  
  // Finally, we return the unquoted string.
  return str;
}

