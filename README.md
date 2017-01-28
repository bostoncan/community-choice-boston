# Community Choice Energy Campaign Page
Campaign page to support Community Choice Aggregation in Boston, compiling
public information and an action plan for increasing renewables for the
city

### Development Environment Setup
The following directions assume a Mac or Linux machine, or at least bash
access.  Windows users may find that their mileage varies.

#### Local configs
Create a json file in `./api/src/config/local.json` to override configs:

```json
{
  "GOOGLE_API_KEY": "API key for accessing the public calendar",
  "GOOGLE_CAL_ID": "The id of the public calendar for CCE events",
  "GOOGLE_SHEET_ID": "ID of the spreadsheet to hold petition submissions",
  "GOOGLE_DRIVE_CRED": {
     "//": "Contents of the json credentials file for accessing Google drive sheet"
  }
}
```

#### Running locally

First, install [Docker](https://docs.docker.com/engine/installation/#/on-macos-and-windows).

```
# Spin up the development server
$ docker-compose up
```

Open [localhost:3000](http://localhost:3000) to see.
