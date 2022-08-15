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
```

</details>
