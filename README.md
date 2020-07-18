# Ponder:
  A platform for users to annotate popular media and connect through shared thoughts and interests.
  <p align="center">
    <img src="https://media.giphy.com/media/UU1fbAXFo11pkwfAeC/giphy.gif">  
  </p>


  [Visit Here](https://ponder-ap.herokuapp.com/#/)

# Image Walk-through

**Generate Combo**

User begins by searching by a keyword to generate a combo of movie and music clips gathered from Youtube API:  

<img src="https://media.giphy.com/media/LSRM3UfFrzf4AisqaU/giphy.gif">

**Next Combo**

User can view other combos that are associated with the search keyword by clicking next button:  

<img src="https://media.giphy.com/media/WmjN79LIpqQtoAZggy/giphy.gif">

**View Media**

User can view movie and music clips:  

<img src="https://media.giphy.com/media/LoIxsXRWSDceFAlg2C/giphy.gif">

**Annotate Combo**

Next, a user can annotate on selected combo.

<img src="https://media.giphy.com/media/d88dFwmdnCppVNMpfm/giphy.gif">

**Feed**

After, user can click on the `Feed` to view annotations for a combo. 

<img src="https://media.giphy.com/media/YnTftqFBQFFDBxVeId/giphy.gif">

Visit the site and try it out for yourself to see of these features in action: [Visit Here](https://ponder-ap.herokuapp.com/#/)

## Take Aways: 

- Built a search feature to find songs by word or phrase using the Youtube API.
- Implemented a custom combination algorithm to create combinations for users to annotate.

## Resources
React, Redux, Express, Sequelize, Postgres, Heroku, Youtube API. 

# Local Setup: 
  From the terminal run:

  ``` 
  git clone https://github.com/sjoseph11236/ponder
  cd ponder
  createdb ponder
  npm install
  npm run start:dev
  ```

  Runs the app in the development mode.
  Open http://localhost:3000 to view it in the browser.

# Sources:  
[YouTube API](https://developers.google.com/youtube/v3)