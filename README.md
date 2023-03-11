# [Athlete Birthplaces Explorer](https://athlete-birthplaces.netlify.app/)

A simple app displaying the birthplaces of athletes for the NHL, NBA, NFL and MLB leagues. 

Purpose: utilize ArcGIS Maps SDK for JS, alongside Calcite Components and React to make an easy to use explorer app.

goals:
- explore the four most popular north american sports leagues geographically
- explore the geographical distribution of franchises by league
- detailed team views
  - display logos on the map representing teams
  - display lines on the map connecting the birthplaces of players to the selected team
  - explore a list of players for the selected team and their common attributes/headshots
- detailed country/state/city views
  - display dots on the map representing players
  - ***TODO***: display lines from the city to franchise locations?
  - explore distribution of players by multiple geographic granularities
  - explore a list of players by birth geography
  - ***TODO***: highlight the distribution of a players team at a location
    - i.e. 6 players born in minneapolis, 3 of them are on the bruins, so minneapolis is 50% bruins

Technologies used:
- [yup](https://github.com/jquense/yup)
  - used to validate requests from ArcGIS rest APIs and provide typings to ensure that feature attributes are easily accessible from fetched data
  - ***future exploration needed:*** create a generator that allows users to input a feature service and get an output of a yup feature schema, example:
    - input: `id (type: esriFieldTypeInteger, alias: id, SQL Type: sqlTypeInteger, nullable: true, editable: true)`
    - output: `yup.object({id: string().required().nullable()})`
- [deno](https://deno.land)
  - extremely convenient for running local scripts, much easier to set up than trying to get node to work with typescript
- [react-query](https://tanstack.com/query/v3/) 
  - (now known as tanstack-query? ***maybe i should name this app after myself***) 
  - integrated with arcgis js sdk for query management
- [@arcgis/core](https://developers.arcgis.com/javascript/latest/)
  - used for map functionality
  - i experimented some with reusable patterns for using arcgis in react but i wouldn't say i'm satisfied with the results
  - i'm drawn to trying to abstract some of the mapping logic into separate components but this becomes inconvenient when passing references around
  - i'm also interested in build size when i build for production, it feels like the arcgis library inflates it quite a bit
  - i used local FeatureLayer instead of GraphicLayer for my generated graphics to allow use of things like FeatureEffect
    - this was a pain to figure out how to get it working but once it worked, it was convenient to access as a feature layer instead of a graphics layer
- [calcite-components-react](https://github.com/Esri/calcite-components)
  - base components for building the ui
  - love the way the ui looks, but the developer experience (especially with the react wrapper components) leaves much to be desired
- [vite](https://vitejs.dev)
  - can never go back to webpack after vite
- [react](https://reactjs.org)
  - i love hooks, what can i say
- [arcgis online](https://www.arcgis.com/index.html)
  - used for hosting data and geocoding services
  

***Data last updated February 1st, 2023.***
