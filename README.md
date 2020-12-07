# Community Choice Energy Campaign Page
Campaign page to support Community Choice Aggregation in Boston, compiling
public information and an action plan for increasing renewables for the
city.

### Development Environment Setup
The following directions assume a Mac or Linux machine, or at least bash
access.  Windows users may find that their mileage varies.

#### Running locally

First, install [Docker](https://docs.docker.com/engine/installation/#/on-macos-and-windows).

```
# Spin up the development server
$ docker-compose up
```

Open [localhost](http://localhost) to see.

#### Deploying

Put your production configs into `.env` in the project root.

In addition to config overrides, you will need to get credentials for the
BCAN/CCE AWS account.

```bash
AWS_ACCESS_KEY_ID=<access_key>
AWS_SECRET_ACCESS_KEY=<secret_key>
```

Then run the script:

```bash
$ ./deploy.sh
```
