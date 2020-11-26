function generateJsForStatements(statements) {
  const lines = [];
  for (let statement of statements) {
    const line = tp(statement);
    lines.push(line);
  }
  return lines.join('\n');
}
function tp(node) {
  if (node.type === 'closure') {
    return `${node.statements.map((d) => tp(d)).join('\n')}`;
  } else if (node.type === 'var_assign') {
    const varName = node.var_name.value;
    const jsExpr = tp(node.value);
    const js = `var ${varName} = ${jsExpr}`;
    return js;
  } else if (node.type === 'fun_call') {
    const funName = node.fun_name.value;
    const arg_list = node.arguments
      .map((arg) => {
        return tp(arg);
      })
      .join(',');
    return `${funName}(${arg_list})`;
  } else if (node.type === 'ifstate') {
    if (node.has_middle_condition && node.has_last_statement) {
      return `if(${tp(node.first_condition)}) {
      ${tp(...node.first_statement)}}
      ${node.middle_condition
        .map((d, i) => `else if(${tp(d)}) {${tp(...node.middle_statement[i])}}`)
        .join('\n')}
      else {${tp(...node.last_statement)}}
      `;
    } else if (node.has_middle_condition && !node.has_last_statement) {
      return `if(${tp(node.first_condition)}) {
      ${tp(...node.first_statement)}}
      ${node.middle_condition
        .map((d, i) => `else if(${tp(d)}) {${tp(...node.middle_statement[i])}}`)
        .join('\n')}`;
    } else if (!node.has_middle_condition && node.has_last_statement) {
      return `if(${tp(node.first_condition)}) {
      ${tp(...node.first_statement)}}
      else {${tp(...node.last_statement)}}`;
    } else {
      return `if(${tp(node.first_condition)}) {
      ${tp(...node.first_statement)}}`;
    }
  } else if (node.type === 'condition') {
    return node.value.map((d) => tp(d)).join('');
  } else if (node.type === 'array') {
    const arrayname = node.array_name.value;
    return `var ${arrayname}=[${node.array_value
      .map((d) => {
        return tp(d);
      })
      .join(',')}]`;
  } else if (node.type === 'for_block') {
    const a = node.a.value;
    const b = node.b.value;
    return `for (var ${a} in ${b}) {${tp(...node.statement)} };`;
  } else if (node.type === 'return') {
    return node.value;
  } else if (node.type === 'operator') {
    return node.value;
  } else if (node.type === 'string') {
    return node.value;
  } else if (node.type === 'number') {
    return node.value;
  } else if (node.type === 'identifier') {
    return node.value;
  } else if (node.type === 'calculator') {
    return node.value;
  } else {
    console.log('문법이 틀렸어요...');
    /* throw new Error(`unhandled ast node type 11`); */
  }
}

export default tp;
