# WeatherDashboard
A weather dashboard- useful for planning your day!

URL: https://elijahromer.github.io/WeatherDashboard/

In this project, I created the classic weather dashboard project to exercise my skills working with promises and API calls as well as learning the materialize CSS framework, as well as gain more experience with creating a responsive UI. I was able to make the search results persist across browser sessions via localStorage and really solidifed my experience and knowledge working with that system. It was quite fun to look at the return results from the API and from there let the creativity flow on the kinds of things you could do with the data. 

For example, I noticed that the wind direction was being returned in degrees, which in a meteorological context references the direction that the wind is *coming* from. From there I was able to plot this to a unit circle and write up some conditional criteria to return a more intuitive cardinal direction abbreviation for where the direction the wind was *going*. I also recognized that the degree output could be used as an input for a transform: rotate() command and as such made an icon of an arrow, worked with the CSS Positioning to get the arrow to sit centered on top of a picture of a compass with 16 points, and change the transform: rotate() property of the arrow based on the returned degrees to give a visual indication of the wind direction. 

I added some conditional logic for preventing a previously searched city to the array of previous searches if it was already present in that array. New entries are added via the unshift() method, and if the number of cities in the array is 10, the computer will pop() the oldest entry before adding the new one. This creates a situation where up to 10 unique city searches can be stored across sessions not including the home city, and they will be organized in order of search with a first in, first out sort of stack. 

I also was able to alert the user of an invalid entry by detecting the values of the fetch response, and then triggering a materialize modal instead of an inbuilt/ outdated alert() method. As the JavaScript for handling the modals was hidden behind a CDN, and the handling of modals was thus accomplished exclusively via HTML and UI Click events, I had to set up my logic that when an invalid request was returned, it would trigger the click() method on a hidden button on the page, thus indirectly triggering the modal via JavaScript.

The home city was added to allow for a default page when referencing the weather quickly for your local area, and as a way to generate real time and accurate results on the page on load, rather than empty fields or placeholder values. This is stored in a separate local storage section and can be mutated easily by navigating to the desired home city, and clicking the "set as home" button below the current forecast. This updates which city will be displayed on page load. 

Overall a very enjoyable project that expanded my knowledge and skills!

![image](https://user-images.githubusercontent.com/80494962/126260899-43277d21-a0da-460e-9edd-f7fd62b908aa.png)

