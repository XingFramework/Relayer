import RL from "../../src/relayer.js"
import {Module, Injector, Config} from "a1atscript";
import {TemplatedUrl} from "../../src/relayer/TemplatedUrl.js";
import XingPromiseFactory from "xing-promise";

class Book extends RL.Resource {
}

RL.Describe(Book, (desc) => {
  desc.property("title", "");
});

class Resources extends RL.Resource {
}

RL.Describe(Resources, (desc) => {
  var books = desc.hasList("books", Book, [])
  books.linkTemplate = "book";
  books.canCreate = true;
});

// this is horrible -- no easy way to get Babel and Traceur to compile the same config block
class AppConfig {
  @Config("relayerProvider")
  setupResources(relayerProvider) {
    relayerProvider.createApi("resources", Resources, "http://www.example.com/resources")
  }
}

var AppModule = new Module("AppModule", [RL, AppConfig.prototype]);

describe("Embedded List Create test", function() {
  var resources, book, $httpBackend, $rootScope, mockHttp;

  beforeEach(function () {
    var injector = new Injector();
    injector.instantiate(AppModule);
    angular.mock.module('AppModule');
    mockHttp = jasmine.createSpy('mockHttp').and.callFake(
      function(Promise, params) {
        if (params.url == "http://www.example.com/resources") {
          return Promise.resolve({
            status: 200,
            headers() {
              return {
                ETag: "1348"
              }
            },
            data: {
              data: {
                books: {
                  links: {
                    self: "/books",
                    template: "/books/{id}"
                  },
                  data: []
                }
              },
              links: {
                book: "/books/{id}"
              }
            }
          });
        } else if (params.method == "POST" && params.url == "http://www.example.com/books") {
          return Promise.resolve({
            config: {
              url: "http://www.example.com/books"
            },
            status: 201,
            headers() {
              return {
                location: "http://www.example.com/books/1"
              }
            }
          })
        } else if (params.method == "GET" && params.url == "http://www.example.com/books/1") {
          return Promise.resolve({
            status: 200,
            headers() {
              return {
                ETag: "1567"
              }
            },
            data: {
              links: {
                self: "/books/1",
              },
              data: {
                title: "Hamlet",
              }
            }
          });
        }
      });
    angular.mock.module(function($provide) {
      $provide.factory("$http", function($q) {
        var XingPromise = XingPromiseFactory.factory($q);
        return function(params) {
          return mockHttp(XingPromise, params);
        };
      });
    });
    inject(function($injector, _resources_, _$rootScope_) {
      resources = _resources_;
      $rootScope = _$rootScope_;
    });
  });

  describe("book", function() {
    var books;

    beforeEach(function(done) {
      resources.books().load().then((booksLoaded) => {
        books = booksLoaded;
        done();
      });
      $rootScope.$apply();
    });

    it("new with url", function() {
      expect(books.new(true).url).toMatch(/\/books\/.+/);
    })

    describe("creating", function() {
      beforeEach(function(done) {
        book = books.new();
        books.create(book).then((_book_) => {
          book = _book_;
          done();
        });
        $rootScope.$evalAsync();
      });

      it("should resolve the book", function() {
        expect(book.title).toEqual("Hamlet");
      });

      it("should resolve short link", function() {
        expect(book.shortLink).toEqual("1");
      });
    });
  });
});
