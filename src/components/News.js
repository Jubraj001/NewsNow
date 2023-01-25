import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
const News=(props)=>{
  const [articles,setArticles] = useState([]);
  const [loading,setLoading] = useState(true);
  const [page,setPage] = useState(1);
  const [totalResults,setTotalResults] = useState(0);

  const updateNews= async()=>{
    props.showProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.showProgress(30);
    let parsedData = await data.json();
    props.showProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.showProgress(100);
  }

  const fetchMoreData = async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  }

  useEffect(()=>{
      updateNews();
      document.title=`NewsNow - ${props.category[0].toUpperCase() + props.category.substring(1)}`;
      // eslint-disable-next-line
  },[])
      
    return (
      <>
        <h1 className="text-center" style={{marginTop:'80px'}}>NewsNow - Top {props.category[0].toUpperCase() + props.category.substring(1)} headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length < totalResults}
            loader={<Spinner/>}
          >
            <div className="container">
            <div className='row'> 
                {articles.map((element)=>{
                return <div className="col-lg-4 col-md-6" key={element.url}>    
                    <NewsItem title= {element.title} description = {element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
                })}
            </div>
            </div>
          </InfiniteScroll>
      </>
    )
}

News.defaultProps={
  country: "in",
  pageSize: 6,
  category: 'general'
}

News.propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News;
