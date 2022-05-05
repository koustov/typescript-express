import express, { Request, Response, NextFunction } from 'express';

interface ILocationWithTimezone {
  location: string;
  timezoneName: string;
  timezoneAbbr: string;
  utcOffset: number;
};

class LocationWithTimezone implements ILocationWithTimezone {
  location: string;
  timezoneName: string;
  timezoneAbbr: string;
  utcOffset: number;
  constructor(obj: any){
    this.location = obj.location;
    this.timezoneName = obj.timezoneName;
    this.timezoneAbbr = obj.timezoneAbbr;
    this.utcOffset = obj.utcOffset;
  }
} 

let locations: LocationWithTimezone[] = [
  {
    location: 'Germany',
    timezoneName: 'Central European Time',
    timezoneAbbr: 'CET',
    utcOffset: 1
  },
  {
    location: 'China',
    timezoneName: 'China Standard Time',
    timezoneAbbr: 'CST',
    utcOffset: 8
  },
  {
    location: 'Argentina',
    timezoneName: 'Argentina Time',
    timezoneAbbr: 'ART',
    utcOffset: -3
  },
  {
    location: 'Japan',
    timezoneName: 'Japan Standard Time',
    timezoneAbbr: 'JST',
    utcOffset: 9
  }
];


const getLocationsWithTimezones = (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(locations);
};

const updateLocationsWithTimezones = (request: Request, response: Response, next: NextFunction) => {
  console.log(JSON.stringify(request.body))


  const tBody:LocationWithTimezone = new LocationWithTimezone(request.body);
  console.log("Before >>>>>>>>>>>>>>>> ")
  console.log(JSON.stringify(tBody))
  console.log("After >>>>>>>>>>>>>>>> ")
  locations.push(tBody);
  response.status(200).json(locations);
};

const app = express();
const port = 3000;
app.use(express.json())

app.get('/timezones', getLocationsWithTimezones);

app.post('/timezones', updateLocationsWithTimezones);


app.listen(port, () => {
	console.log(
		`Timezones by location application is running on port ${port}.`
	);
});


