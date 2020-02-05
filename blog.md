---
layout: default
title: Blog - Harrison Pim
---

I try to share what I'm working on. Sometimes I do that on this blog, and sometimes I give [talks](/talks) at conferences.

<ul class="list pl0">
    {% for post in site.posts %}
    <li class="pv3 bb b--black-10">
        <a href="{{ post.url }}" class="db f4">{{ post.title }}</a>
        <time class="f6 ttu tracked gray">{{ post.date | date_to_string }}</time>
        <span class="db lh-copy pv2">{{ post.excerpt }}</span>
    </li>
    {% endfor %}
</ul>
