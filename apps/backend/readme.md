# SuperVision Backend

## Quick Start

1. Install [Dependencies](#Dependencies)
2. Create `.env` file in backend root (next to this readme). Reference `.env.template`
3. Run `nx serve backend`
4. Access the query sandbox at http://localhost:3333/graphql

## Dependencies

### PostgreSQL

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

### Node
```bash
npm install
```
