
.PHONY: assets/data
assets/data: assets/data/map.geojson

.PHONY: assets/data/map.geojson
assets/data/map.geojson:
	# TODO: generate an updated map.geojson from inventory data



.bundle:
	bundle install --path .bundle
	# TODO: openlayers source: https://github.com/openlayers/openlayers/releases/download/v6.14.1/6.14.1-dist.zip

.PHONY: clean
clean: .bundle
	bundle exec jekyll clean

.PHONY: build
build: .bundle assets/data
	# TODO: find -name  "*.md" -exec yq --front-matter="process" '.updated_at = now' {} \;
	bundle exec jekyll build

.PHONY: serve
serve: .bundle assets/data
	# site is on http://localhost:4000, should reload when you edit files
	bundle exec jekyll serve --livereload
