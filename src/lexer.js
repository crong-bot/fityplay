const IndentifyLexer = require('@shieldsbetter/nearley-indentify');

const indentifiedLexer = new IndentifyLexer(mooLexer());

function mooLexer() {
  return require('moo').compile({
    ws: /[ \t]+/,
    nl: { match: /\n/, lineBreaks: true },
    comment: /\/\/.*?$/,
    number: /0|[1-9][0-9]*/,
    string: /'(?:\\['\\]|[^\n'\\])*'/,
    iterator: '<-',
    operator: ['==', '>=', '<=', '!=', '>', '<', '.', ','],
    calculator: ['+', '-', '*', '/', '++', '--'],
    lparen: '(',
    rparen: ')',
    lbracke: '[',
    rbracke: ']',
    lbrace: '{',
    rbrace: '}',
    identifier: /[a-zA-Z가-힣][a-zA-Z가-힣_0-9]*/,
    fatarrow: '=>',
    assign: '=',
    keyword: ['만약', '반복'],
  });
}

/* indentifiedLexer.reset(`
    Hello World
        Heres some
        indentation
    And dedentation
`);

let token = indentifiedLexer.next();
while (token) {
  console.log({ type: token.type, value: token.value });

  token = indentifiedLexer.next();
} */

module.exports = indentifiedLexer;

/* async function main() {
  //prettier-ignore
  const code = (await fs.readFile("ex2.small")).toString();
  lexer.reset(code);
  while (true) {
    const token = lexer.next();
    if (!token) {
      break;
    }
    console.log(token);
  }
}

main().catch((err) => console.log(err.stack)); */
