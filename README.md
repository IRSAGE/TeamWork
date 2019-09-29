# TeamWork
[![Build Status](https://travis-ci.org/IRSAGE/TeamWork.svg?branch=develop)](https://travis-ci.org/IRSAGE/TeamWork)
[![Coverage Status](https://coveralls.io/repos/github/IRSAGE/TeamWork/badge.svg?branch=develop)](https://coveralls.io/github/IRSAGE/TeamWork?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/f14d8ac27551ab0774b9/maintainability)](https://codeclimate.com/github/IRSAGE/TeamWork/maintainability)

Teamwork is an ​internal social network for organizations’ employees. The goal of this application is to facilitate more interaction between colleagues and facilitate team bonding.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

The project is composed of two different parts:
- *UI (User Interface)*
- *API Endpoints*  

### Prerequisites

* UI 
   * Any Web Browser (I recommend using Google Chrome)
   * Text Editor (I recommend using VSCode)

* API Endpoints
   * Node JS
   * Postman (For testing api locally)
   * Postgres
  
### Cloning the project

* Simply [Clone](https://github.com/IRSAGE/TeamWork.git) The project
* OR use git bash:
   1. First [download](https://git-scm.com/downloads) git bash
   2. Install it
   3. Clone it by running `git clone https://github.com/IRSAGE/TeamWork.git`
   4. Find the project directory from where you are tunning the git bash.

### Installing

1.For running the api

   1. First download and install [Node JS](https://nodejs.org/en/download/)
   2. Download and install [Postman](https://www.getpostman.com/downloads/)
   3. Clone the project. [TeamWork](https://github.com/IRSAGE/TeamWork.git)
   4. Run `npm install` (`sudo apt install` for linux users) command for installing all project dependencies

## Running the tests

  1. Open command prompt
  2. navigate to the directory of cloned project
  3. Run the automated test by running `npm run test` command
   
## Running the UI Template

  - Just run `index.html` from the cloned project
  - OR simply use ghpage to run [TeamWork UI Template](https://irsage.github.io/TeamWork/UI)
 

## Built With
* Server
   * Server side Framework: [Node JS](https://nodejs.org/)/[Express](https://expressjs.com/)
   * Linting Library: [ESLint](https://eslint.org)
   * Testing Framework: [Mocha](https://mochajs.org/)
   * Documentation Tools: [Swagger](https://swagger.io/tools/swagger-ui/)
   * Hosting: [Heroku](https://www.heroku.com/)
)

* UI Templates
   * CSS 
   * HTML
   * JS

## API ENDPOINTS

| Ressource URL | Methods  | Description  |
| ------- | --- | --- |
| /api/v1/auth/signup| POST | Users can signup by providing firstName, lastName , email, password,gender,jobRole,department, and address  |
| /api/v1/auth/signin| POST | Users can sighin by sending request with a body containing  email and password|
| /api/v1/articles | POST | users can create an article by providing token ,title and article in the body |
| /api/v1/articles/:articleid/ | PATCH | user can edit their article by providing the token id of the article they want to edit and a body containg title and article |
| /api/v1/articles/:articleId | DELETE| users can delete their articles by providing the token and an articleid for the article to delete |
| /api/v1//articles/articleId/comments | POST | Employees can comment on other colleagues' article posted by providing an articleid and a body containing a comment  |
| /api/v1//feeds| GET |Employees can view all articles, showing the most recently posted articles first by providing a token |
| /api/v1//articles/articleId/| GET |Employees can view a specific article by providing token and articleid for the article |

### Heroku link 

[TeamWork heroku link](https://andelateamworkegide.herokuapp.com)

### Swagger link 

[TeamWork Docs](http://andelateamworkegide.herokuapp.com/api-docs/)

### Gh-pages link
[TeamWork UI Template](https://irsage.github.io/TeamWork/UI)
 

## Author

[SIBOMANA IRAGENA EGIDE](https://www.linkedin.com/in/iragena-egide-50b3b818b?jobid=1234&lipi=urn%3Ali%3Apage%3Ad_jobs_easyapply_pdfgenresume%3Bg95NCdpGSaWHw%2FI2pOpx3g%3D%3D&licu=urn%3Ali%3Acontrol%3Ad_jobs_easyapply_pdfgenresume-v02_profile)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENCE.md) file for details

## Acknowledgments

* [Andela Kigali](https://andela.com/)
