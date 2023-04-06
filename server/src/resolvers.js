const resolvers = {
    Query: {
        // get all tracks, will be used to populate the homepage grid of our web client
        tracksForHome: (_, __, {dataSources}) => {
            return dataSources.trackAPI.getTracksForHome();
        },

        // There is no equivalent rest api to retrieve a list of authors.
        // Because of this, will use mock data
        authorDirect: (_, __, {dataSources}) => {
            // authorId and extra are not in schema, but query will still work
            return [{
                authorId: "cat-1", extra: "test1", id: "1", name: "name", photo: "photo",
            }, {
                authorId: "cat-2", extra: "test2", id: "2", name: "name", photo: "photo",
            }];
        },
    }, Track: {
        // authorId is case-sensitive to the Rest API endpoint, beware of typo!
        author: ({authorId}, _, {dataSources}) => {
            // Can filter the parent argument
            //if (authorId === "cat-1") return null;
            return dataSources.trackAPI.getAuthor(authorId);
        },
    }, Author: {
        //authorId and extra is case-sensitive to the mock data, beware of typo!
        author: ({authorId, extra}, _, {dataSources}) => {
            // Can filter the parent argument
            //if (authorId === "cat-1") return null;

            // the extra argument not schema
            console.log(extra+"Author-author");

            // extra are not in schema, but query will still work
            return {
                "photo": "https://images.unsplash.com/photo-1442291928580-fb5d0856a8f1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzA0OH0",
                "name": "Henri, le Chat Noir",
                "id": authorId,
                "extra": extra
            }
        },

        mock: ({extra}, _, {dataSources}) => {
            // the extra argument not schema
            console.log(extra+"Author-mock");

            // moreExtra are not in schema, but query will still work
            return {
                "extra": extra,
                "moreExtra" : "testing"
            }
        },
    },
    MockTest:{
        // Confused, I think this is overriding the mock
        extra: ({extra}, _, {dataSources}) => {
            // the extra argument not schema
            console.log(extra+"MockTest-extra");

            // moreExtra are not in schema, but query will still work
            return "Overriding"
        },
    }
};

module.exports = resolvers;