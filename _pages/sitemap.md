---
layout: page
title: Binary Sun Sitemap
permalink: /sitemap/
---

<ul>
	<li>
		<a href="{% link index.md %}">Binary Sun Homepage</a>
	</li>
	<li>
		<a href="{% link _pages/free-games.md %}">Free Games (made by me!)</a>
		<ul>
		{% for game in site.free-games %}
			<li><a href="{{ game.url | relative_url }}">{{ game.title }}</a></li>
		{% endfor %}
		</ul>
	</li>
	<li>
		<a href="{% link _pages/games.md %}">Online Games</a>
		<ul>
		{% for game in site.games %}
			<li><a href="{{ game.url | relative_url }}">{{ game.title }}</a></li>
		{% endfor %}
		</ul>
	</li>
	<li>
		<a href="{% link _pages/favorites.md %}">Your Favourite Games</a>
	</li>
	<li>
		<a href="{% link _pages/about.md %}">About Binary Sun</a>
	</li>
</ul>
