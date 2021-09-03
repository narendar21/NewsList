import axios from "axios"
import { useEffect, useState } from "react"

import NewsListContainer from "./NewsListContainer";


function NewsListTask() {

    const [newsList, setNewsList] = useState([]);
    const [tempNewsList, setTempNewsList] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [displayIndex, setDisplayIndex] = useState(5);
    const [ddSelectedValue, setddSelectedValue] = useState('Filter By Source');

    useEffect(() => {

        async function fetchNews() {
            const result = await axios('https://newsapi.org/v2/everything?q=tesla&from=2021-08-03&sortBy=publishedAt&apiKey=962cc60d33574734aa2593a1108a3cfd');
            setNewsList(result.data.articles);
            setTempNewsList(result.data.articles);
        }
        fetchNews();

    }, []);

    useEffect(() => {
        const populateFilterData = () => {
            const ddValues = new Set();
            newsList.forEach((item) => {
                ddValues.add(item.source.name);
            })
            setFilterList([...ddValues]);
        }
        populateFilterData();
    }, [newsList])


    const displayMoreitems = () => {
        setDisplayIndex(() => {
            return newsList.length > displayIndex + 5 ? displayIndex + 5 : newsList.length
        })
    }

    const filterItems = (e) => {
        setDisplayIndex(5);
        setddSelectedValue(e.target.value);
        setTempNewsList(filteredList(e.target.value))
    }

    const filteredList = (filterValue) => {
        if (filterValue === 'Filter By Source') {
            return newsList;
        } else {
            let list = newsList.filter((item) => {
                return filterValue === item.source.name
            })
            return list;
        }
    }


    return (
        <>
            <div style={{ background: '#f1f1f1', width: '60vw' }}>
            <NewsListContainer ddSelectedValue={ddSelectedValue} filterItems={filterItems}
              filterList={filterList} tempNewsList={tempNewsList} displayIndex={displayIndex}
               displayMoreitems={displayMoreitems} ></NewsListContainer>

            </div>
        </>
    );
}
export default NewsListTask