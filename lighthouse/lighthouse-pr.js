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
            settings: {
                skipAudits: ['redirects-http'],
            },
            assertions: {
                'categories:performance': ['error', { 'minScore': 0.9}],
                'categories:accessibility': ['error', { 'minScore': 0.9}],
                'categories:seo': ['error', { 'minScore': 0.9}]
            },
        },
    },
};