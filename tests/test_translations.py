"""The integration's texts against CONTEXT.md: the words it rules out."""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

import pytest

TRANSLATIONS = (
    Path(__file__).parent.parent / "custom_components/electricity_lens/translations"
)

# Words CONTEXT.md rules out, by language.
RULED_OUT: dict[str, list[tuple[str, str]]] = {
    "de": [
        (r"Solar", "PV, not Solar"),
        (r"Verbraucher", "Gerät, not Verbraucher"),
        (r"Kategorie", "Bereich, not Kategorie"),
    ],
    "en": [
        (r"\bsolar\b", "PV, not solar"),
        (r"\bconsumers?\b", "device, not consumer"),
        (r"\bcategor", "area, not category"),
    ],
}


def _texts(node: Any, path: str = "") -> list[tuple[str, str]]:
    """Return each text with its path, without placeholders such as {solar}."""
    if isinstance(node, dict):
        return [
            item
            for key, value in node.items()
            for item in _texts(value, f"{path}.{key}" if path else key)
        ]
    if isinstance(node, str):
        return [(path, re.sub(r"\{\w+\}", "", node))]
    return []


@pytest.mark.parametrize("language", ["de", "en"])
def test_no_text_uses_a_word_context_rules_out(language: str) -> None:
    """Setup, options, entities, and statistics use the terms of CONTEXT.md."""
    texts = _texts(json.loads((TRANSLATIONS / f"{language}.json").read_text()))
    found = [
        f"{path}: {text!r} ({why})"
        for path, text in texts
        for word, why in RULED_OUT[language]
        if re.search(word, text, re.IGNORECASE if language == "en" else 0)
    ]
    assert found == []
