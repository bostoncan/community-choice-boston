# Community Choice Energy Campaign Page
Campaign page to support Community Choice Aggregation in Boston, compiling
public information and an action plan for increasing renewables for the
city

### Setup
Install [Docker](https://docs.docker.com/engine/installation/#/on-macos-and-windows)

```
# Spin up the development server
$ docker-compose up
```

Open [localhost:3000](http://localhost:3000) to see.

### To Do
- Citations page, styling for links
- Hook up petition form (when we have a destination)
- Action timeline
  - Create proposal
  - Present to City Council
  - City Council votes
  - Mayor signs off
  - Energy Broker acquired
  - Review proposal
  - Sign into law

### Need
- Petition form destination
- Actual action timeline
- Estimated energy and C02 savings
- 10/12 word summary tagline
- Primary pitch text
- Endorsements
- Massachussets summary stats & text of CCAs
- Massachussets community choice energy programs
  - Location
  - Date of program
  - Renewables increase
  - Cost/Savings to residents
  - Noteable text
- Device testing
  - iOS
  - Android
  - Windows
  - Browsers
- Deployment discussion (location, cost, etc.)

### Deployment Options

#### AWS
- Very cheap (Free for a year then 10cents/month maybe)
- Easy, terraform deployable

#### Firebase
- Free up to 5000 page views per month

#### litbt
- Free, generally easy, but not open if I get hit by a bus
