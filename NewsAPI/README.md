## News API Implementation Overview

_Summary of tools utilised in project_

_Rest API with express.js, Mongo db, Authentication, Authorization with Bcrypt, jwttoken and Caching._

API Endpoints: all endpoints has News as default start of route

1. POST/register
2. POST/login
3. GET/preferences
4. PUT/preferences
5. GET/News

Extension Endpoints:

Note: Since i was unable to find any unique ids in newsapi i could not implement retrieve favorite and read news, so i implemented favorite sources instead

1. POST/:id/favSources -- not sure we require id to be sent here since we have the token
2. GET/favSources
3. GET/search/:Keywords

Caching has been implemented for GetNews and Getpreferences

Regarding update cache periodically, i have the update cache funstion in cache helper but not sure how we can able to call it separately with those tokens and parameters.

Cloud mongo db is been used with credentials available in env files. have updated env files on purpose so if anyone wants to test

Have attached sample notepad input file if anyone wants to do the testing in postman
