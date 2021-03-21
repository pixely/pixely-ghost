import defaultLighthouseConfig from './lighthouse-pr';

module.exports = {
    ci: {
        ...defaultLighthouseConfig.ci,
        upload: {
            target: 'lhci',
            serverBaseUrl: 'https://enigmatic-chamber-98135.herokuapp.com',
            failOnUploadFailure: true,
        },
    },
};