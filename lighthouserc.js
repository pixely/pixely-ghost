module.exports = {
    ci: {
        collect: {
            url: [
                "/",
                "/2020-year-in-review/",
                "/author/graham/",
            ],
            numberOfRuns: 2,
            staticDistDir: "./dist",
        },
        assert: {
            preset: "lighthouse:recommended",   
        },
        upload: {
            target: 'lhci',
            serverBaseUrl: 'https://enigmatic-chamber-98135.herokuapp.com',
            failOnUploadFailure: true,
        },
    },
}