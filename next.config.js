module.exports = {
    async rewrites() {
        return [
            {
                source: '/:subdomain',
                destination: '/[subdomain]',
            },
        ];
    },

    async redirects() {
        return [];
    },

    images: {
        domains: ['localhost'], // Add 'localhost' or any other required domain here
    },

};
