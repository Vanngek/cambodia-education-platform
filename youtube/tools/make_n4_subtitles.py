"""timeline.json から ベトナム語・ミャンマー語の字幕（.srt）を作る。

Usage: python3 -I youtube/tools/make_n4_grammar30.py youtube/output --timeline-only
       python3 -I youtube/tools/make_n4_subtitles.py youtube/output
"""
import json, os, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from n4_grammar30_data import ITEMS as JA  # noqa: E402
from n4_grammar30_i18n import COMMON, ITEMS  # noqa: E402

MARKS = ["①", "②", "③"]


def ts(sec):
    ms = int(round(sec * 1000))
    h, ms = divmod(ms, 3600000)
    m, ms = divmod(ms, 60000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def text_for(tag, lang):
    c, items = COMMON[lang], ITEMS[lang]
    kind, _, arg = tag.partition(":")
    if kind in ("title", "howto", "pairs_intro", "outro"):
        return c[kind]
    if kind == "section":
        a, b = arg.split("-")
        return c["section"].format(a=a, b=b)
    if kind == "pair":
        return c["pairs"][int(arg)]
    i = int(arg)
    meaning, example, answer, tip = items[i]
    if kind == "explain":
        return f"No.{i + 1} {JA[i][0]}: {meaning}\n{c['example']}: {example}"
    if kind == "quiz":
        return f"No.{i + 1} — {c['quiz']}"
    if kind == "answer":
        return f"{c['answer']} {MARKS[JA[i][6]]}: {answer}\n{tip}"
    raise ValueError(tag)


def main(out_dir):
    timeline = json.load(open(os.path.join(out_dir, "timeline.json"), encoding="utf-8"))
    # merge consecutive segments with the same tag (quiz + countdown)
    merged = []
    for seg in timeline:
        if merged and merged[-1]["tag"] == seg["tag"]:
            merged[-1]["dur"] += seg["dur"]
        else:
            merged.append(dict(seg))
    for lang in ("vi", "my"):
        path = os.path.join(out_dir, f"n4_grammar30.{lang}.srt")
        with open(path, "w", encoding="utf-8") as f:
            for n, seg in enumerate(merged, 1):
                start, end = seg["start"] + 0.1, seg["start"] + seg["dur"] - 0.1
                f.write(f"{n}\n{ts(start)} --> {ts(end)}\n{text_for(seg['tag'], lang)}\n\n")
        print(path, len(merged), "cues")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "youtube/output")
