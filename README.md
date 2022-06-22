# Momentum

Momentum is a prescriptive management solution for Engineering Managers and Team Leads. It outlines an engaging one-on-one and status gathering script making records of adminstrative followups, issues, status and goals, stretch questions and deeper exercises like Priority Quadrants. All inputs are recorded along with third party tool integration data (jira, trello) to allow for realtime, dynamic in-app and emailed reports over any time period that greatly ease self assessment excercises during review periods.

### Usage

First, clone and follow the setup instructions in [momentum-server](https://github.com/tscavone/momentum-server) to set up the backend. Then follow these steps:

- create a .env file in base directory
- add the following environment variables
```
USERNAME1 = <quoted name here>
PASSWORD1 = <quoted password here>
USERID1 = 'abcdef'
USERNAME2 = <quoted name  #2 here>
PASSWORD2 = <quoted password #2 here>
USERID2 = 'uvwxyz'
REACT_APP_HOSTSTRING = <server host string, i.e. http://localhost:3001>
```
- npm run start- to start ui
- login with either username1 or username2 and corresponding password


npm test - to run data load tests in ./test/\*.test.tsx

### Trello board
[Here](https://trello.com/invite/b/RdU9LAyR/cd8e4e945406574ebd229073e273ca1f/todo)
