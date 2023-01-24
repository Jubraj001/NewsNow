import React, { Component } from 'react'
import error from "./error.gif"
export default class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
    return (
      <div className="my-3">
        <div className="card" >
          <span className="badge bg-primary">{source}</span>
          <img src={imageUrl?imageUrl:error} className="card-img-top" alt="..."/>
          <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <a rel="noreferrer" href= {newsUrl} target="_blank" className="btn btn-info">Read More</a>
              <div className="card-footer text-muted my-2">
                By {!author?"Anonymous":author} on {new Date(date).toGMTString()}
              </div>
          </div>
        </div>
      </div>
    )
  }
}
