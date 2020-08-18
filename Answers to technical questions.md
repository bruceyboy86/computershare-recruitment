# Recruitment Q&A
* How long did you spend on the coding challenge?
  - Between 10 and 13 hours
* What would you add to your solution if you had more time? If you didn&#39;t spend much time on the coding test then use this as an opportunity to explain what you would add.
  - I would add more functionality into the interactive elements. I wanted to use an autofill on the company input field so the user could type one or two letters and get multiple choices. The header could use a logo and nav but I would've had to concentrate on mobile optimising them so I left that out. I added some loading feedback but wanted to use this feature on the whole app. The code is split up into small components but the majority of it is clustered up into the SearchResults.js file. The components seperate from the main bulk is there to demonstrate that I understand how to split up the code in this way. The same goes for SASS.
* What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you&#39;ve used it.
  - React hooks is not so recent but it's new enough to be relevent. I've used it in SearchResults.js lines 16 - 21. It's useful for updating the DOM with relevant data.
* How would you track down a performance issue in production? Have you ever had to do this?
  - I usually defualt to the developer tools on firefox. I check for error logs, networking and speed. If I see a js file flagged I open the file in dev tools and add breakpoints to the lines of the function at fault. when the code pauses I check for undefined or null objects/functions etc.
* Please describe yourself using JSON.
  - I've used JSON a lot over the last few years. The first time I use the api, I use a client like postman. This helps with the initial header an security authentication. It has the added bous of compiling a js fetch. Once I use the API in my app I'll usually use console.log() to output the data and select the queries where I want to expose data on the dom. If the api isn't grouped properly I'll combine some values and push into a fresh array, but within reason.
