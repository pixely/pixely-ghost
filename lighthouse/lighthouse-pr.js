module.exports = {
    ci: {
        collect: {
            url: [
                '/',
                '/2020-year-in-review/',
                '/metrics-metrics-everywhere-where-to-start-with-web-performance-metrics/',
                '/author/graham/',
                '/tag/performance/',
            ],
            numberOfRuns: 3,
            staticDistDir: './dist',
        },
        assert: {
            preset: 'lighthouse:no-pwa',
            settings: {
                skipAudits: ['redirects-http'],
            },
            assertions: {
                'unused-javascript': ['warn'],
            },
        },
    },
};