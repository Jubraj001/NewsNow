import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export default class News extends Component {

static defaultProps={
  country: "in",
  pageSize: 6,
  category: 'general'
}

static propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

constructor(props){
  super(props);
  this.state={
      articles:[],
      loading: false,
      page:1,
      totalResults:0
  }
  document.title=`NewsNow - ${this.props.category[0].toUpperCase() + this.props.category.substring(1)}`;
}

async updateNews(){
  this.props.showProgress(10);
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data = await fetch(url);
  this.props.showProgress(30);
  let parsedData = await data.json();
  this.props.showProgress(70);
  this.setState({
    articles: parsedData.articles, 
    totalResults:parsedData.totalResults,
    loading:false});
    this.props.showProgress(100);
}

fetchMoreData = async()=>{
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  this.setState({page:this.state.page+1});
  let data = await fetch(url);
  let parsedData = await data.json();
  this.setState({
    articles: this.state.articles.concat(parsedData.articles), 
    totalResults:parsedData.totalResults});
}

async componentDidMount(){
    this.updateNews();
}
    
render() {
  return (
    <>
      <h1 className="text-center my-3">NewsNow - Top {this.props.category[0].toUpperCase() + this.props.category.substring(1)} headlines</h1>
      {this.state.loading && <Spinner/>}
      <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className='row'> 
              {this.state.articles.map((element)=>{
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
}
