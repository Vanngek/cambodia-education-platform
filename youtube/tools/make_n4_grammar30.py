"""「JLPT N4 よく出る文法30」動画を生成する（声なし版：文字＋カウントダウン＋効果音）。

Usage: python3 -I youtube/tools/make_n4_grammar30.py [output_dir]
出力: n4_grammar30.mp4, thumbnail.png, chapters.txt
必要: ffmpeg, Pillow, numpy, fonts-noto-cjk
"""
import os, sys, subprocess, wave
import numpy as np
from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from n4_grammar30_data import ITEMS, PAIRS  # noqa: E402

W, H = 1920, 1080
BG, NAVY, ORANGE, GREEN, GRAY, WHITE, RED = "#FFF8EE", "#1F3A5F", "#F28C28", "#2E9E5B", "#7A7A7A", "#FFFFFF", "#D93A3A"
FONT_DIR = "/usr/share/fonts/opentype/noto"
CHANNEL = "Nippon No Omoi"


def font(size, bold=True):
    name = "NotoSansCJK-Bold.ttc" if bold else "NotoSansCJK-Regular.ttc"
    return ImageFont.truetype(os.path.join(FONT_DIR, name), size, index=0)


def wrap(draw, text, f, max_w):
    """Wrap at spaces when possible, otherwise per character."""
    lines, cur = [], ""
    tokens = []
    for part in text.split(" "):
        tokens.append(part + " ")
    for tok in tokens:
        if draw.textlength(cur + tok, font=f) <= max_w:
            cur += tok
            continue
        if cur:
            lines.append(cur.rstrip())
            cur = ""
        while draw.textlength(tok, font=f) > max_w:  # very long token
            i = 1
            while draw.textlength(tok[:i + 1], font=f) <= max_w:
                i += 1
            lines.append(tok[:i])
            tok = tok[i:]
        cur = tok
    if cur.strip():
        lines.append(cur.rstrip())
    return lines


def text_block(draw, xy, text, f, fill, max_w, spacing=1.35, align="left"):
    x, y = xy
    lines = [l for para in text.split("\n") for l in wrap(draw, para, f, max_w)]
    for line in lines:
        lx = x if align == "left" else x + (max_w - draw.textlength(line, font=f)) / 2
        draw.text((lx, y), line, font=f, fill=fill)
        y += int(f.size * spacing)
    return y


def base(header):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, 110], fill=NAVY)
    d.text((60, 28), f"{CHANNEL}｜JLPT N4 よく出る文法30", font=font(44), fill=WHITE)
    if header:
        tw = d.textlength(header, font=font(44))
        d.text((W - 60 - tw, 28), header, font=font(44), fill=ORANGE)
    d.rectangle([0, H - 14, W, H], fill=ORANGE)
    return img, d


def centered_slide(title, lines, header="", title_color=NAVY):
    img, d = base(header)
    y = text_block(d, (160, 260), title, font(96), title_color, W - 320, align="center")
    y += 50
    for line in lines:
        y = text_block(d, (200, y), line, font(56, False), NAVY, W - 400, align="center") + 20
    return img


def explain_slide(n, item):
    g, mean, en, ex, *_ = item
    img, d = base(f"No.{n} / 30")
    d.rounded_rectangle([80, 160, 260, 300], 24, fill=ORANGE)
    t = str(n)
    d.text((170 - d.textlength(t, font=font(90)) / 2, 168), t, font=font(90), fill=WHITE)
    text_block(d, (300, 150), g, font(110), NAVY, W - 380)
    y = text_block(d, (300, 330), "いみ：" + mean, font(60), NAVY, W - 380)
    y = text_block(d, (300, y + 5), en, font(44, False), GRAY, W - 380)
    top = max(y + 50, 600)
    d.rounded_rectangle([120, top, W - 120, top + 300], 28, fill=WHITE)
    d.rectangle([120, top, 140, top + 300], fill=ORANGE)
    d.text((180, top + 30), "れいぶん", font=font(40), fill=ORANGE)
    text_block(d, (180, top + 100), ex, font(64), NAVY, W - 400)
    return img


