import React from 'react';

async function fetchPortfolio(subdomain) {
    try {
        const res = await fetch(`http://localhost:5000`);
        if (!res.ok) {
            throw new Error('Failed to fetch portfolio data');
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching portfolio data:', error);
        return null;
    }
}

const PortfolioPage = async ({ params }) => {
    const subdomain = params.subdomain || 'default';
    const portfolio = await fetchPortfolio(subdomain);

    if (!portfolio) {
        return <div>No portfolio found for {subdomain}</div>;
    }

    return (
        <div>
            <h1>{portfolio.name}</h1>
            <p>{portfolio.content}</p>
        </div>
    );
};

export default PortfolioPage;
