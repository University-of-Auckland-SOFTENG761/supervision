# Continuous Deployment

An [automated deployment](/.github/workflows/deploy.yml) occurs on any push to the main branch.
To understand the steps and commands needed to run a deployment, it will be very helpful to inspect this file.

## Helm
To avoid committing secrets into git, the helm deployment step uses GitHub secrets.
The secret named `PROD_HELM_CONFIG` is downloaded into a `.yml` file and base64-decoded and then passed into helm with `-f`.

You can use the template at [/apps/backend/helm/values.yaml](/apps/backend/helm/values.yaml) to populate this secret file.

# GitHub Container Registry

The `supervision` backend docker image can be viewed [here](https://github.com/orgs/University-of-Auckland-SOFTENG761/packages/container/package/supervision).
The latest package is labeled `main` and is uploaded as part of the [Continuous Deployment](#Continuous Deployment).

# Auth0

Auth0 currently uses the same database for local development as production due to cost saving measures.
As soon as it is feasible, this should be phased out and tighter access control should be implemented.

# Browser Support

The application has been tested and developed in modern versions of
both chrome and firefox. It is not guaranteed to work completely in any other browsers.

## Known Issues

- Firefox private browsing can sometimes prevent indexdb access and stop database synchronisation.

# Backend Deployment
This section explains the steps taken to deploy the backend on the GCP kubernetes cluster.
It is assumed you have a base understanding of Helm/K8S/Docker.

1. Build Docker image
2. Publish Docker image to [GitHub Container Registry](https://ghcr.io)
3. Use helm to upgrade deployment to use the new tag

# Google Cloud Platform

The platform is presently hosted on [GCP](https://console.cloud.google.com/home/dashboard?project=axial-serenity-361909).

**Important Links**

| Name                    | Description                                                | URL                                                                                                          |
|-------------------------|------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| Dashboard               | Main dashboard for monitoring and quick access to services | https://console.cloud.google.com/home/dashboard?project=axial-serenity-361909                                |
| Cloud Storage           | Static hosting of front-end application and static assets  | https://console.cloud.google.com/storage/browser?project=axial-serenity-361909&prefix=                       |
| Kubernetes Engine (GKE) | Deployment/management of back-end application              | https://console.cloud.google.com/kubernetes/list/overview?project=axial-serenity-361909                      |
| Cloud SQL               | Deployment/management of database                          | https://console.cloud.google.com/sql/instances?project=axial-serenity-361909                                 |
| IP Addresses            | Assign IP addresses to services                            | https://console.cloud.google.com/networking/addresses/list?project=axial-serenity-361909                     |
| Load Balancers          | Create/manage load balancers                               | https://console.cloud.google.com/net-services/loadbalancing/list/loadBalancers?project=axial-serenity-361909 |

## Cloud Storage

### [supervision-assets](https://console.cloud.google.com/storage/browser/supervision-assets;tab=objects?forceOnBucketsSortingFiltering=false&project=axial-serenity-361909)

This is a bucket which hosts the background image and logo for auth0.

### [uoa-supervision.org](https://console.cloud.google.com/storage/browser/uoa-supervision.org;tab=objects?forceOnBucketsSortingFiltering=false&project=axial-serenity-361909)

This bucket holds the main SPA and is exposed by the load-balancer [`frontend-bucket`](https://console.cloud.google.com/net-services/loadbalancing/details/http/frontend-bucket?project=axial-serenity-361909).
Files are deleted and uploaded reguarly as part of [continuous deployment](#Continuous Deployment).

## Cloud SQL

### [supervision-dev](https://console.cloud.google.com/sql/instances/supervision-dev/overview?project=axial-serenity-361909)

This is the live database instance. You can modify the users and permissions in the console.

    Backups are not currently enabled so do not use it for crucial data.

#### Migrations
Schema changes do not synchronise automatically as they do when developing locally. 
This is by design, to limit changes to production and increase security.

If you have made a schema change you will need to apply a migration.
A recommended solution is to use [TypeORM migrations](https://typeorm.io/migrations).

## Google Kubernetes Engine
### [supervision-backend-dev](https://console.cloud.google.com/kubernetes/clusters/details/australia-southeast1/supervision-backend-dev?project=axial-serenity-361909)
Easily the most complicated deployment. Read more about this deployment in the [Backend Deployment](#Backend Deployment) section.

The load-balancer for this service is created automatically as part of the ingress configuration.
