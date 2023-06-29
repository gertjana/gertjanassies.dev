const mediumToMarkdown = require('medium-to-markdown');
 
// Enter url here
mediumToMarkdown.convertFromUrl('https://medium.com/@g-assies/practical-recursion-in-elixir-6f4596ef4d59')
.then(function (markdown) {
  console.log(markdown); //=> Markdown content of medium post
});