"""「N4 よく出る文法30」ナレーション台本（Markdown）を timeline.json から作る。

Usage: python3 -I youtube/tools/make_n4_narration.py youtube/output youtube/05_ナレーション台本_N4文法30.md
"""
import json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from n4_grammar30_data import ITEMS  # noqa: E402

NUM = ["1", "2", "3"]
GRAMMAR_SPOKEN = {4: "ようすの そうだ", 5: "でんぶんの そうだ", 12: "やすい と にくい", 14: "うけみけい",
                  15: "しえきけい", 16: "めいれいけい", 20: "じょうけんの と", 28: "ようと 思う",
                  29: "てくれる と てもらう"}
EXAMPLE_SPOKEN = {16: "とまれ。道の かんばんで よく 見ますね。"}
ANSWER = [
    "ざんねんな ことなので、「しまいました」です。",
    "旅行の まえの じゅんびなので、「おきます」です。",
    "毎朝 がんばって つづけるので、「ように」です。",
    "できるように かわったので、「ように」です。",
    "空を 見て そう おもうので、「ふりそう」です。",
    "ニュースで 聞いたので、ふつう形の「来る」です。",
    "だれも 見て いないので、たぶん 休み。「らしいです」。",
    "歌手に にているので、「みたい」です。",
    "9時に 出たので、もう ついている「はず」です。",
    "家を 買う もくてきなので、「ために」です。",
    "勉強したのに だめだった。「のに」です。",
    "2つを いっしょに するので、「ながら」です。",
    "むずかしいので、「わかりにくい」です。",
    "飲みすぎたので、「すぎて」です。",
    "となりの 人に されたので、「ふまれました」。",
    "母が 子どもに させたので、「食べさせました」。",
    "かんばんは「とまれ」。仕事では「とまってください」です。",
    "おねがいの 文なので、「たら」です。",
    "のむ の う を え にして、「のめば」です。",
    "あいての 話を うけて いうので、「なら」です。",
    "春に なると いつも さくので、「と」です。",
    "正しいか わからないので、「かどうか」です。",
    "たぶん 雨なので、「かもしれません」です。",
    "ぜったい もつので、「なりません」です。",
    "たばこは だめなので、「いけません」です。",
    "自分で きめたので、「ことに」です。",
    "会社が きめたので、「ことに」です。",
    "自分の よていなので、「つもり」です。",
    "これから する きもちなので、「見よう」です。",
    "せんぱいが してくれたので、「くれました」です。",
]
FIXED = {
    "title": "こんにちは！ N4の 文法30、チェックしましょう。",
    "howto": "見かたです。文法と れいぶんを 読んで、クイズは 5秒で 考えてください。まちがえたら メモしましょう。",
    "pairs_intro": "さいごに、にている 文法を くらべましょう。",
    "pair:0": "そうだ には 2つの いみが あります。ふりそうです は、空を 見て そう おもう。ふるそうです は、ニュースで 聞いた。かたちに 気をつけましょう。",
    "pair:1": "ように する は、自分で がんばること。ように なる は、できるように かわること。する と なる の ちがいです。",
    "pair:2": "たら は、〜した あとで。おねがいの 文にも 使えます。ば は、もし。と は、いつも そうなる こと。なら は、あいての 話を うけて 言うときに 使います。",
    "outro": "おつかれさまでした！ まちがえた 文法は もう一度 見てください。12月6日の 試験、がんばってください！ チャンネル登録と コメントも おねがいします。",
}
RATE = 6.0  # ゆっくり話した時の 1秒あたりの音（モーラ）数の目安


def mora(s):
    s = re.sub(r"[\s、。！？「」（）・〜!?,.]", "", s)
    return sum(2 if "一" <= c <= "鿿" else 1 for c in s)


def spoken_grammar(i):
    return GRAMMAR_SPOKEN.get(i, re.sub(r"[〜（）]|（.*?）", "", ITEMS[i][0]).replace("／", " と "))


