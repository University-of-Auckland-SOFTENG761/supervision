<a name="readme-top"></a>

<div align="center">
  <h3>
    <a href="https://github.com/University-of-Auckland-SOFTENG761/project-team-1">
      <img src="/assets/logo.svg" alt="SuperVision" width="450">
    </a>
  </h3>

  <p align="center">
    Offline-First, Educational Patient Management for Optometrists
    <br />
    <a href="/apps/c4-diagram/docs/README.md"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://uoa-supervision.org">View Demo</a>
    ·
    <a href="https://github.com/University-of-Auckland-SOFTENG761/project-team-1/issues">Report Bug</a>
    ·
    <a href="https://github.com/University-of-Auckland-SOFTENG761/project-team-1/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
      </ul>
      <ul>
        <li><a href="#screenshots">Screenshots</a></li>
      </ul>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<div align="center">
  <a href="https://github.com/University-of-Auckland-SOFTENG761/project-team-1">
        <img src="/assets/screenshots/patient-details-framed.jpg" alt="SuperVision screenshot of patient details screen" width="700">
  </a>
</div>

SuperVision is a patient management system for optometry clinics.
It has been designed to be used by the [Aotearoa Vision Bus](https://communityeyehealth.auckland.ac.nz/our-research/vision-bus-aotearoa/).

Since the application will be used in situations with minimal or no data connection, it has been
designed to be functional without an internet connection and to minimise the bandwidth necessary to run it,
while still synchronising in real-time with other clients.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Features

- Offline first functionality
- Fast realtime synchronisation
- Low bandwidth usage
- Patient Management
  - Record Consultations
  - Record Dispensed Spectacles

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Documentation

Detailed documentation and C4 diagrams are [available here](/apps/c4-diagram/docs/README.md).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Screenshots

<details>
  <summary>Login while online</summary>
  <img src="/assets/screenshots/login-online.jpg" alt="screenshot of login screen">
</details>
<details>
  <summary>Login while offline</summary>
  <img src="/assets/screenshots/login-offline.jpg" alt="screenshot of login screen">
</details>
<details>
  <summary>Editing/viewing patient details</summary>
  <img src="/assets/screenshots/patient-details.jpg" alt="screenshot of login screen">
</details>
<details>
  <summary>Editing/viewing spectacles details</summary>
  <img src="/assets/screenshots/spectacles-details.jpg" alt="screenshot of login screen">
</details>
<details>
  <summary>Editing/viewing dispensed spectacles list</summary>
  <img src="/assets/screenshots/spectacles-list.jpg" alt="screenshot of login screen">
</details>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [React](reactjs.org/)
- [Mantine](https://mantine.dev)
- [NestJS](https://nestjs.com/)
- [Typescript](https://typescriptlang.org/)
- [RxDB](https://rxdb.info/)
- [Nx](https://nx.dev)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

#### node 16.x

https://nodejs.org/en/download/

#### postgresql

<details>
<summary>Ubuntu</summary>

```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create a User
sudo -u postgres createuser --interactive --pwprompt

# Create database
sudo -u postgres createdb supervision
```

</details>
<details>
<summary>Windows (chocolatey)</summary>
<a href="https://chocolatey.org/">https://chocolatey.org/</a>

```bash
# Install PostgreSQL
> choco install postgresql --params '/Password:<YOUR_SUPERUSER_PASS>'
# IMPORTANT: Restart all active terminal/bash/cmd/ps sessions
# Create a User
> createuser -U postgres --interactive --pwprompt
> Enter name of role to add: <windows username>
> Enter password for new role: <a password>
> Enter it again: <a password, again>
> Shall the new role be a superuser? (y/n) n
> Shall the new role be allowed to create databases? (y/n) y
> Shall the new role be allowed to create more new roles? (y/n) n
> Password: <YOUR_SUPERUSER_PASS>
# Create the database
> createdb supervision
> Password: <the password for the role you just created>
```

</details>

### Configuration

1. Get an API Key at [https://auth0.com](https://auth0.com)
   1. Sign up or login to access the dashboard
   2. Click <kbd>Create Application</kbd>
   3. Choose "Single Page Web Application"
   4. Take note of the **Client ID** and **Client Secret**
   5. Repeat the process but choosing the **"Machine to Machine"** application type.
      - Authorise this application for the **Auth0 Management API**
2. Clone the repo
   ```sh
   git clone https://github.com/University-of-Auckland-SOFTENG761/project-team-1 supervision
   ```
3. Install NPM packages
   ```sh
   cd supervision
   npm install
   ```
4. Setup backend configuration
   ```sh
   cp apps/backend/.env.template apps/backend/.env
   ```
   Fill out the [`.env`](apps/backend/.env) file with the details of your
   postgresql and auth0 configurations.
5. Modify frontend configuration files as necessary
   - [/apps/frontend/src/environments/environment.ts](/apps/frontend/src/environments/environment.ts)
   - [/apps/frontend/src/environments/environment.prod.ts](/apps/frontend/src/environments/environment.prod.ts)
6. Run backend
   ```sh
   nx serve backend
   ```
7. Run frontend (in a separate terminal)
   ```sh
   nx serve frontend
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

A roadmap and product backlog are available on Trello.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

This application and all source code contained within are not permitted to be
used by or released to the public.

Copyright (c) 2022 Veeran Morar & Team 1 SOFTENG761

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Veeran Morar](https://profiles.auckland.ac.nz/veeran-morar), for being an excellent PO

<p align="right">(<a href="#readme-top">back to top</a>)</p>
