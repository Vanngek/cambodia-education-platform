"""ベトナム語・ミャンマー語の字幕を画面に焼き込んだ版を作る。

Usage: python3 -I youtube/tools/make_n4_burned.py youtube/output
入力: n4_grammar30.mp4, timeline.json（make_n4_grammar30.py で作成）
出力: n4_grammar30_vi_my.mp4, n4_grammar30_vi_my.ass
画面: スライドを約77%に縮小して上に配置し、下の帯に 上=ベトナム語(白) / 下=ミャンマー語(黄) を表示。
"""
import json, os, subprocess, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from make_n4_subtitles import text_for  # noqa: E402

SLIDE_W, SLIDE_H = 1472, 828
BAND_TOP = SLIDE_H


def t(sec):
    cs = int(round(sec * 100))
    h, cs = divmod(cs, 360000)
    m, cs = divmod(cs, 6000)
    s, cs = divmod(cs, 100)
    return f"{h}:{m:02d}:{s:02d}.{cs:02d}"


def esc(s):
    return s.replace("{", "(").replace("}", ")").replace("\n", "\\N")


def my_runs(s, big=54, small=38):
    """Noto Sans Myanmar draws Burmese glyphs small: enlarge Burmese runs only."""
    out, cur = [], None
    for ch in s:
        burmese = "\u1000" <= ch <= "\u109f" or ch in "\u200b"
        if ch == "\n":
            out.append("\\N"); continue
        if burmese != cur:
            out.append("{\\fs%d}" % (big if burmese else small)); cur = burmese
        out.append(ch)
    return "".join(out)


def main(out_dir):
    tl = json.load(open(os.path.join(out_dir, "timeline.json"), encoding="utf-8"))
    merged = []
    for seg in tl:
        if merged and merged[-1]["tag"] == seg["tag"]:
            merged[-1]["dur"] += seg["dur"]
        else:
            merged.append(dict(seg))
    head = f"""[Script Info]
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: VI,Noto Sans,34,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,0,0,8,60,60,{BAND_TOP + 10},1
Style: MY,Noto Sans Myanmar,46,&H004DD8FF,&H004DD8FF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,0,0,8,60,60,{BAND_TOP + 92},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    lines = []
    for seg in merged:
        a, b = t(seg["start"] + 0.1), t(seg["start"] + seg["dur"] - 0.1)
        lines.append(f"Dialogue: 0,{a},{b},VI,,0,0,0,,{esc(text_for(seg['tag'], 'vi'))}")
        lines.append(f"Dialogue: 0,{a},{b},MY,,0,0,0,,{my_runs(esc(text_for(seg['tag'], 'my')).replace(chr(92) + 'N', chr(10)))}")
    ass = os.path.join(out_dir, "n4_grammar30_vi_my.ass")
    with open(ass, "w", encoding="utf-8") as f:
        f.write(head + "\n".join(lines) + "\n")
    x = (1920 - SLIDE_W) // 2
    hdr = round(110 * SLIDE_H / 1080)
    vf = (f"scale={SLIDE_W}:{SLIDE_H},pad=1920:1080:{x}:0:color=0xFFF8EE,"
          f"drawbox=x=0:y=0:w={x}:h={hdr}:color=0x1F3A5F:t=fill,"
          f"drawbox=x={x + SLIDE_W}:y=0:w={x}:h={hdr}:color=0x1F3A5F:t=fill,"
          f"drawbox=x=0:y={BAND_TOP}:w=iw:h={1080 - BAND_TOP}:color=0x1F3A5F:t=fill,"
          f"ass={ass}")
    extra = sys.argv[2:]  # e.g. -ss 20 -t 1 for a test frame
    out = os.path.join(out_dir, "n4_grammar30_vi_my.mp4" if not extra else "test.png")
    src = os.path.join(out_dir, "n4_grammar30.mp4")
    if extra:  # fast seek, keep original timestamps so subtitles match
        cmd = ["ffmpeg", "-y", "-loglevel", "error", "-ss", extra[0], "-copyts", "-i", src, "-vf", vf,
               "-frames:v", "1", out]
    else:
        cmd = ["ffmpeg", "-y", "-loglevel", "error", "-i", src, "-vf", vf]
        cmd += ["-c:v", "libx264", "-preset", "medium", "-tune", "stillimage", "-crf", "22",
                "-c:a", "copy", "-movflags", "+faststart", out]
    subprocess.run(cmd, check=True)
    print(out)


if __name__ == "__main__":
    main(os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else "youtube/output"))
