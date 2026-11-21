"""Fetch public stats for the Nippon No Omoi channel and save a JSON snapshot.

Usage: python3 -I youtube/tools/fetch_channel.py [output_dir]
"""
import json, re, sys, datetime, urllib.request

CHANNEL = "https://www.youtube.com/@vanngekli374"
HEADERS = {"User-Agent": "Mozilla/5.0", "Accept-Language": "ja,en;q=0.8"}


def get(path):
    req = urllib.request.Request(f"{CHANNEL}/{path}", headers=HEADERS)
    return urllib.request.urlopen(req, timeout=30).read().decode("utf-8")


def initial_data(html):
    return json.loads(re.search(r"var ytInitialData = (\{.*?\});</script>", html).group(1))


def find(o, key, out):
    if isinstance(o, dict):
        if key in o:
            out.append(o[key])
        for v in o.values():
            find(v, key, out)
    elif isinstance(o, list):
        for v in o:
            find(v, key, out)
    return out


def to_int(s):
    d = re.sub(r"[^\d]", "", s or "")
    return int(d) if d else None


def main():
    out_dir = sys.argv[1] if len(sys.argv) > 1 else "youtube/data"
    about = get("about")
    stats = {}
    for k in ["subscriberCountText", "videoCountText", "viewCountText"]:
        m = re.search(r'"%s":"([^"]*)"' % k, about)
        stats[k] = m.group(1) if m else None

    videos = []
    for l in find(initial_data(get("videos")), "lockupViewModel", []):
        meta = l["metadata"]["lockupMetadataViewModel"]
        title = meta["title"]["content"]
        j = json.dumps(meta, ensure_ascii=False)
        parts = [p for p in re.findall(r'"content": "([^"]+)"', j) if p != title]
        dur = re.search(r'"thumbnailBadgeViewModel": \{"text": "([^"]+)"', json.dumps(l, ensure_ascii=False))
        videos.append({"id": l.get("contentId"), "title": title,
                       "views": to_int(parts[0]) if parts else None,
                       "published": parts[1] if len(parts) > 1 else None,
                       "duration": dur.group(1) if dur else None})

    shorts = []
    for s in find(initial_data(get("shorts")), "shortsLockupViewModel", []):
        om = s.get("overlayMetadata", {})
        vid = re.search(r'"videoId": "([^"]+)"', json.dumps(s))
        shorts.append({"id": vid.group(1) if vid else None,
                       "title": om.get("primaryText", {}).get("content"),
                       "views": to_int(om.get("secondaryText", {}).get("content"))})

    today = datetime.date.today().isoformat()
    snap = {"date": today,
            "subscribers": to_int(stats["subscriberCountText"]),
            "video_count": to_int(stats["videoCountText"]),
            "total_views": to_int(stats["viewCountText"]),
            "videos": videos, "shorts": shorts}
    path = f"{out_dir}/{today}.json"
    with open(path, "w", encoding="utf-8") as f:
        json.dump(snap, f, ensure_ascii=False, indent=1)
    print(path, snap["subscribers"], snap["video_count"], snap["total_views"], len(videos), len(shorts))


if __name__ == "__main__":
    main()