def quiz_slide(n, item, count=None, reveal=False):
    g, _, _, _, q, choices, ans, tip = item
    img, d = base(f"No.{n} / 30　クイズ")
    text_block(d, (120, 170), "（　　）に 入るのは どれ？", font(52), GRAY, W - 240)
    qw = W - 600
    for size in (74, 64, 56, 50):
        if len(wrap(d, q, font(size), qw)) <= 2:
            break
    y = text_block(d, (120, 260), q, font(size), NAVY, qw)
    y = max(y + 30, 470)
    marks = ["①", "②", "③"]
    for i, c in enumerate(choices):
        top = y + i * 140
        fill, color = WHITE, NAVY
        if reveal:
            fill, color = (GREEN, WHITE) if i == ans else ("#EEE6DA", "#B0A99F")
        d.rounded_rectangle([160, top, 1200, top + 115], 24, fill=fill, outline=NAVY if not reveal else fill, width=4)
        d.text((200, top + 18), f"{marks[i]}  {c}", font=font(64), fill=color)
    if count is not None:
        cx, cy, r = 1600, 640, 190
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=RED if count <= 2 else ORANGE)
        t = str(count)
        f = font(230)
        bbox = d.textbbox((0, 0), t, font=f)
        d.text((cx - (bbox[2] - bbox[0]) / 2 - bbox[0], cy - (bbox[3] - bbox[1]) / 2 - bbox[1]), t, font=f, fill=WHITE)
    if reveal:
        d.text((1260, y + 10), "こたえ", font=font(52), fill=GREEN)
        d.text((1260, y + 70), marks[ans], font=font(160), fill=GREEN)
        text_block(d, (1260, y + 280), tip, font(42), NAVY, W - 1260 - 60)
    return img


def pair_slide(title, lines):
    img, d = base("まちがえやすい ペア")
    text_block(d, (120, 180), title, font(84), ORANGE, W - 240)
    y = 380
    for line in lines:
        d.rounded_rectangle([120, y, W - 120, y + 120], 24, fill=WHITE)
        d.text((170, y + 22), line, font=font(60), fill=NAVY)
        y += 150
    return img


def thumbnail():
    img = Image.new("RGB", (1280, 720), NAVY)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 520, 1280, 720], fill=ORANGE)
    d.text((60, 40), "JLPT", font=font(110), fill=WHITE)
    d.text((60, 160), "N4 文法30", font=font(180), fill="#FFD84D")
    d.text((60, 545), "試験まえに これだけ！", font=font(96), fill=WHITE)
    d.ellipse([1030, 30, 1260, 260], fill=RED)
    for t, yy, s in [("12/6", 65, 84), ("ちょくぜん", 165, 40)]:
        f = font(s)
        d.text((1145 - d.textlength(t, font=f) / 2, yy), t, font=f, fill=WHITE)
    return img


# ---------- audio ----------
SR = 44100


def tone(freqs, dur, vol=0.35, decay=6.0):
    t = np.linspace(0, dur, int(SR * dur), endpoint=False)
    s = sum(np.sin(2 * np.pi * f * t) for f in freqs) / len(freqs)
    return (s * np.exp(-decay * t) * vol).astype(np.float32)


SOUNDS = {
    "tick": tone([880], 0.12, 0.3, 25),
    "last": tone([1175], 0.2, 0.35, 15),
    "ding": np.concatenate([tone([1319, 1976], 0.18, 0.35, 6), tone([1760, 2637], 0.9, 0.35, 4)]),
    "start": np.concatenate([tone([523, 784], 0.15, 0.3, 8), tone([659, 988], 0.15, 0.3, 8), tone([784, 1175], 0.7, 0.3, 4)]),
}


