---
layout: page
title: Free Games
permalink: /free-games/
---
**Binary Sun** was started in 2004 to sell shareware videogames. The games and apps on this page used to be available for sale. We have now stopped selling them in favor of creating a free games arcade - but we're keeping the pages around for reference.

<ul>
    {% for post in site.free-games %}
    <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
    {% endfor %}
</ul>
