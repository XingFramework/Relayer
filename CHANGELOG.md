0.2.1 01-07-2016
================
* Can generate temporary links on the frontend
* Can absorb self template links in backend response on singular resources

0.2.0 12-07-2015
================
* Complete refactor of dependency injection system to remove most A1Atscript dependency & Angular

0.1.4 11-10-2015
================
* Fix create template links

0.1.3 10-23-2015
================
* Fix initialize on create

0.1.2 10-17-2015
================
* Fixed tests
* Fixed build
* Forgot to make distribution

0.1.1 10-17-2015
================
* Allow templated singular resources
* Refactory Promise To Seperate Repo
* Inflect Link Template Names
* Fix create on embedded list resources
* Move repo to XingFramework organization

0.1.0 09-28-2015
================
* Fix error responses
* Fix delete action
* denormalize url since it's referenced so often
* Add a few checks to prevent JS errors on new resources

0.0.9 09-07-2015
================
* Allow customized list resources
* Add fault tolerance to some resource class methods

0.0.8 08-29-2015
================
* Allow Angular 1.4x

0.0.7 08-04-2015
================
* Fixed error with calling update on embedded list

0.0.6 08-03-2015
================
* Convert all chained loads to being asynchronous -- until you call load, nothing happens
* Add utility functions for accessing aspects of relationships

0.0.5 07-24-2015
================
* Convert to using $q for promises for now

0.0.4 07-16-2015
================
* Fixed update for list resources
* Fix initialization so that;
  - a resource with no initial values does not error
  - a resource does not build embeds for all its relationships automatically

0.0.3 07-10-2015
================
* Fix issue with endless refetch for missing relationship

0.0.2
================
Mistakenly published to NPM before finished

0.0.1 07-07-2015
================
* The Initial Commit / Relayer
