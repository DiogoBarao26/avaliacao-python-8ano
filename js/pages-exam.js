/* Prova no link do GitHub. O gabarito fica neste arquivo. */
const PagesExam = (() => {
  const STORAGE = "jbs_pages_record";
  const QUESTIONS = {
    1: {
      type: "true_false",
      topic: "if, elif e else",
      prompt: "A JBS FoodTech está programando a verificação de um pedido. Classifique cada afirmação sobre if, elif e else. A questão vale 1 ponto somente se todas estiverem corretas.",
      statements: [
        { id: "1", text: "O else é executado quando a condição do if é falsa e nenhum elif é verdadeiro." },
        { id: "2", text: "É possível usar vários elif para tratar situações diferentes de um pedido." },
        { id: "3", text: "O else precisa de uma condição, como em else quantidade == 0:" },
        { id: "4", text: "Quando a condição do if é verdadeira, o Python também executa os elif seguintes." }
      ],
      key: { 1: true, 2: true, 3: false, 4: false },
      explanation: "Em if/elif/else, apenas um caminho é executado. O else não recebe condição e só acontece quando o if e todos os elif são falsos. Vários elif podem aparecer em sequência. As afirmações 1 e 2 são verdadeiras. As afirmações 3 e 4 são falsas."
    },
    2: {
      type: "multiple_choice",
      topic: "Análise de código",
      prompt: "O programa abaixo confere se a quantidade pedida cabe no estoque da JBS FoodTech. Qual texto é exibido na tela?",
      code: "estoque = 12\npedido = 15\n\nif pedido < estoque:\n    print(\"Pedido aprovado\")\nelif pedido == estoque:\n    print(\"Estoque exato\")\nelse:\n    print(\"Estoque insuficiente\")\n",
      options: [
        { id: "A", text: "Pedido aprovado" },
        { id: "B", text: "Estoque exato" },
        { id: "C", text: "Estoque insuficiente" },
        { id: "D", text: "O programa apresenta um erro e não exibe nada" }
      ],
      key: "C",
      explanation: "O pedido é 15 e o estoque é 12. Como 15 não é menor que 12 e também não é igual, o programa segue para o else e exibe Estoque insuficiente."
    },
    3: {
      type: "multiple_choice",
      topic: "Operadores and e or",
      prompt: "A JBS FoodTech aprova um pedido somente quando o pagamento foi confirmado e, além disso, o estoque é suficiente ou o produto está em promoção. Qual condição representa essa regra?",
      code: "pagamento_confirmado = True\nestoque_suficiente = False\nem_promocao = True\n\nif ________________:\n    print(\"Pedido aprovado\")\nelse:\n    print(\"Pedido recusado\")\n",
      options: [
        { id: "A", text: "pagamento_confirmado and estoque_suficiente" },
        { id: "B", text: "pagamento_confirmado and (estoque_suficiente or em_promocao)" },
        { id: "C", text: "(not pagamento_confirmado) and em_promocao" },
        { id: "D", text: "estoque_suficiente and em_promocao" }
      ],
      key: "B",
      explanation: "A regra junta duas exigências com and: o pagamento confirmado e, entre parênteses, estoque suficiente ou promoção. Com os valores do enunciado, somente pagamento_confirmado and (estoque_suficiente or em_promocao) é verdadeira."
    },
    4: {
      type: "multiple_choice",
      topic: "Correção de erros",
      prompt: "O programa abaixo deveria verificar a quantidade de um pedido, mas há um erro de escrita. Qual correção resolve o problema?",
      code: "quantidade = 0\n\nif quantidade > 0\n    print(\"Quantidade válida\")\nelif quantidade == 0:\n    print(\"Informe uma quantidade\")\nelse:\n    print(\"Quantidade inválida\")\n",
      options: [
        { id: "A", text: "Trocar elif por else if" },
        { id: "B", text: "Colocar : no final da linha do if" },
        { id: "C", text: "Apagar todo o bloco else" },
        { id: "D", text: "Trocar == por = na comparação quantidade == 0" }
      ],
      key: "B",
      explanation: "Faltaram os dois-pontos no final da linha do if. Em Python, if, elif e else terminam com :. As outras alternativas não corrigem esse erro de escrita."
    },
    5: {
      type: "multiple_choice",
      topic: "Listas",
      prompt: "O programa organiza uma lista de produtos. O que ele exibe?",
      code: "produtos = [\"hamburguer\", \"batata\", \"suco\"]\nprodutos[1] = \"refrigerante\"\nprodutos.append(\"sobremesa\")\nprint(produtos[0])\nprint(len(produtos))\n",
      options: [
        { id: "A", text: "hamburguer e depois 3" },
        { id: "B", text: "refrigerante e depois 4" },
        { id: "C", text: "hamburguer e depois 4" },
        { id: "D", text: "suco e depois 3" }
      ],
      key: "C",
      explanation: "O índice 0 continua sendo hamburguer, porque a troca foi feita no índice 1. O append acrescenta sobremesa, e a lista passa a ter 4 itens. O programa exibe hamburguer e depois 4."
    },
    6: {
      type: "multiple_choice",
      topic: "Laço for",
      prompt: "O programa percorre as quantidades dos pedidos e conta quantos têm 2 ou mais unidades. O que aparece na tela?",
      code: "pedidos = [2, 5, 1, 4]\ntotal = 0\nfor quantidade in pedidos:\n    if quantidade >= 2:\n        total = total + 1\nprint(total)\n",
      options: [
        { id: "A", text: "4" },
        { id: "B", text: "3" },
        { id: "C", text: "12" },
        { id: "D", text: "1" }
      ],
      key: "B",
      explanation: "O for percorre os quatro números, mas o contador só aumenta quando a quantidade é maior ou igual a 2. Isso acontece com 2, 5 e 4. O valor 1 não entra. O programa exibe 3."
    },
    7: {
      type: "multiple_choice",
      topic: "Laço while",
      prompt: "O sistema deve pedir a quantidade enquanto ela for inválida. Quantidade válida é um número maior que zero. A variável começa valendo 0. Qual condição completa o while corretamente?",
      code: "quantidade = 0\nwhile ________________:\n    quantidade = int(input(\"Digite a quantidade: \"))\nprint(\"Quantidade aceita\")\n",
      options: [
        { id: "A", text: "quantidade > 0" },
        { id: "B", text: "quantidade <= 0" },
        { id: "C", text: "quantidade == 1" },
        { id: "D", text: "quantidade >= 0" }
      ],
      key: "B",
      explanation: "O laço precisa continuar enquanto a quantidade for inválida, isto é, menor ou igual a zero. Quando um valor maior que zero é informado, quantidade <= 0 fica falsa e a repetição termina."
    },
    8: {
      type: "multiple_choice",
      topic: "Funções",
      prompt: "A função abaixo mostra a mensagem inicial do sistema e não recebe parâmetros. Qual alternativa chama a função corretamente e exibe a mensagem?",
      code: "def mensagem_boas_vindas():\n    print(\"Bem-vindo a JBS FoodTech\")\n",
      options: [
        { id: "A", text: "mensagem_boas_vindas" },
        { id: "B", text: "mensagem_boas_vindas()" },
        { id: "C", text: "mensagem_boas_vindas(\"8A\")" },
        { id: "D", text: "def mensagem_boas_vindas()" }
      ],
      key: "B",
      explanation: "Para executar uma função sem parâmetros, escreva o nome seguido de parênteses vazios: mensagem_boas_vindas(). Sem os parênteses, a função não é chamada."
    },
    9: {
      type: "code",
      topic: "Construção de código",
      prompt: "As variáveis pagamento, estoque e quantidade já existem. pagamento vale True quando o pagamento foi confirmado e False quando não foi. Escreva um programa que exiba Aprovado quando o pagamento estiver confirmado e o estoque for suficiente (estoque maior ou igual à quantidade). Nos outros casos, exiba Recusado. Use if, else e o operador and. Escreva as palavras exatamente assim: Aprovado e Recusado. O programa será testado com vários valores. Não deixe a resposta fixa em uma única palavra.",
      starter: "# pagamento, estoque e quantidade já existem.\n# Exiba exatamente Aprovado ou Recusado.\n",
      explanationCorrect: "Sua solução aprova o pedido somente quando o pagamento está confirmado e o estoque cobre a quantidade pedida. O else trata os outros casos.",
      explanationWrong: "O pedido só pode ser aprovado quando o pagamento está confirmado e o estoque é maior ou igual à quantidade. Use if, else e and, e exiba exatamente Aprovado ou Recusado. Confira também os dois-pontos e a indentação."
    },
    10: {
      type: "code",
      topic: "Desafio integrador",
      prompt: "A lista pedidos já existe e guarda a quantidade de cada pedido. No exemplo [3, 0, 5, 2], há 3 pedidos válidos. Complete o programa com três partes: a função pedido_valido deve retornar True quando a quantidade for maior que zero e False nos outros casos; o for deve percorrer a lista pedidos; a variável aprovados deve terminar com a quantidade de pedidos válidos. O programa será testado com outras listas. Não deixe aprovados fixo em um número.",
      starter: "def pedido_valido(quantidade):\n    pass\n\naprovados = 0\nfor quantidade in pedidos:\n    if pedido_valido(quantidade):\n        aprovados = aprovados + 1\n",
      explanationCorrect: "A função identifica quantidades maiores que zero, e o for usa essa função para contar os pedidos válidos da lista.",
      explanationWrong: "A função pedido_valido precisa retornar True somente quando a quantidade é maior que zero. O for deve percorrer pedidos, chamar essa função e somar 1 em aprovados a cada pedido válido. Confira a indentação e os dois-pontos."
    }
  };

  function tokenize(source) {
    if (typeof source !== "string" || source.length > 2000 || source.includes("\0")) throw new Error("codigo");
    const lines = source.replace(/\t/g, "    ").split("\n");
    const tokens = [];
    const indents = [0];
    const pattern = /\s+|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|\d+|==|!=|<=|>=|\+=|-=|[A-Za-z_][A-Za-z0-9_]*|./g;
    lines.forEach((line) => {
      const clean = line.replace(/#.*$/, "");
      if (!clean.trim()) {
        tokens.push({ type: "NL" });
        return;
      }
      const indent = clean.match(/^ */)[0].length;
      if (indent > indents[indents.length - 1]) {
        indents.push(indent);
        tokens.push({ type: "INDENT" });
      } else {
        while (indent < indents[indents.length - 1]) {
          indents.pop();
          tokens.push({ type: "DEDENT" });
        }
        if (indent !== indents[indents.length - 1]) throw new Error("indent");
      }
      const body = clean.trim();
      let match;
      pattern.lastIndex = 0;
      while ((match = pattern.exec(body))) {
        const text = match[0];
        if (/^\s+$/.test(text)) continue;
        if (/^["']/.test(text)) tokens.push({ type: "STR", value: text.slice(1, -1).replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\'/g, "'") });
        else if (/^\d+$/.test(text)) tokens.push({ type: "NUM", value: Number(text) });
        else if (/^[A-Za-z_]/.test(text)) tokens.push({ type: "NAME", value: text });
        else tokens.push({ type: "OP", value: text });
      }
      tokens.push({ type: "NL" });
    });
    while (indents.length > 1) {
      indents.pop();
      tokens.push({ type: "DEDENT" });
    }
    tokens.push({ type: "EOF" });
    return tokens;
  }

  function parse(tokens) {
    let index = 0;
    const peek = () => tokens[index];
    const eat = (type, value) => {
      const token = peek();
      if (!token || token.type !== type || (value !== undefined && token.value !== value)) throw new Error("sintaxe");
      index += 1;
      return token;
    };
    const skipNl = () => { while (peek() && peek().type === "NL") index += 1; };
    const isName = (value) => peek() && peek().type === "NAME" && peek().value === value;
    function parseBlock() {
      eat("INDENT");
      const body = [];
      while (peek() && peek().type !== "DEDENT" && peek().type !== "EOF") {
        if (peek().type === "NL") { index += 1; continue; }
        body.push(parseStmt());
        skipNl();
      }
      eat("DEDENT");
      return body;
    }
    function parseSuite() {
      eat("OP", ":");
      skipNl();
      if (!peek() || peek().type !== "INDENT") throw new Error("bloco");
      return parseBlock();
    }
    function parseIf(keyword) {
      eat("NAME", keyword);
      const test = parseOr();
      const body = parseSuite();
      let orelse = [];
      if (isName("elif")) orelse = [parseIf("elif")];
      else if (isName("else")) {
        eat("NAME", "else");
        orelse = parseSuite();
      }
      return { type: "if", test, body, orelse };
    }
    function parseStmt() {
      if (isName("if") || isName("elif")) return parseIf(peek().value);
      if (isName("for")) {
        eat("NAME", "for");
        const name = eat("NAME").value;
        eat("NAME", "in");
        const iter = parseOr();
        return { type: "for", name, iter, body: parseSuite() };
      }
      if (isName("while")) {
        eat("NAME", "while");
        const test = parseOr();
        return { type: "while", test, body: parseSuite() };
      }
      if (isName("def")) {
        eat("NAME", "def");
        const name = eat("NAME").value;
        eat("OP", "(");
        const params = [];
        if (!(peek() && peek().type === "OP" && peek().value === ")")) {
          params.push(eat("NAME").value);
          while (peek() && peek().type === "OP" && peek().value === ",") {
            index += 1;
            params.push(eat("NAME").value);
          }
        }
        eat("OP", ")");
        return { type: "def", name, params, body: parseSuite() };
      }
      if (isName("return")) {
        eat("NAME", "return");
        if (peek().type === "NL" || peek().type === "DEDENT" || peek().type === "EOF") return { type: "return", value: { type: "const", value: null } };
        return { type: "return", value: parseOr() };
      }
      if (isName("pass") || isName("break") || isName("continue")) {
        const kind = eat("NAME").value;
        return { type: kind };
      }
      if (peek().type === "NAME" && tokens[index + 1] && tokens[index + 1].type === "OP" && ["=", "+=", "-="].includes(tokens[index + 1].value)) {
        const name = eat("NAME").value;
        const op = eat("OP").value;
        return { type: op === "=" ? "assign" : "aug", name, op, value: parseOr() };
      }
      return { type: "expr", expr: parseOr() };
    }
    function parseOr() {
      let left = parseAnd();
      while (isName("or")) { index += 1; left = { type: "bool", op: "or", left, right: parseAnd() }; }
      return left;
    }
    function parseAnd() {
      let left = parseNot();
      while (isName("and")) { index += 1; left = { type: "bool", op: "and", left, right: parseNot() }; }
      return left;
    }
    function parseNot() {
      if (isName("not")) { index += 1; return { type: "not", value: parseNot() }; }
      return parseCmp();
    }
    function parseCmp() {
      const left = parseAdd();
      const ops = [];
      const rights = [];
      const names = { "==": "eq", "!=": "ne", "<": "lt", "<=": "le", ">": "gt", ">=": "ge" };
      while (peek() && peek().type === "OP" && names[peek().value]) {
        ops.push(names[eat("OP").value]);
        rights.push(parseAdd());
      }
      return ops.length ? { type: "cmp", left, ops, rights } : left;
    }
    function parseAdd() {
      let left = parseUnary();
      while (peek() && peek().type === "OP" && (peek().value === "+" || peek().value === "-")) {
        const op = eat("OP").value;
        left = { type: "bin", op, left, right: parseUnary() };
      }
      return left;
    }
    function parseUnary() {
      if (peek() && peek().type === "OP" && peek().value === "-") {
        index += 1;
        return { type: "neg", value: parseUnary() };
      }
      return parsePrimary();
    }
    function parsePrimary() {
      const token = peek();
      if (token.type === "NUM") { index += 1; return { type: "const", value: token.value }; }
      if (token.type === "STR") { index += 1; return { type: "const", value: token.value }; }
      if (token.type === "NAME" && (token.value === "True" || token.value === "False")) {
        index += 1;
        return { type: "const", value: token.value === "True" };
      }
      if (token.type === "OP" && token.value === "(") {
        index += 1;
        const value = parseOr();
        eat("OP", ")");
        return value;
      }
      if (token.type === "OP" && token.value === "[") {
        index += 1;
        const items = [];
        if (!(peek() && peek().type === "OP" && peek().value === "]")) {
          items.push(parseOr());
          while (peek() && peek().type === "OP" && peek().value === ",") { index += 1; items.push(parseOr()); }
        }
        eat("OP", "]");
        return { type: "list", items };
      }
      if (token.type === "NAME") {
        const name = eat("NAME").value;
        if (peek() && peek().type === "OP" && peek().value === "(") {
          index += 1;
          const args = [];
          if (!(peek() && peek().type === "OP" && peek().value === ")")) {
            args.push(parseOr());
            while (peek() && peek().type === "OP" && peek().value === ",") { index += 1; args.push(parseOr()); }
          }
          eat("OP", ")");
          return { type: "call", name, args };
        }
        return { type: "name", name };
      }
      throw new Error("expressao");
    }
    function parseModule() {
      const body = [];
      skipNl();
      while (peek() && peek().type !== "EOF") {
        if (peek().type === "NL") { index += 1; continue; }
        body.push(parseStmt());
        skipNl();
      }
      return body;
    }
    return parseModule();
  }

  function truthy(value) {
    if (value === null || value === false) return false;
    if (value === true) return true;
    if (typeof value === "number") return value !== 0;
    if (typeof value === "string") return value !== "";
    if (Array.isArray(value)) return value.length !== 0;
    throw new Error("valor");
  }

  function execute(code, env) {
    const tree = parse(tokenize(code));
    const state = { env: Object.assign({}, env), local: null, functions: {}, output: [], steps: 0, depth: 0 };
    const returned = { signal: "return" };
    function step() {
      state.steps += 1;
      if (state.steps > 4000) throw new Error("limite");
    }
    function lookup(name) {
      if (state.local && Object.prototype.hasOwnProperty.call(state.local, name)) return state.local[name];
      if (Object.prototype.hasOwnProperty.call(state.env, name)) return state.env[name];
      throw new Error("nome");
    }
    function assign(name, value) {
      if (["print", "len", "True", "False", "None"].includes(name)) throw new Error("nome");
      if (state.local) state.local[name] = value;
      else state.env[name] = value;
    }
    function evalExpr(expr) {
      step();
      if (expr.type === "const") return expr.value;
      if (expr.type === "name") return lookup(expr.name);
      if (expr.type === "list") return expr.items.map(evalExpr);
      if (expr.type === "not") return !truthy(evalExpr(expr.value));
      if (expr.type === "neg") {
        const value = evalExpr(expr.value);
        if (typeof value !== "number") throw new Error("numero");
        return -value;
      }
      if (expr.type === "bin") {
        const left = evalExpr(expr.left);
        const right = evalExpr(expr.right);
        if (typeof left !== "number" || typeof right !== "number") throw new Error("numero");
        return expr.op === "+" ? left + right : left - right;
      }
      if (expr.type === "bool") {
        const left = evalExpr(expr.left);
        if (expr.op === "and") return truthy(left) ? evalExpr(expr.right) : left;
        return truthy(left) ? left : evalExpr(expr.right);
      }
      if (expr.type === "cmp") {
        let left = evalExpr(expr.left);
        for (let i = 0; i < expr.ops.length; i += 1) {
          const right = evalExpr(expr.rights[i]);
          const op = expr.ops[i];
          const ok = op === "eq" ? left === right : op === "ne" ? left !== right : op === "lt" ? left < right : op === "le" ? left <= right : op === "gt" ? left > right : left >= right;
          if (!ok) return false;
          left = right;
        }
        return true;
      }
      if (expr.type === "call") return call(expr.name, expr.args.map(evalExpr));
      throw new Error("expressao");
    }
    function call(name, args) {
      if (name === "print") {
        if (args.length !== 1) throw new Error("print");
        state.output.push(args[0]);
        return null;
      }
      if (name === "len") {
        if (args.length !== 1 || !(Array.isArray(args[0]) || typeof args[0] === "string")) throw new Error("len");
        return args[0].length;
      }
      const fn = state.functions[name];
      if (!fn) throw new Error("funcao");
      if (fn.params.length !== args.length) throw new Error("args");
      state.depth += 1;
      if (state.depth > 12) throw new Error("recursao");
      const previous = state.local;
      state.local = {};
      fn.params.forEach((param, i) => { state.local[param] = args[i]; });
      try {
        runBody(fn.body);
        return null;
      } catch (error) {
        if (error && error.signal === "return") return error.value;
        throw error;
      } finally {
        state.local = previous;
        state.depth -= 1;
      }
    }
    function runBody(body) {
      body.forEach(runStmt);
    }
    function runStmt(stmt) {
      step();
      if (stmt.type === "def") state.functions[stmt.name] = stmt;
      else if (stmt.type === "if") runBody(truthy(evalExpr(stmt.test)) ? stmt.body : stmt.orelse);
      else if (stmt.type === "assign") assign(stmt.name, evalExpr(stmt.value));
      else if (stmt.type === "aug") {
        const current = lookup(stmt.name);
        const other = evalExpr(stmt.value);
        if (typeof current !== "number" || typeof other !== "number") throw new Error("numero");
        assign(stmt.name, stmt.op === "+=" ? current + other : current - other);
      } else if (stmt.type === "for") {
        const items = evalExpr(stmt.iter);
        if (!Array.isArray(items)) throw new Error("lista");
        for (let i = 0; i < items.length; i += 1) {
          if (i > 300) throw new Error("limite");
          assign(stmt.name, items[i]);
          try { runBody(stmt.body); } catch (error) {
            if (error && error.signal === "continue") continue;
            if (error && error.signal === "break") break;
            throw error;
          }
        }
      } else if (stmt.type === "while") {
        let count = 0;
        while (truthy(evalExpr(stmt.test))) {
          count += 1;
          if (count > 300) throw new Error("limite");
          try { runBody(stmt.body); } catch (error) {
            if (error && error.signal === "continue") continue;
            if (error && error.signal === "break") break;
            throw error;
          }
        }
      } else if (stmt.type === "return") {
        const error = new Error("return");
        error.signal = "return";
        error.value = evalExpr(stmt.value);
        throw error;
      } else if (stmt.type === "break" || stmt.type === "continue") {
        const error = new Error(stmt.type);
        error.signal = stmt.type;
        throw error;
      } else if (stmt.type === "pass") return;
      else if (stmt.type === "expr") evalExpr(stmt.expr);
      else throw new Error("comando");
    }
    try { runBody(tree); } catch (error) {
      if (error && error.signal) throw new Error("fluxo");
      throw error;
    }
    return state;
  }

  function printed(output) {
    return output.map((item) => String(item).trim()).filter(Boolean);
  }

  function hasNode(body, type) {
    for (const stmt of body) {
      if (stmt.type === type) return true;
      const nested = []
        .concat(stmt.body || [])
        .concat(stmt.orelse || []);
      if (nested.length && hasNode(nested, type)) return true;
    }
    return false;
  }

  function gradeCode(number, code) {
    const tree = parse(tokenize(code));
    if (number === 9) {
      const hasElse = tree.some((stmt) => stmt.type === "if" && stmt.orelse.length) || JSON.stringify(tree).includes('"orelse":[{');
      const text = JSON.stringify(tree);
      if (!text.includes('"op":"and"') && !text.includes('"op":"or"')) return false;
      if (!hasElse && !text.includes('"type":"if"')) return false;
      if (!text.includes('"type":"if"') || !text.includes('"orelse":[{')) return false;
      const cases = [
        [{ pagamento: true, estoque: 10, quantidade: 4 }, "Aprovado"],
        [{ pagamento: true, estoque: 2, quantidade: 5 }, "Recusado"],
        [{ pagamento: false, estoque: 10, quantidade: 1 }, "Recusado"],
        [{ pagamento: true, estoque: 3, quantidade: 3 }, "Aprovado"],
        [{ pagamento: false, estoque: 8, quantidade: 8 }, "Recusado"],
        [{ pagamento: true, estoque: 0, quantidade: 0 }, "Aprovado"],
        [{ pagamento: true, estoque: 1, quantidade: 2 }, "Recusado"]
      ];
      return cases.every(([env, expected]) => printed(execute(code, env).output).join("|") === expected);
    }
    const text = JSON.stringify(tree);
    if (!text.includes('"type":"def"') || !text.includes("pedido_valido") || !text.includes('"type":"for"') || !text.includes('"name":"pedido_valido"')) return false;
    const lists = [[3, 0, 5, 2], [0, 0, 0], [1], [4, 2], [], [-1, 0, 7], [8]];
    let sample = null;
    for (const orders of lists) {
      const result = execute(code, { pedidos: orders.slice() });
      const expected = orders.filter((item) => item > 0).length;
      if (result.env.aprovados !== expected) return false;
      sample = result;
    }
    if (!sample || !sample.functions.pedido_valido) return false;
    const checks = [[3, true], [1, true], [0, false], [-3, false], [12, true]];
    return checks.every(([quantity, expected]) => {
      const probe = execute(`${code}\nresultado_funcao = pedido_valido(valor_testado)\n`, { pedidos: [], valor_testado: quantity });
      return probe.env.resultado_funcao === expected;
    });
  }

  function grade(number, response) {
    const question = QUESTIONS[number];
    if (!question || !response) throw new Error("Resposta inválida.");
    if (question.type === "true_false") {
      const answers = response.answers;
      if (!answers) throw new Error("Responda todas as afirmações.");
      const detail = question.statements.map((item) => {
        if (typeof answers[item.id] !== "boolean") throw new Error("Classifique cada afirmação como verdadeira ou falsa.");
        return { id: item.id, is_right: answers[item.id] === question.key[item.id] };
      });
      const correct = detail.every((item) => item.is_right);
      return { correct, points: correct ? 1 : 0, explanation: question.explanation, detail };
    }
    if (question.type === "multiple_choice") {
      if (!["A", "B", "C", "D"].includes(response.option)) throw new Error("Selecione uma alternativa.");
      const correct = response.option === question.key;
      return { correct, points: correct ? 1 : 0, explanation: question.explanation };
    }
    if (typeof response.code !== "string" || !response.code.trim()) throw new Error("Escreva o código antes de confirmar.");
    let correct = false;
    try { correct = gradeCode(number, response.code); } catch (_error) { correct = false; }
    const explanation = correct ? question.explanationCorrect : question.explanationWrong;
    return { correct, points: correct ? 1 : 0, explanation: correct ? explanation : `O código tem um erro de escrita ou ainda não segue o enunciado. ${explanation}` };
  }

  function publicQuestion(number) {
    const question = QUESTIONS[number];
    const payload = { number, total: 10, type: question.type, topic: question.topic, prompt: question.prompt };
    if (question.type === "true_false") payload.statements = question.statements;
    else if (question.type === "multiple_choice") {
      payload.code = question.code || "";
      payload.options = question.options;
    } else payload.starter = question.starter;
    return payload;
  }

  function nowBr() {
    const parts = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit", hour12: false
    }).formatToParts(new Date());
    const pick = (type) => parts.find((part) => part.type === type).value;
    return `${pick("day")}/${pick("month")}/${pick("year")} ${pick("hour")}:${pick("minute")}`;
  }

  function readRecord() {
    try { return JSON.parse(sessionStorage.getItem(STORAGE) || "null"); } catch (_error) { return null; }
  }
  function writeRecord(record) { sessionStorage.setItem(STORAGE, JSON.stringify(record)); }
  function progressOf(record) {
    const answered = record.acertos + record.erros;
    return {
      question: record.current,
      total: 10,
      respondidas: answered,
      acertos: record.acertos,
      erros: record.erros,
      pontuacao: record.acertos,
      progresso: Math.round(answered / 10 * 100),
      phase: record.phase
    };
  }
  function incentive(score) {
    if (score >= 9) return "Excelente trabalho! Você demonstrou segurança nos conteúdos desta avaliação.";
    if (score >= 7) return "Muito bem! Você concluiu a avaliação com um bom desempenho.";
    if (score >= 5) return "Avaliação concluída. Continue praticando para fortalecer o que você já aprendeu.";
    return "Avaliação concluída. Revise os conteúdos com calma e pratique mais um pouco. Você é capaz de avançar.";
  }
  function resultOf(record) {
    return {
      nome: record.nome,
      turma: record.turma,
      started_at: record.startedAt,
      finished_at: record.finishedAt,
      acertos: record.acertos,
      erros: record.erros,
      nota: record.acertos,
      nota_formatada: `${record.acertos},0`,
      aproveitamento: record.acertos * 10,
      mensagem: incentive(record.acertos),
      registro: "Avaliação concluída neste navegador. O link do GitHub mostra a sua nota, mas não grava a planilha da turma nem envia e-mail ao professor.",
      salvo: true,
      revisao: Object.keys(record.answers).map((number) => ({ number: Number(number), correct: record.answers[number].correct })).sort((a, b) => a.number - b.number)
    };
  }
  function stateOf(record) {
    const payload = {
      status: record.status,
      finished: record.status === "concluida",
      student: { nome: record.nome, turma: record.turma, started_at: record.startedAt },
      progress: progressOf(record)
    };
    if (record.status === "concluida") {
      payload.result = resultOf(record);
      return payload;
    }
    payload.question = publicQuestion(record.current);
    payload.feedback = null;
    if (record.phase === "feedback" && record.answers[record.current]) {
      const saved = record.answers[record.current];
      payload.feedback = {
        correct: saved.correct,
        points: saved.correct ? 1 : 0,
        explanation: saved.explanation,
        detail: saved.detail || null,
        response: saved.response
      };
    }
    return payload;
  }
  function fail(message, status) {
    const error = new Error(message);
    error.status = status;
    throw error;
  }
  function current(session) {
    const record = readRecord();
    if (!record || !session || record.token !== session.token || record.attemptId !== session.attemptId) {
      fail("Não foi possível reconhecer esta tentativa.", 401);
    }
    return record;
  }

  function handle(path, options, session) {
    const method = ((options && options.method) || "GET").toUpperCase();
    const body = (options && options.body) || {};
    if (path === "/api/start" && method === "POST") {
      const nome = String(body.nome || "").trim().replace(/\s+/g, " ");
      if (!/^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'’\-]*(?: [A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'’\-]*)+$/.test(nome)) fail("Informe o nome e o sobrenome, usando apenas letras.", 400);
      if (!["8A", "8B", "8C", "8D", "8E"].includes(body.turma)) fail("Selecione uma turma válida.", 400);
      const existing = readRecord();
      if (existing && existing.browserSession === body.browser_session) {
        if (existing.token !== body.token) fail("Esta sessão do navegador já possui uma avaliação. Continue na aba em que ela foi iniciada.", 409);
        return { attempt_id: existing.attemptId, resumed: true, finished: existing.status === "concluida", nome: existing.nome, turma: existing.turma, started_at: existing.startedAt };
      }
      const record = {
        attemptId: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        token: body.token,
        browserSession: body.browser_session,
        nome, turma: body.turma, startedAt: nowBr(), finishedAt: "",
        current: 1, phase: "respondendo", acertos: 0, erros: 0, status: "em_andamento", answers: {}
      };
      writeRecord(record);
      return { attempt_id: record.attemptId, resumed: false, finished: false, nome: record.nome, turma: record.turma, started_at: record.startedAt };
    }
    const record = current(session);
    if (path.startsWith("/api/state")) return stateOf(record);
    if (path === "/api/answer") {
      if (record.status !== "em_andamento" || record.phase !== "respondendo" || body.question !== record.current) {
        fail("Esta questão não está aberta para resposta.", 409);
      }
      const graded = grade(body.question, body.response);
      record.answers[record.current] = {
        correct: graded.correct,
        explanation: graded.explanation,
        detail: graded.detail || null,
        response: body.response
      };
      record.acertos += graded.correct ? 1 : 0;
      record.erros += graded.correct ? 0 : 1;
      record.phase = "feedback";
      writeRecord(record);
      return { correct: graded.correct, points: graded.points, explanation: graded.explanation, detail: graded.detail, locked: true, progress: progressOf(record) };
    }
    if (path === "/api/next") {
      if (record.phase !== "feedback") fail("Confirme a resposta antes de continuar.", 409);
      if (record.current >= 10) return { ready_to_finish: true, progress: progressOf(record) };
      record.current += 1;
      record.phase = "respondendo";
      writeRecord(record);
      return { ready_to_finish: false, progress: progressOf(record), question: publicQuestion(record.current), feedback: null };
    }
    if (path === "/api/finish") {
      if (record.status !== "concluida") {
        if (Object.keys(record.answers).length !== 10) fail("Ainda existem questões sem confirmação.", 409);
        record.status = "concluida";
        record.finishedAt = nowBr();
        writeRecord(record);
      }
      return { salvo: true, result: resultOf(record) };
    }
    fail("Não foi possível concluir a operação.", 404);
  }

  return { handle, grade, execute };
})();
