# Single Page Application

`/SuperVision/Single Page Application`

- [Overview](../../README.md)
  - [Deployment](../../Deployment/README.md)
  - [SuperVision](../../SuperVision/README.md)
    - [API Application](../../SuperVision/API%20Application/README.md)
    - [**Single Page Application**](../../SuperVision/Single%20Page%20Application/README.md)

---

[SuperVision (up)](../../SuperVision/README.md)

---

![diagram](component.svg)

## RxDB

This application relies heavily on [rxdb](https://rxdb.info) for an offline database with push/pull replication.

    This application is currently using RxDB v12.
    The documentation is for v13 and so there may be some differences

    Documentation for RxDB v12.7.16 can be found at:
    https://github.com/pubkey/rxdb/tree/fc96cc8c5b46339d345a861b33274aaa98fda54e

### Schema

For each RxDB collection, a separate replication must be established.

### Patient

### Consult
