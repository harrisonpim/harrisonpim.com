---
layout: default
title: Talks
---

<ul class="list pl0">
    {% for talk in site.data.talks %}
    <li class="pb3">
        <a href="{{ talk.url }}">{{ talk.title }}</a>
        <div>
            {{ talk.host }}
        </div>
        <div>
            {{talk.location }}
        </div>
        <div>
            {{ talk.date | date:"%b %Y" }}
        </div>
    </li>
    {% endfor %}
</ul>
