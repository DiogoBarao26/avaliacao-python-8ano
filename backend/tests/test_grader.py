import ast
import io
import json
import re
import time
from contextlib import redirect_stdout

import pytest

from grader import grade
from questions_bank import Q2_CODE, Q4_CODE, Q5_CODE, Q6_CODE, Q8_CODE, QUESTIONS, public_question
from safe_python import SafeError, execute

Q9_SOLUTION = """
if pagamento and estoque >= quantidade:
    print("Aprovado")
else:
    print("Recusado")
"""

Q9_VARIANT = """
if quantidade <= estoque and pagamento == 1:
    print("Aprovado")
else:
    print("Recusado")
"""

Q10_SOLUTION = """
def pedido_valido(quantidade):
    if quantidade > 0:
        return 1
    else:
        return 0

aprovados = 0
for quantidade in pedidos:
    if pedido_valido(quantidade):
        aprovados = aprovados + 1
"""

Q10_VARIANT = """
def pedido_valido(quantidade):
    return quantidade > 0

aprovados = 0
for item in pedidos:
    if pedido_valido(item):
        aprovados += 1
"""


def test_student_questions_do_not_use_pass_or_boolean_words():
    pattern = re.compile(r"\b(True|False|pass)\b")
    for number in range(1, 11):
        text = json.dumps(public_question(number), ensure_ascii=False)
        assert pattern.search(text) is None, number


def test_public_questions_do_not_expose_the_key():
    assert len(QUESTIONS) == 10
    for number in range(1, 11):
        payload = public_question(number)
        assert payload["number"] == number
        assert "key" not in payload
        assert "explanation" not in payload
        assert "explanation_correct" not in payload


def test_closed_questions_match_traced_behavior():
    assert execute(Q2_CODE).output == ["Estoque insuficiente"]
    assert QUESTIONS[2]["key"] == "C"
    assert execute(Q6_CODE).output == [3]
    assert QUESTIONS[6]["key"] == "B"
    welcome = execute(Q8_CODE + "\nmensagem_boas_vindas()\n")
    assert welcome.output == ["Bem-vindo a JBS FoodTech"]
    assert QUESTIONS[8]["key"] == "B"
    with pytest.raises(SafeError):
        execute(Q8_CODE + "\nmensagem_boas_vindas\n")

    base = (
        "pagamento_confirmado = 1\n"
        "estoque_suficiente = 0\n"
        "em_promocao = 1\n"
    )
    options = {
        "A": "pagamento_confirmado and estoque_suficiente",
        "B": "pagamento_confirmado and (estoque_suficiente or em_promocao)",
        "C": "(not pagamento_confirmado) and em_promocao",
        "D": "estoque_suficiente and em_promocao",
    }
    truths = {letter: execute(base + f"print({expr})\n").output[0] for letter, expr in options.items()}
    assert truths == {"A": 0, "B": 1, "C": False, "D": 0}
    assert QUESTIONS[3]["key"] == "B"

    invalid_start = execute("quantidade = 0\nprint(quantidade <= 0)\nquantidade = 4\nprint(quantidade <= 0)\n")
    assert invalid_start.output == [True, False]
    still_true = execute("quantidade = 4\nprint(quantidade >= 0)\n")
    assert still_true.output == [True]
    assert QUESTIONS[7]["key"] == "B"

    with pytest.raises(SyntaxError):
        ast.parse(Q4_CODE)
    assert QUESTIONS[4]["key"] == "B"


def test_question_five_output_matches_key():
    buffer = io.StringIO()
    with redirect_stdout(buffer):
        exec(Q5_CODE, {"__builtins__": {"len": len, "print": print}}, {})
    assert buffer.getvalue().splitlines() == ["hamburguer", "4"]
    assert QUESTIONS[5]["key"] == "C"


def test_true_false_requires_every_statement():
    perfect = {"answers": {"1": True, "2": True, "3": False, "4": False}}
    almost = {"answers": {"1": True, "2": True, "3": True, "4": False}}
    assert grade(1, perfect)["points"] == 1
    assert grade(1, almost)["points"] == 0
    assert grade(1, almost)["detail"][2]["is_right"] is False


def test_multiple_choice_keys():
    expected = {2: "C", 3: "B", 4: "B", 5: "C", 6: "B", 7: "B", 8: "B"}
    for number, option in expected.items():
        assert grade(number, {"option": option})["points"] == 1
        wrong = "A" if option != "A" else "B"
        assert grade(number, {"option": wrong})["points"] == 0


def test_open_questions_accept_equivalent_code():
    assert grade(9, {"code": Q9_SOLUTION})["correct"] is True
    assert grade(9, {"code": Q9_VARIANT})["correct"] is True
    assert grade(10, {"code": Q10_SOLUTION})["correct"] is True
    assert grade(10, {"code": Q10_VARIANT})["correct"] is True
    hardcoded = """
if True:
    print("Aprovado")
else:
    print("Recusado")
"""
    assert grade(9, {"code": hardcoded})["correct"] is False
    assert grade(9, {"code": "print('Aprovado')"})["correct"] is False


def test_malicious_code_is_not_executed():
    blocked = [
        "import os\n",
        "open('segredo.txt')\n",
        "__import__('os')\n",
        "while True:\n    pass\n",
        "def pedido_valido(quantidade):\n    return pedido_valido(quantidade)\n",
    ]
    for code in blocked:
        result = grade(9, {"code": code})
        assert result["correct"] is False
        assert result["points"] == 0
    started = time.perf_counter()
    with pytest.raises(SafeError):
        execute("while True:\n    pass\n")
    with pytest.raises(SafeError):
        execute("def pedido_valido(quantidade):\n    return pedido_valido(quantidade)\npedido_valido(1)\n")
    assert time.perf_counter() - started < 2
