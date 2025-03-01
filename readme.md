# Examples of Broken Security with Next.js + Postgres.js

Examples of common security mistakes causing broken authentication, broken authorization, secrets exposure, cross-site scripting and more.

<figure>
  <img src="2-missing-authentication.png" alt="" />
  <figcaption><p align="center"><em>Screenshot of the missing authentication example, where blog post content is incorrectly being shown to a user who is not logged in (all blog post content should be only visible to logged-in users)</em></p></figcaption>
</figure>

<br /><br />

<figure>
  <img src="4-missing-authorization.png" alt="" />
  <figcaption><p align="center"><em>Screenshot of the missing authorization example, where unpublished, private blog post content is incorrectly being exposed in the HTML to a user who is not the owner</em></p></figcaption>
</figure>

<br /><br />

<figure>
  <img src="5-secrets-exposure.png" alt="" />
  <figcaption><p align="center"><em>Screenshot of the secrets exposure example, showing an API key being exposed</em></p></figcaption>
</figure>

<br /><br />

<figure>
  <img src="6-cross-site-scripting.png" alt="" />
  <figcaption><p align="center"><em>Screenshot of cross-site scripting example, showing an alert() triggered from an image with a broken src and an onerror attribute</em></p></figcaption>
</figure>

<br /><br />

## Setup

Clone the repo and install the dependencies using pnpm:

```bash
pnpm install
```

## Database Setup

Copy the `.env.example` file to a new file called `.env` (ignored from Git) and fill in the necessary information.

To install PostgreSQL on your computer, follow the instructions from the PostgreSQL step in [UpLeveled's System Setup Instructions](https://github.com/upleveled/system-setup/blob/master/readme.md).

Then, connect to the built-in `postgres` database as administrator in order to create the database:

**Windows**

If it asks for a password, use `postgres`.

```bash
psql -U postgres
```

**macOS**

```bash
psql postgres
```

**Linux**

```bash
sudo -u postgres psql
```

Once you have connected, run the following to create the database:

```sql
CREATE DATABASE security_vulnerability_examples_next_js_postgres;

CREATE USER security_vulnerability_examples_next_js_postgres
WITH
  ENCRYPTED PASSWORD 'security_vulnerability_examples_next_js_postgres';

GRANT ALL PRIVILEGES ON DATABASE security_vulnerability_examples_next_js_postgres TO security_vulnerability_examples_next_js_postgres;
```

Quit `psql` using the following command:

```bash
\q
```

On Linux, you will also need to create a Linux system user with a name matching the user name you used in the database. It will prompt you to create a password for the user - choose the same password as for the database above.

```bash
sudo adduser security_vulnerability_examples_next_js_postgres
```

Once you're ready to use the new user, reconnect using the following command.

**Windows and macOS:**

```bash
psql -U security_vulnerability_examples_next_js_postgres security_vulnerability_examples_next_js_postgres
```

**Linux:**

```bash
sudo -u security_vulnerability_examples_next_js_postgres psql -U security_vulnerability_examples_next_js_postgres security_vulnerability_examples_next_js_postgres
```

## Running Migrations

To set up the structure and the content of the database, run the migrations using Ley:

```bash
pnpm migrate up
```

To reverse the last single migration, run:

```bash
pnpm migrate down
```

## Run Dev Server

Run the Next.js dev server with:

```bash
pnpm dev
```
