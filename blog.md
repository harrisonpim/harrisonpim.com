---
layout: default
title: Blog - Harrison Pim
---

I try to share what I'm working on. Sometimes I do that on this blog, and sometimes I give [talks](/talks) at conferences, universities, etc.

---

<ul class="list pl0">
    {% for post in site.posts %}
    <li class="pb3 bb b--black-20 mb3">
        <a href="{{ post.url }}" class="db f3">{{ post.title }}</a>
        <time class="db f4 ttu tracked gray">{{ post.date | date_to_string }}</time>
        <div class="db lh-copy">{{ post.excerpt }}</div>
    </li>
    {% endfor %}
</ul>
