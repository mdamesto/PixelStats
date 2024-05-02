import styled from "styled-components";
import { useState, useMemo } from "react";
import {map, sortBy } from 'lodash';

const Item = ({ data }) => {
    const [expanded, setExpanded] = useState(false);

    const sorted_matchups = useMemo(() => {
        if (data.matchups) {
            return sortBy(data.matchups, (a) => -(a.wins + a.looses));
        }
        return [];
    }, [data.matchups]);

    return (
        <ItemWrapper>
            <DeckTypeStatsWrapper onClick={() => setExpanded(!expanded)}>
                {data.inks.map((ink, index) => (
                    <InkIcon key={index} src={`/Icons/${ink}.svg`} />
                ))}
                <Name>{data.deck_name}</Name>
                <DeckStatsWrapper>{data.totalWins} - {data.totalLosses} ({data.averageWinRate.toFixed(2)}%)</DeckStatsWrapper>
            </DeckTypeStatsWrapper>
            {expanded && (
                <MatchupsWrapper>
                    {map(sorted_matchups, (matchup, key) => (
                        <Matchup key={key}>
                            <MatchupName>
                                {matchup.deck_name}
                                {matchup.colors.map((color, index) => (
                                    <InkIconSmall key={index} src={`/Icons/${color}.svg`} />
                                ))}
                            </MatchupName>
                            <MatchupStats>{matchup.wins} - {matchup.losses} ({matchup.win_rate.toFixed(2)}%)</MatchupStats>
                        </Matchup>
                    ))}
                </MatchupsWrapper>
            )}
        </ItemWrapper>
    )
}

export default Item;

const ItemWrapper = styled.div.withConfig({
    displayName: "ItemWrapper",
})`
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
    cursor: pointer;
  `;
const DeckTypeStatsWrapper = styled.div.withConfig({
    displayName: "DeckTypeStatsWrapper",
})`
    display: flex;
    align-items: center;
  `;
const Name = styled.div.withConfig({
    displayName: "Name",
})`
    font-size: 20px;
    margin-right: 5px;
    width: 300px;
  `;
const DeckStatsWrapper = styled.div.withConfig({
    displayName: "DeckStatsWrapper",
})`
    margin-left: 5px;
  `;
const InkIcon = styled.img.withConfig({
    displayName: "InkIcon",
})`
    width: 30px;
  `;
const InkIconSmall = styled.img.withConfig({
    displayName: "InkIconSmall",
})`
    width: 18px;
  `;
  const MatchupsWrapper = styled.div.withConfig({
    displayName: "MatchupsWrapper",
})`
  `;
const Matchup = styled.div.withConfig({
    displayName: "Matchup",
})`
    display: flex;
    align-items: center;
    padding: 5px;
  `;
const MatchupName = styled.div.withConfig({
    displayName: "MatchupName",
})`
    margin-right: 5px;
    width: 300px;
  `;
const MatchupStats = styled.div.withConfig({
    displayName: "MatchupStats",
})`
  `;