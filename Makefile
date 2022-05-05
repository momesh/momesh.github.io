.bundle:
	bundle install --path .bundle

.PHONY: clean
clean: .bundle
	bundle exec jekyll clean

.PHONY: build
build: .bundle
	# TODO: find -name  "*.md" -exec yq --front-matter="process" '.updated_at = now' {} \;
	bundle exec jekyll build

.PHONY: serve
serve:
	# site is on http://localhost:4000, should reload when you edit files
	bundle exec jekyll serve --livereload
