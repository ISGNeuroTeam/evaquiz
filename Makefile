define ANNOUNCE_BODY
Required section:
 build - build project into build directory, with configuration file and environment
 clean - clean all addition file, build directory and output archive file
 test - run all tests
 pack - make output archivne
Addition section:
 serve - start internal web server for development
endef

PROJECT_NAME=evaquiz

GENERATE_VERSION = $(shell jq .version ./${PROJECT_NAME}/package.json )
GENERATE_BRANCH = $(shell git name-rev $$(git rev-parse HEAD) | cut -d\  -f2 | sed -re 's/^(remotes\/)?origin\///' | tr '/' '_')

SET_VERSION = $(eval VERSION=$(GENERATE_VERSION))
SET_BRANCH = $(eval BRANCH=$(GENERATE_BRANCH))

#.SILENT:

COMPONENTS :

export ANNOUNCE_BODY
all:
	echo "$$ANNOUNCE_BODY"

pack: build
	$(SET_BRANCH)
	$(SET_VERSION)
	echo Create archive \"$(PROJECT_NAME)-$(VERSION)-$(BRANCH).tar.gz\"
	cd build; tar czf ../$(PROJECT_NAME)-$(VERSION)-$(BRANCH).tar.gz .

build: ${PROJECT_NAME}/node_modules $(COMPONENTS)
	# required section
	echo Build!
	echo Start command: npm run build
	npm run build --prefix ./$(PROJECT_NAME)
	mkdir build
	mkdir build/$(PROJECT_NAME)
	cp -r ./$(PROJECT_NAME)/dist/* ./build/$(PROJECT_NAME)
	cp README.md build/
	cp CHANGELOG.md build/
	cp LICENSE.md build/

clean:
	# required section"
	rm -rf build ./$(PROJECT_NAME)/dist ./$(PROJECT_NAME)/node_modules/ ./$(PROJECT_NAME)/package-lock.json $(PROJECT_NAME)-*.tar.gz

test: $(PROJECT_NAME)/node_modules
	# required section
	echo "Testing..."
	echo $(PROJECT_NAME)
#	npm run --prefix ./$(PROJECT_NAME) test:unit

serve: $(PROJECT_NAME)/node_modules
	echo "Start internal web server"
	npm run reserve --prefix ./$(PROJECT_NAME)
	
$(PROJECT_NAME)/node_modules:
	echo Start command: npm i
	npm i --prefix ./$(PROJECT_NAME)

