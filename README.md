# ServiceDocument
### Reception service PDF document and send document to another service.

The main functionality of the service is to serve as an intermediary since the service receives a pdbg document which keeps within the service route and from there to perform the consumption to send it.

The "ServiceDocument.service" file is a configuration file for the service to be up on a linux server.

### How to configure .env file (Not include in project)

```
# Posible values are only Integers
PORT=8080

# Posibles value are <true | false>
DEBUG=true

```

### Should I commit my .env file?

No. We strongly recommend against committing your .env file to version control. It should only include
environment-specific values such as database passwords or API keys. Your production database should have a different
password than your development database.

#### Should I have multiple .env files?

No. We strongly recommend against having a "main" .env file and an "environment"
.env file like .env.test. Your config should vary between deploys, and you should not be sharing values between
environments.
