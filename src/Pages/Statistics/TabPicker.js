import React from 'react';
import styled from 'styled-components';

const TabPicker = ({ handleTabClick, selectedFilter }) => {
    return (
        <TabsContainer>
            <Tab
                active={selectedFilter === 'all'}
                onClick={() => handleTabClick('all')}
            >
                All
            </Tab>
            <Tab
                active={selectedFilter === 'hardcore'}
                onClick={() => handleTabClick('hardcore')}
            >
                Hardcore
            </Tab>
            <Tab
                active={selectedFilter === 'classic'}
                onClick={() => handleTabClick('classic')}
            >
                Classic
            </Tab>
        </TabsContainer>
    );
};

export default TabPicker;

const TabsContainer = styled.div`
    display: flex;
    margin-bottom: 10px;
    margin-left: 10px;
`;

const Tab = styled.button`
    padding: 8px 16px;
    border: none;
    background-color: ${props => props.active ? '#ccc' : '#f1f1f1'};
    color: ${props => props.active ? '#000' : '#333'};
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: #ddd;
    }

    & + & {
        margin-left: 5px;
    }
`;
