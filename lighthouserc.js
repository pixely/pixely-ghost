module.exports = {
    ci: {
        collect: {
            url: [
                "/",
                "/2020-year-in-review/",
                "/metrics-metrics-everywhere-where-to-start-with-web-performance-metrics/",
                "/author/graham/",
                "/tag/performance/",
            ],
            numberOfRuns: 3,
            staticDistDir: "./dist",
        },
        assert: {
            preset: "lighthouse:no-pwa",   
        },
        upload: {
            target: 'lhci',
            serverBaseUrl: 'https://enigmatic-chamber-98135.herokuapp.com',
            failOnUploadFailure: true,
        },
    },
}