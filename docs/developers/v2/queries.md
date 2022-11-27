# Querying

Below are some sample queries you can use to gather information from the Yearn contracts.

You can build your own queries using a [GraphQL Explorer](https://graphiql-online.com/graphiql) and enter your endpoint to limit the data to exactly what you need.

# Get Account info by ID

```graphql
{
  accounts(where: { id: "0x19d3364a399d251e894ac732651be8b0e4e85001" }) {
    id
    withdrawals {
      id
      timestamp
      vault {
        shareToken {
          symbol
        }
        token {
          symbol
        }
      }
      tokenAmount
      sharesBurnt
    }
  }
}
```

# Get Account Vault Positions by ID

```graphql
{
  accountVaultPositions(
    where: { account: "0x05f9e07afccd4ea69310e316f4c5ef81ed3ed9c8" }
  ) {
    token {
      symbol
    }
    shareToken {
      symbol
    }
    vault {
      id
      token {
        symbol
      }
      shareToken {
        symbol
      }
    }
    account {
      id
    }
    balanceShares
    balanceTokens
    balancePosition
    updates(orderBy: blockNumber, orderDirection: desc) {
      id
      blockNumber
      transaction {
        event
        hash
      }
      deposits
      withdrawals
      sharesMinted
      sharesBurnt
      tokensSent
      tokensReceived
      sharesSent
      sharesReceived
    }
    latestUpdate {
      id
    }
    transaction {
      hash
    }
  }
}
```

# Get Account Vault Position Updates

```graphql
{
  accounts(where: { id: "0xfddb9ea284e486579c010a75b551614525ad014f" }) {
    id
    vaultPositions {
      id
      token {
        symbol
      }
      shareToken {
        symbol
      }
      vault {
        id
      }
      balanceShares
      balanceTokens
      balancePosition
      updates {
        id
        transaction {
          event
          hash
        }
        deposits
        withdrawals
        sharesMinted
        sharesBurnt
        tokensSent
        tokensReceived
        sharesSent
        sharesReceived
      }
    }
  }
}
```

# Get all Accounts

```graphql
{
  accounts {
    id
    sharesSent {
      id
      shareToken {
        symbol
      }
      token {
        symbol
      }
      amount
      tokenAmount
    }
  }
}
```
