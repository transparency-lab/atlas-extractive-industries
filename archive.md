---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: default
---

<h1>Regulation List</h1>

Click on a regulation to learn more.

{% for post in site.posts %}
<div class="border-style">
<a href="{{ post.url }}">{{ post.title }} ({{ post.year }})</a>
</div>
{% endfor %}
