import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './newsList.css'
const NewsListContainer = (props) => {


    const selectEleRef = useRef();
    useEffect(() => {
        selectEleRef.current.focus();
    }, [])

    return (
        <div style={{ background: '#f1f1f1', width: '60vw' }}>

            <span style={{
                textDecoration: 'underline', margin: '0 0 0  5vw',
                textAlign: 'left'
            }}>
                <strong >News</strong> </span>
            <span style={{ float: 'right', marginRight: '10vw' }}>

                <select ref={selectEleRef} id='filter' value={props.ddSelectedValue}
                    onChange={props.filterItems}>
                    <option value='Filter By Source'>Filter By Source</option>
                    {props.filterList.map(element => {

                        return <option key={uuidv4()} value={element}>{element}</option>
                    })};

                </select> </span>


            <div >
                <br />
                {props.tempNewsList.map((item, index) => (
                    <div style={{ margin: '1vw 1vw 1vw 5vw', textAlign: 'left' }}
                        key={uuidv4()}>
                        {(index < props.displayIndex) ?
                            <span key={uuidv4()} >
                                <a style={{ textDecoration: 'none', color: 'black' }} href={item.url}  > {item.title}
                                    <div><span>{item.publishedAt}</span>
                                        <button disabled={true} style={{ margin: '0 0 0 1vw', backgroundColor: 'grey', color: 'white', borderRadius: '1vw' }}>
                                            {item.source.name}</button></div></a>
                            </span> : null} </div>
                ))}
                <div align='left' ><button style={{
                    margin: '0 0 0 5vw', color: 'red', height: '2VW', width: '10vw',
                    border: 'solid red 2px', fontSize:'1.3vw'}}
                    disabled={(props.displayIndex + 5 > props.tempNewsList.length) && true}
                    onClick={props.displayMoreitems}>Show More</button></div>
            </div>

        </div >
    )
}
export default NewsListContainer