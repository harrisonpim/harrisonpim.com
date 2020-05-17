---
layout: default
title: Talks - Harrison Pim
---

<div>
    <a class="link dim gray" href="/">← back home</a>
</div>
<div>
<ul class="list pl0">
    {% for talk in site.data.talks %}
    <li class="pb3">
        <a class="f2 lh-title link dim black b" href="{{ talk.url }}">{{ talk.title }}</a>
        <div>
            {{ talk.date | date:"%Y-%m-%d" }}
        </div>
        <div>
            {{ talk.host }}
        </div>
        <div>
            {{talk.location }}
        </div>
    </li>
    {% endfor %}
</ul>
</div>