def line_for(tag):
    kind, _, arg = tag.partition(":")
    if tag in FIXED:
        labels = {"title": "オープニング", "howto": "見かた", "pairs_intro": "ペアの はじめ",
                  "pair:0": "ペア① そうだ", "pair:1": "ペア② ようにする／なる",
                  "pair:2": "ペア③ たら・ば・と・なら", "outro": "おわり"}
        return labels[tag], FIXED[tag]
    if kind == "section":
        a, b = arg.split("-")
        return f"No.{a}〜{b}", f"{a}番から {b}番です。"
    i = int(arg)
    g, mean, _, ex, q, choices, ans, _ = ITEMS[i]
    if kind == "explain":
        example = EXAMPLE_SPOKEN.get(i, ex)
        return f"No.{i + 1} {g} 解説", f"{i + 1}番、「{spoken_grammar(i)}」。いみは、{mean.replace('／', '、')}。れいぶん。{example}"
    if kind == "quiz":
        return f"No.{i + 1} クイズ＋カウントダウン", "クイズです。かっこに 入るのは どれ？ ……（5秒カウントダウン：声なしでOK）"
    if kind == "answer":
        return f"No.{i + 1} こたえ", f"こたえは {NUM[ans]}番。{ANSWER[i]}"
    raise ValueError(tag)


def mmss(s):
    s = int(s)
    return f"{s // 60}:{s % 60:02d}"


def main(out_dir, md_path):
    tl = json.load(open(os.path.join(out_dir, "timeline.json"), encoding="utf-8"))
    merged = []
    for seg in tl:
        if merged and merged[-1]["tag"] == seg["tag"]:
            merged[-1]["dur"] += seg["dur"]
        else:
            merged.append(dict(seg))
    rows, warn = [], []
    for seg in merged:
        scene, text = line_for(seg["tag"])
        limit = seg["dur"] - (5 if seg["tag"].startswith("quiz") else 0)
        m = mora(text.split("……")[0])
        flag = "⚠ 早口" if m > limit * RATE else ""
        if flag:
            warn.append(f"{mmss(seg['start'])} {scene}（{m}音 / {limit}秒）")
        rows.append(f"| {mmss(seg['start'])}〜{mmss(seg['start'] + seg['dur'])} | {seg['dur']}秒 | {scene} | {text} {flag}|")
    body = f"""# ナレーション台本：JLPT N4 よく出る文法30（全17分18秒）

字幕入りの動画（`n4_grammar30_vi_my.mp4`）に、この台本どおり声を重ねてください。
**映像の長さは変えない**でください（変えると字幕がずれます）。

## 録音のコツ
- ゆっくり、はっきり。やさしい日本語なので「1秒に6音」くらいが目安です。
- 1問は31秒：**解説14秒 → クイズ9秒（最初の4秒で読む＋5秒カウントダウン）→ こたえ8秒**
- 場面が切り替わったら、0.5秒ほど待ってから読み始めると聞きやすいです。
- 時間が余るのはOK。足りないときは「れいぶん」をもう一度ゆっくり読むと自然です。
- 録音はスマホでOK。静かな部屋で、口から20cmくらい離して録音してください。

## 録音のやり方（2つから選ぶ）
1. **編集アプリで重ねる**：CapCut などに動画を入れ、動画を見ながら場面ごとに録音して重ねる。
2. **私に送る**：全部を1つの音声ファイル（mp3/m4a）で録音して送ってもらえれば、場面に合わせて私が動画と合わせます（各場面のあいだで2秒ほど無音をあけて読んでください）。

## 台本
| 時間 | 長さ | 画面 | 読む文 |
|---|---|---|---|
""" + "\n".join(rows) + "\n"
    if warn:
        body += "\n## ⚠ 時間がきつい場面\n" + "\n".join(f"- {w}" for w in warn) + "\n"
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(body)
    print(md_path, len(rows), "rows;", len(warn), "warnings")
    for w in warn:
        print(" ", w)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
