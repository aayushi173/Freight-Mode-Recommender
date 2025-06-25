DESCRIPTION:
The application is an HTML frontend running on a local webserver.  The application code is comprised of HTML, Javascript, D3, and Bootstrapv3 CSS.  The middleware is comprised of a Fastapi developed API for interface with the SciKit Learn model in Python.  There is also a SQLwasm middleware for integration with SQLite3 database.  The backend is comprised of the Python model and the SQLite database.

INSTALLATION:

1. Create a virtual environment using your technique of choice

2. Open CODE folder

2a. Download larger files off GATECH one drive cloud, place is matching folders in CODE folder. (ie: api cloud files copy to api local folder, dbfiles cloud files copy to dbfiles local folder)
https://gtvault-my.sharepoint.com/:f:/g/personal/bazar3_gatech_edu/EjBRXOdGK2JBpOc6zr8rUIMBveN-ahWKv3H4EckuoXLejA?e=zKBpF0

3. The following libraries should be installed in the environment being used. 
	a. Refer to requirements folder and txt for all required python libraries.
	b. libomp
	c. npm
	d. Sqlite via npm using command “npm install sqlite”

4. Open terminal in top level of framework folder (map.html should be at this level)

5. Run the fastapi application using the command: fastapi dev api/main.py

6. Once the fastapi is running, run the “map.html” in a web server.

7. Map.html is the frontend of the project application

EXECUTION:
1. Select the desired shipment variables:
	a. Commodity
	b. Select the Mexico/Canada state/province on the map
	c. Select the US state on the map
	d. Select the direction of shipment, Import to US or Export from US
	e. Enter the shipping weight
	f. Enter the desired maximum shipping charge
	g. Enter the value of the shipment
	h. Enter the month and year of the shipment
	i. Enter whether the shipment is in a container or not

2. Select Get Recommendation 
	a. The Recommendation will be shown to the right
	b. To the right of the map, a historical data bar chart for the chosen commodity and direction of ship will be displayed.
	c. Get Recommendation button will be disabled

3. Reset
	a. To run another scenario, press the Reset button
	b. The entry fields will be cleared and the bar chart will be cleared.
