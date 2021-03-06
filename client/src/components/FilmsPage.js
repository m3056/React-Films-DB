import React, {Component} from "react"
import _orderBy from "lodash/orderBy"
import FilmsList from "./films"
import FilmForm from "./forms/FilmForm"
import FilmContext from "./context/FilmContext"
import api from "../api"
import {Route} from "react-router-dom";
import {find} from "lodash/collection"
import {Redirect} from "react-router-dom";


export class FilmsPage extends Component {
  state = {
    films: [],
    loading: true
  }

  componentDidMount() {
    api.films.fetchAll().then(films => this.setState({films: this.sortFilms(films), loading: false}))
}

  sortFilms = films => _orderBy(films, ["featured", "title"], ["desc", "asc"])

  toggleFeatured = id => e => 
    
    this.setState(({films}) => ({
      films: this.sortFilms(
        films.map(film =>
          film._id === id ? {...film, featured: !film.featured} : film,
        ),
      ),
    }))




/*   saveFilm = film =>
    film._id === null ? this.addFilm(film) : this.updateFilm(film)

    addFilm = film =>
    api.films.create(film).then(film => {
        this.setState(({films}) => ({
            films: this.sortFilms([...films, {...film}]),

        }))
    })   */  

saveFilm = film =>
  (film._id === null ? this.addFilm(film) : this.updateFilm(film))
    .then(() => this.props.history.push("/films"))



  updateFilm = film =>
  api.films.update(film).then(film => {
    this.setState(({films}) => ({
      films: this.sortFilms(films.map(f => (f._id === film._id ? film : f))),
      
    }))
  })
 

 
 

 

   deleteFilm = film => e =>
    api.films.delete(film).then(() => {
      this.setState(({ films}) => ({
        films: this.sortFilms(films.filter(f => f._id !== film._id))
      }))
    }) 





  render() {
    const {films} = this.state
    const numCol = this.props.location.pathname === "/films" ? "sixteen" : "ten"
    
    return (
      <FilmContext.Provider
        value={{
          toggleFeatured: this.toggleFeatured,
          deleteFilm: this.deleteFilm,
          user: this.props.user
        }}
      >
          <div className="ui stackable grid">
           
        {this.props.user.role === "admin" ? (
          <>
            <Route
              exact
              path="/films/new"
              render={() => (
                <div className="six wide column">
                  <FilmForm submit={this.saveFilm} film={{}} />
                </div>
              )}
            />

            <Route
              path="/films/edit/:_id"
              render={props => (
                <div className="six wide column">
                  <FilmForm
                    submit={this.saveFilm}
                    film={find(this.state.films, { _id: props.match.params._id,}) || {}}
                  />
                </div>
              )}
            />
          </>
        ) : (
          <Route path="/films/*" render={() => <Redirect to="/films" />} />
        )}






            <div className={`${numCol} wide column`}>
              {
                this.state.loading ? (
                  <div className="ui icon message">
                      <i className="notched circle loading icon" />
                      <div className="content">
                        <div className="header">films loading</div>
                      </div>
                  </div> 
                ) : (
                  <FilmsList films={films} />
                )
              }
            </div>
          </div>
        
      </FilmContext.Provider>
    )
  }
}

export default FilmsPage
