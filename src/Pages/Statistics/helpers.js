import { useMemo } from 'react';
import sortBy from 'lodash/sortBy';

export const useSortedDataByDeckList = (data) => {
    return useMemo(() => {
        const allCombinations = new Set(
            data.map(item => `${item["Player 1 - Deck Name"]} - ${item["Player 1"]}`)
        );
        return Array.from(allCombinations).reduce((acc, key) => {
            acc[key] = data.filter(item => `${item["Player 1 - Deck Name"]} - ${item["Player 1"]}` === key);
            return acc;
        }, {});
    }, [data]);
};

export const useFormattedDecksData = (data) => useMemo(() => {
    const formatted = Object.entries(data).map(([key, items]) => {
        const inks = [items[0]["Ink 1"], items[0]["Ink 2"]]
        const matchups = items.map(item => {
            const stats = parseField1(item.Field1);
            return {
                deck_name: item["Player 2 - Deck Name"],
                ...stats
            };
        });

        const totalWins = matchups.reduce((acc, { wins }) => acc + wins, 0);
        const totalLosses = matchups.reduce((acc, { losses }) => acc + losses, 0);
        const totalGames = totalWins + totalLosses;
        const averageWinRate = matchups.reduce((acc, m) => acc + (m.win_rate * (m.wins + m.losses) / totalGames), 0);

        return {
            deck_name: items[0]["Player 1 - Deck Name"],
            key,
            matchups,
            totalGames,
            totalWins,
            totalLosses,
            averageWinRate,
            inks,
        };
    });

    return sortBy(formatted, 'totalGames').reverse();
}, [data]);

export const parseField1 = (field1) => {
    const regex = /vs (\w+)\/(\w+)[ -:]+.*?Total Wins: (\d+) \|\| Total Losses: (\d+) \|\| Win Rate: (\d+\.\d+)%/;
    const matches = field1.match(regex);
    return matches ? {
        colors: [matches[1], matches[2]],
        wins: parseInt(matches[3], 10),
        losses: parseInt(matches[4], 10),
        win_rate: parseFloat(matches[5]),
    } : null;
};