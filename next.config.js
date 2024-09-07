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
    }

};
