const path = require('path')

// If both file have same variable, the variable of .env.local is used.
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local')})
require('dotenv').config()

module.exports = {
    env: {
        // Reference a variable that was defined in the .env.local file and make it available at Build Time
        AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
        AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
        FAUNA_GRAPHQL_ENDPOINT: process.env.FAUNA_GRAPHQL_ENDPOINT || "https://graphql.fauna.com/graphql",
        FAUNA_ANONYMOUS_KEY: process.env.FAUNA_ANONYMOUS_KEY
    },
}