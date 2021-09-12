
# jekyll-d3

Basic Jekyll with simple d3.js script.

Setting up Jekyll with D3.js

``jekyll new jekyll-d3
cd jekyll-d3/
bundle install --path vendor/bundle
edit: _config.yml to exclude vendor directory:

exclude:
#     - Gemfile
#     - Gemfile.lock
#     - vendor/bundle

bundle exec jekyll serve

copy about.md into new file chart.md, copy d3.js code there

bundle exec jekyll serve``

Extra: if you want to move styles or scripts to <head>

``add new variable to chart.md, eg.  `d3: "d3"
mkdir _includes
cp /Users/timoalakoski/Documents/projects/jekyll-d3/vendor/bundle/ruby/2.0.0/gems/minima-2.1.1/_includes/head.html _includes/
# edit head.html to include scripts if needed:
{% raw %}
    {% if page.d3 %}
      <script src="https://d3js.org/d3.v4.min.js"></script>
    {% endif %}
{% endraw %} ``
