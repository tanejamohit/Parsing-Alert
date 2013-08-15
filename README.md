Parsing-Alert
=============

The project was made to help me parse the CBDR website periodically using zombiejs headless parser in conjunction with nodejs.

The file driver.js parses the cbdr website page for new studies added and check them with an already existing database of studies stored in a mongodb database. If the study is not their in the database, the study is added to the databasse and using unix mail command I am sent an email about the new study.

Isn't that awesome for less than 100 lines of code
