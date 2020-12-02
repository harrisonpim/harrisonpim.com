---
layout: default
title: post.title
---

<div>
    <a class="link dim gray" href="/blog">← back to the blog</a>
</div>
<div>
    <header>
        <h1 class="b lh-title">{{  page.title  }}</h1>
        <time class="gray">{{ page.date | date:"%Y-%m-%d" }}</time>
    </header>
    <div>
        {{ content }}
    </div>
</div>
