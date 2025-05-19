import re
from typing import List


def normalize_tag(tag: str) -> str:
    if not tag:
        return ""
    tag = tag.strip()
    tag = tag.replace('#', '').replace('_', ' ')
    tag = re.sub(r'\s+', ' ', tag).strip()
    return tag

def normalize_tags(tags: List[str]) -> List[str]:
    return [normalize_tag(tag) for tag in tags if tag and tag.strip()]

def split_tag_string(tag_str: str) -> List[str]:
    if not tag_str:
        return []
    raw_tags = [tag.strip() for tag in tag_str.split(',') if tag.strip()]
    return [normalize_tag(tag) for tag in raw_tags]