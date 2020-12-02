---
layout: default
title: Blog - Harrison Pim
---

<div>
    <a class="link dim gray" href="/">← back home</a>
</div>
<div>
<ul class="list pl0">
    {% for post in site.posts %}
    <li class="pb3">
        <a class="f2 lh-title link dim black b pa0" href="{{ post.url }}">{{ post.title }}</a>
        <div class="gray">{{ post.date | date:"%Y-%m-%d" }}</div>
        <div>{{ post.excerpt }}</div>
    </li>
    {% endfor %}
</ul>
</div>
