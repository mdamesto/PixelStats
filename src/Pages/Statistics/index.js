import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { useSortedDataByDeckList, useFormattedDecksData } from './helpers';
import Item from './Item';
import TabPicker from './TabPicker';

const Statistics = () => {
    const [rawData, setRawData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('all');

    const sortedData = useSortedDataByDeckList(rawData);
    const allData = useFormattedDecksData(sortedData);
    const hardcoreData = useFormattedDecksData(useSortedDataByDeckList(rawData.filter(item => item['Hardcore?'] === 'True')));
    const classicData = useFormattedDecksData(useSortedDataByDeckList(rawData.filter(item => item['Hardcore?'] === 'False')));

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/data.csv');
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder('utf-8');
            const csv = decoder.decode(result.value);
            const results = Papa.parse(csv, { header: true });
            const dataFiltered = results.data.filter((item) => item['Field1']);
            setRawData(dataFiltered);
        }
        fetchData();
    }, []);

    const displayData = {
        'all': allData,
        'hardcore': hardcoreData,
        'classic': classicData
    };

    const handleTabClick = (filter) => {
        setSelectedFilter(filter);
    };

    return (
        <div className="App">
            <h1>PIXEL STATS</h1>
            <TabPicker handleTabClick={handleTabClick} selectedFilter={selectedFilter}/>
            <div className="tab-content">
                {displayData[selectedFilter].map((data, index) => (
                    <Item data={data} key={index} />
                ))}
            </div>
        </div>
    );
};

export default Statistics;