def build(out_dir, render=True):
    frames = os.path.join(out_dir, "frames")
    os.makedirs(frames, exist_ok=True)
    timeline, chapters = [], []
    clock = [0.0]

    tags = []

    def add(img, dur, sound=None, tag=None):
        p = os.path.join(frames, f"{len(timeline):04d}.png")
        if render:
            img.save(p)
        timeline.append((p, dur, sound, clock[0]))
        tags.append({"tag": tag, "start": clock[0], "dur": dur})
        clock[0] += dur

    def chapter(label):
        s = int(clock[0])
        chapters.append(f"{s // 60}:{s % 60:02d} {label}")

    chapter("はじめに")
    add(centered_slide("JLPT N4 よく出る文法30", ["試験まえに これだけ チェック！", "やさしい日本語　＋　English"]), 6, "start", "title")
    add(centered_slide("この動画の 見かた", [
        "① 文法と れいぶんを 読む",
        "② クイズ：5秒で 答えを 考える",
        "③ こたえを 見て、まちがえたら メモ！"]), 9, None, "howto")
    sections = [(0, 10), (10, 20), (20, 30)]
    for a, b in sections:
        chapter(f"{a + 1}〜{b}（{ITEMS[a][0]} 〜 {ITEMS[b - 1][0]}）")
        add(centered_slide(f"No.{a + 1} 〜 No.{b}", [f"{ITEMS[a][0]} 〜 {ITEMS[b - 1][0]}"], title_color=ORANGE), 3, "start", f"section:{a + 1}-{b}")
        for i in range(a, b):
            n, item = i + 1, ITEMS[i]
            add(explain_slide(n, item), 14, None, f"explain:{i}")
            add(quiz_slide(n, item), 4, None, f"quiz:{i}")
            for c in range(5, 0, -1):
                add(quiz_slide(n, item, count=c), 1, "last" if c == 1 else "tick", f"quiz:{i}")
            add(quiz_slide(n, item, reveal=True), 8, "ding", f"answer:{i}")
    chapter("まちがえやすい ペア")
    add(centered_slide("まちがえやすい ペア", ["さいごに、にている 文法を くらべよう"], title_color=ORANGE), 4, "start", "pairs_intro")
    for k, (title, lines) in enumerate(PAIRS):
        add(pair_slide(title, lines), 20 if len(lines) <= 2 else 26, None, f"pair:{k}")
    chapter("おわりに")
    add(centered_slide("おつかれさまでした！", [
        "まちがえた 文法は もう一度 見よう",
        "12月6日、がんばってください！",
        "チャンネル登録 ＆ 結果を コメントで 教えてね"]), 14, "ding", "outro")

    import json
    with open(os.path.join(out_dir, "timeline.json"), "w", encoding="utf-8") as f:
        json.dump(tags, f, ensure_ascii=False, indent=0)
    if not render:
        return tags

    total = clock[0]
    # concat list
    lst = os.path.join(out_dir, "frames.txt")
    with open(lst, "w") as f:
        for p, dur, _, _ in timeline:
            f.write(f"file '{p}'\nduration {dur}\n")
        f.write(f"file '{timeline[-1][0]}'\n")
    # audio
    audio = np.zeros(int(SR * (total + 1)), dtype=np.float32)
    for _, _, sound, start in timeline:
        if sound:
            s = SOUNDS[sound]
            i = int(start * SR)
            audio[i:i + len(s)] += s[: len(audio) - i]
    pcm = (np.clip(audio, -1, 1) * 32767).astype(np.int16)
    wav = os.path.join(out_dir, "sfx.wav")
    with wave.open(wav, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())

    mp4 = os.path.join(out_dir, "n4_grammar30.mp4")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", lst, "-i", wav,
                    "-vf", "fps=30,format=yuv420p", "-c:v", "libx264", "-preset", "medium", "-tune", "stillimage",
                    "-crf", "22", "-c:a", "aac", "-b:a", "128k", "-t", f"{total:.2f}", "-movflags", "+faststart", mp4],
                   check=True)
    thumbnail().save(os.path.join(out_dir, "thumbnail.png"))
    with open(os.path.join(out_dir, "chapters.txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(chapters) + "\n")
    print(f"total {total:.0f}s ({total / 60:.1f} min) -> {mp4}")
    print("\n".join(chapters))


if __name__ == "__main__":
    build(os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else "youtube/output"),
          render="--timeline-only" not in sys.argv)
