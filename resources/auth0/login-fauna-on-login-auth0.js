/**
 * Auth0 Rule to generate FaunaDB user token on login
 */
async function loginFaunaOnUserLogin(user, context, callback) {
    user.user_metadata = user.user_metadata || {};

    const faunadb = require('faunadb');
    const q = faunadb.query;
    const client = new faunadb.Client(
        {secret: configuration.FAUNA_SECRET}
    );

    try {
        // In this example, identify user by email
        const users = await client.query(
            q.Paginate(
                q.Match(q.Index("usersByEmail"), user.email)
            )
        );

        let userRef;
        if (users.data.length === 0) {
            // If user does not exist, create record in User collection
            const res = await client.query(
                q.Create(q.Collection("User"), {
                    data:
                        {
                            email: user.email,
                            picture: user.picture,
                            isAdmin: false
                        }
                })
            );
            userRef = res.ref;
        } else {
            userRef = users.data[0];
        }

        // Login Process
        // See also https://www.felix-gehring.de/articles/2020/01/28/using-faunadb-with-an-identity-provider/
        const credential = await client.query(
            q.Create(q.Ref("tokens"), {
                instance: userRef
            })
        );

        user.user_metadata.fauna = {
            userId: credential.instance.id,
            token: credential.secret
        };

        context.idToken['https://fauna.com/'] = user.user_metadata.fauna;

        callback(null, user, context);
    } catch (err) {
        callback(err, user, context);
    }
}