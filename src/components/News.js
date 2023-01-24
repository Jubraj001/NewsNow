import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {

  static defaultProps={
    country: "in",
    pageSize: 6
  }

  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number
  }

  articles=[]
  constructor(props){
    super(props);
    this.state={
        articles:this.articles,
        loading: false,
        page:1
    }

    document.title=`NewsNow - ${this.props.category[0].toUpperCase() + this.props.category.substring(1)}`;
  }

async updateNews(){
  this.setState({loading:true});
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=72fa59d9455d47adaadaf54bbefd3b15&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json();
  this.setState({
    articles: parsedData.articles, 
    totalResults:parsedData.totalResults,
    loading:false});
}

async componentDidMount(){
    this.updateNews();
}
    
PrevClickHandler= async()=>{
  await this.setState({page:this.state.page-1});
  this.updateNews();
  }
  
NextClickHandler = async()=>{
  this.setState({page:this.state.page+1});
  this.updateNews();
}

render() {
  return (
      <div className="container my-3">
      <h1 className="text-center">NewsNow - Top {this.props.category[0].toUpperCase() + this.props.category.substring(1)} headlines</h1>
      {this.state.loading && <Spinner/>}
          <div className='row'> 
              {!this.state.loading && this.state.articles.map((element)=>{
              return <div className="col-lg-4 col-md-6" key={element.url}>    
                  <NewsItem title= {element.title} description = {element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
              })}
          </div>
          <div className="container d-flex justify-content-between">
          <button disabled = {this.state.page===1} type="button" className="btn btn-dark" onClick={this.PrevClickHandler}>&larr; Previous</button>
          <button disabled = {this.state.page+1 >= Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.NextClickHandler}>Next &rarr;</button>
          </div>
      </div>
  )
}
}
