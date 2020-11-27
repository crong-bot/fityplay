/* eslint-disable no-undef */
// Generated automatically by nearley, version 2.19.7
// http://github.com/Hardmath123/nearley
(function () {
  function id(x) {
    return x[0];
  }

  const mylexer = require('./lexer');
  const wrapVariable = (name) => ({
    label: 'atom',
    type: 'variable',
    value: name,
  });
  var grammar = {
    Lexer: mylexer,
    ParserRules: [
      { name: 'statements', symbols: ['closure'], postprocess: id },
      { name: 'closure$ebnf$1', symbols: [] },
      {
        name: 'closure$ebnf$1',
        symbols: ['closure$ebnf$1', 'statement'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'closure',
        symbols: ['closure$ebnf$1'],
        postprocess: (data) => [
          {
            label: 'closure',
            type: 'closure',
            statements: data[0],
          },
        ],
      },
      { name: 'statement', symbols: ['var_assign', '_m'], postprocess: id },
      { name: 'statement', symbols: ['fun_call', '_m'], postprocess: id },
      { name: 'statement', symbols: ['if_state', '_m'], postprocess: id },
      { name: 'statement', symbols: ['for_state', '_m'], postprocess: id },
      { name: 'statement', symbols: ['return', '_m'], postprocess: id },
      {
        name: 'var_assign',
        symbols: [
          mylexer.has('identifier') ? { type: 'identifier' } : identifier,
          '_',
          { literal: '=' },
          '_',
          'expr',
        ],
        postprocess: (data) => {
          return {
            label: 'state',
            type: 'var_assign',
            var_name: data[0],
            value: data[4],
          };
        },
      },
      {
        name: 'var_assign',
        symbols: [
          mylexer.has('identifier') ? { type: 'identifier' } : identifier,
          '_',
          { literal: '=' },
          '_',
          'array',
        ],
        postprocess: (data) => {
          return {
            label: 'state',
            type: 'array',
            array_name: data[0],
            array_value: data[4],
          };
        },
      },
      { name: 'fun_call$ebnf$1$subexpression$1', symbols: ['arg_list', '_'] },
      {
        name: 'fun_call$ebnf$1',
        symbols: ['fun_call$ebnf$1$subexpression$1'],
        postprocess: id,
      },
      {
        name: 'fun_call$ebnf$1',
        symbols: [],
        postprocess: function (d) {
          return null;
        },
      },
      {
        name: 'fun_call',
        symbols: [
          mylexer.has('identifier') ? { type: 'identifier' } : identifier,
          '_',
          { literal: '(' },
          '_',
          'fun_call$ebnf$1',
          { literal: ')' },
        ],
        postprocess: (data) => {
          return {
            label: 'state',
            type: 'fun_call',
            fun_name: data[0],
            arguments: data[4] ? data[4][0] : [],
          };
        },
      },
      {
        name: 'if_state',
        symbols: [
          { literal: '만약' },
          '_',
          'condition',
          mylexer.has('eol') ? { type: 'eol' } : eol,
          mylexer.has('indent') ? { type: 'indent' } : indent,
          'closure',
        ],
        postprocess: (data) => {
          return {
            label: 'state',
            type: 'ifstate',
            first_condition: data[2],
            first_statement: [...data[5]],

            has_middle_condition: false,
            middle_statement: undefined,

            has_last_statement: false,
            last_statement: undefined,
          };
        },
      },
      {
        name: 'if_state',
        symbols: [
          { literal: '만약' },
          '_',
          'condition',
          mylexer.has('eol') ? { type: 'eol' } : eol,
          mylexer.has('indent') ? { type: 'indent' } : indent,
          'closure',
          mylexer.has('dedent') ? { type: 'dedent' } : dedent,
          { literal: '거짓' },
          '_',
          mylexer.has('eol') ? { type: 'eol' } : eol,
          mylexer.has('indent') ? { type: 'indent' } : indent,
          'closure',
        ],
        postprocess: (data) => {
          return {
            label: 'state',
            type: 'ifstate',
            first_condition: data[2],
            first_statement: data[5],

            has_middle_condition: false,
            middle_statement: undefined,

            has_last_statement: true,
            last_statement: [...data[11]],
          };
        },
      },
      { name: 'if_state$ebnf$1', symbols: [] },
      {
        name: 'if_state$ebnf$1$subexpression$1',
        symbols: [
          { literal: '아니면' },
          '_',
          'condition',
          mylexer.has('eol') ? { type: 'eol' } : eol,
          mylexer.has('indent') ? { type: 'indent' } : indent,
          'closure',
          mylexer.has('dedent') ? { type: 'dedent' } : dedent,
        ],
      },
      {
        name: 'if_state$ebnf$1',
        symbols: ['if_state$ebnf$1', 'if_state$ebnf$1$subexpression$1'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'if_state',
        symbols: [
          { literal: '만약' },
          '_',
          'condition',
          mylexer.has('eol') ? { type: 'eol' } : eol,
          mylexer.has('indent') ? { type: 'indent' } : indent,
          'closure',
          mylexer.has('dedent') ? { type: 'dedent' } : dedent,
          'if_state$ebnf$1',
          { literal: '아니면' },
          '_',
          'condition',
          mylexer.has('eol') ? { type: 'eol' } : eol,
          mylexer.has('indent') ? { type: 'indent' } : indent,
          'closure',
        ],
        postprocess: (data) => {
          return {
            label: 'state',
            type: 'ifstate',
            first_condition: data[2],
            first_statement: data[5],

            has_middle_condition: true,
            middle_condition: [...data[7].map((value) => value[2]), data[10]],
            middle_statement: [...data[7].map((value) => value[5]), data[13]],

            has_last_condition: false,
            last_statement: undefined,
          };
        },
      },
      {
        name: 'if_state$ebnf$2$subexpression$1',
        symbols: [
          { literal: '아니면' },
          '_',
          'condition',
          mylexer.has('eol') ? { type: 'eol' } : eol,
          mylexer.has('indent') ? { type: 'indent' } : indent,
          'closure',
          mylexer.has('dedent') ? { type: 'dedent' } : dedent,
        ],
      },
      { name: 'if_state$ebnf$2', symbols: ['if_state$ebnf$2$subexpression$1'] },
      {
        name: 'if_state$ebnf$2$subexpression$2',
        symbols: [
          { literal: '아니면' },
          '_',
          'condition',
          mylexer.has('eol') ? { type: 'eol' } : eol,
          mylexer.has('indent') ? { type: 'indent' } : indent,
          'closure',
          mylexer.has('dedent') ? { type: 'dedent' } : dedent,
        ],
      },
      {
        name: 'if_state$ebnf$2',
        symbols: ['if_state$ebnf$2', 'if_state$ebnf$2$subexpression$2'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'if_state',
        symbols: [
          { literal: '만약' },
          '_',
          'condition',
          mylexer.has('eol') ? { type: 'eol' } : eol,
          mylexer.has('indent') ? { type: 'indent' } : indent,
          'closure',
          mylexer.has('dedent') ? { type: 'dedent' } : dedent,
          'if_state$ebnf$2',
          { literal: '거짓' },
          '_',
          mylexer.has('eol') ? { type: 'eol' } : eol,
          mylexer.has('indent') ? { type: 'indent' } : indent,
          'closure',
        ],
        postprocess: (data) => {
          return {
            label: 'state',
            type: 'ifstate',
            first_condition: data[2],
            first_statement: data[5],

            has_middle_condition: true,
            middle_condition: [...data[7].map((value) => value[2])],
            middle_statement: [...data[7].map((value) => value[5])],

            has_last_statement: true,
            last_statement: [...data[12]],
          };
        },
      },
      {
        name: 'condition',
        symbols: [
          'expr',
          '_',
          mylexer.has('operator') ? { type: 'operator' } : operator,
          '_',
          'expr',
        ],
        postprocess: (data) => {
          return {
            type: 'condition',
            value: [data[0], data[2], data[4]],
          };
        },
      },
      {
        name: 'arg_list',
        symbols: ['expr'],
        postprocess: (data) => {
          return [data[0]];
        },
      },
      {
        name: 'arg_list',
        symbols: ['arg_list', '__', 'expr'],
        postprocess: (data) => {
          return [...data[0], data[2]];
        },
      },
      { name: 'array$ebnf$1', symbols: [] },
      {
        name: 'array$ebnf$1$subexpression$1',
        symbols: [{ literal: ',' }, '_', 'expr'],
      },
      {
        name: 'array$ebnf$1',
        symbols: ['array$ebnf$1', 'array$ebnf$1$subexpression$1'],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: 'array',
        symbols: [
          { literal: '[' },
          '_',
          'expr',
          '_',
          'array$ebnf$1',
          '_',
          { literal: ']' },
        ],
        postprocess: (data) => {
          return [data[2], ...data[4].map((v) => v[2])];
        },
      },
      {
        name: 'expr',
        symbols: [mylexer.has('string') ? { type: 'string' } : string],
        postprocess: id,
      },
      {
        name: 'expr',
        symbols: [
          mylexer.has('identifier') ? { type: 'identifier' } : identifier,
        ],
        postprocess: id,
      },
      { name: 'expr', symbols: ['fun_call'], postprocess: id },
      { name: 'expr', symbols: ['AS'], postprocess: id },
      {
        name: 'for_state',
        symbols: [
          { literal: '반복' },
          '__',
          'expr',
          '_',
          mylexer.has('iterator') ? { type: 'iterator' } : iterator,
          '_',
          'expr',
          mylexer.has('eol') ? { type: 'eol' } : eol,
          mylexer.has('indent') ? { type: 'indent' } : indent,
          'closure',
        ],
        postprocess: (data) => {
          return {
            label: 'statement',
            type: 'for_block',
            a: data[2],
            iterator: data[4],
            b: data[6],
            statement: data[9],
          };
        },
      },
      {
        name: 'return',
        symbols: [{ literal: '출력' }, '_', 'expr'],
        postprocess: (d) => {
          return { type: 'return', value: d[2] };
        },
      },
      {
        name: 'P',
        symbols: [{ literal: '(' }, '_', 'AS', '_', { literal: ')' }],
        postprocess: (d) => {
          return d[2];
        },
      },
      { name: 'P', symbols: ['number'], postprocess: id },
      { name: 'MD', symbols: ['P'], postprocess: id },
      {
        name: 'MD',
        symbols: ['MD', '_', { literal: '*' }, '_', 'P'],
        postprocess: (d) => {
          return [d[0], d[2], d[4]];
        },
      },
      {
        name: 'MD',
        symbols: ['MD', '_', { literal: '/' }, '_', 'P'],
        postprocess: (d) => {
          return [d[0], d[2], d[4]];
        },
      },
      { name: 'AS', symbols: ['MD'], postprocess: id },
      {
        name: 'AS',
        symbols: ['AS', '_', { literal: '+' }, '_', 'MD'],
        postprocess: (d) => {
          return [d[0], d[2], d[4]];
        },
      },
      {
        name: 'AS',
        symbols: ['AS', '_', { literal: '-' }, '_', 'MD'],
        postprocess: (d) => {
          return [d[0], d[2], d[4]];
        },
      },
      {
        name: 'cal',
        symbols: [
          mylexer.has('calculator') ? { type: 'calculator' } : calculator,
        ],
        postprocess: id,
      },
      {
        name: 'number',
        symbols: [mylexer.has('number') ? { type: 'number' } : number],
        postprocess: id,
      },
      { name: 'number', symbols: ['float'], postprocess: id },
      {
        name: 'float',
        symbols: [
          mylexer.has('number') ? { type: 'number' } : number,
          { literal: '.' },
          mylexer.has('number') ? { type: 'number' } : number,
        ],
        postprocess: (d) => ({
          label: 'atom',
          type: 'float',
          value: d[0] + d[1] + d[2],
        }),
      },
      { name: '_$ebnf$1', symbols: [] },
      {
        name: '_$ebnf$1',
        symbols: ['_$ebnf$1', mylexer.has('ws') ? { type: 'ws' } : ws],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      { name: '_', symbols: ['_$ebnf$1'] },
      { name: '__$ebnf$1', symbols: [mylexer.has('ws') ? { type: 'ws' } : ws] },
      {
        name: '__$ebnf$1',
        symbols: ['__$ebnf$1', mylexer.has('ws') ? { type: 'ws' } : ws],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      { name: '__', symbols: ['__$ebnf$1'] },
      { name: '_m$ebnf$1', symbols: [] },
      {
        name: '_m$ebnf$1',
        symbols: ['_m$ebnf$1', mylexer.has('ws') ? { type: 'ws' } : ws],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      {
        name: '_m$subexpression$1$ebnf$1',
        symbols: [mylexer.has('eol') ? { type: 'eol' } : eol],
      },
      {
        name: '_m$subexpression$1$ebnf$1',
        symbols: [
          '_m$subexpression$1$ebnf$1',
          mylexer.has('eol') ? { type: 'eol' } : eol,
        ],
        postprocess: function arrpush(d) {
          return d[0].concat([d[1]]);
        },
      },
      { name: '_m$subexpression$1', symbols: ['_m$subexpression$1$ebnf$1'] },
      {
        name: '_m$subexpression$1',
        symbols: [mylexer.has('dedent') ? { type: 'dedent' } : dedent],
      },
      { name: '_m', symbols: ['_m$ebnf$1', '_m$subexpression$1'] },
    ],
    ParserStart: 'statements',
  };
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = grammar;
  } else {
    window.grammar = grammar;
  }
})();
export default grammar;
