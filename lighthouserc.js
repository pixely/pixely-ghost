module.exports = {
    ci: {
        collect: {
            url: [
                'https://pixely.co.uk/',
                'https://pixely.co.uk/2020-year-in-review/',
                'https://pixely.co.uk/metrics-metrics-everywhere-where-to-start-with-web-performance-metrics/',
                'https://pixely.co.uk/author/graham/',
                'https://pixely.co.uk/tag/performance/',
            ],
            numberOfRuns: 3,
            staticDistDir: './dist',
        },
        assert: {
            preset: 'lighthouse:no-pwa',
            assertions: {
                'unused-javascript': ['warn'],
            },
        },
        upload: {
            target: 'lhci',
            serverBaseUrl: 'https://enigmatic-chamber-98135.herokuapp.com',
            failOnUploadFailure: true,
        },
    },
};