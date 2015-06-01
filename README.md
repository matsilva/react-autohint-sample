# react-autohint-sample

##The Challenge
Create an auto hint for a search input using the following API endpoint information: `http://localhost:3000/cities?q=vienna`

**Endpoint response** for `q=vienna` will look like...

```
[
  {
    "name": "Vienna"
  },
  {
    "name": "Vienna"
  },
  {
    "name": "New Vienna"
  },
  {
    "name": "Vienna"
  },
  {
    "name": "South Vienna"
  },
  {
    "name": "Vienna"
  },
  {
    "name": "New Vienna"
  },
  {
    "name": "Vienna"
  },
  {
    "name": "Vienna"
  }
]
```

### Setup endpoint locally
* Install by running `sudo npm install json-sever -g` in your terminal
* Start the endpoint server by running `json-server --watch db.json` in current dir.
* Note: it can serve a ton of cities, so taking only a few will be wise

###Bonus points
* Allow the user to select from a drop down list using the up and down arrows
* If a user types really fast, prevent ajax requests from firing until the user has finished typing fast.
* Optimize endpoint requests, in particular we only want the latest request to succeed.

###Css cheatcodes
Add nice styles to the demo in a rapid fashion.
* http://materializecss.com/getting-started.html
* http://getbootstrap.com/getting-started/

###Step-6
* Demonstrate performance enhancements
* Add debounce to keystrokes
* Cancel previous xhr requests
