import React,{useState,useEffect} from 'react';
import './App.css';
import MovieBox from './MovieBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Container,Form, FormControl,Button, Tabs, Tab } from 'react-bootstrap';


const API_URL= " https://api.themoviedb.org/3/discover/movie?api_key=a4ed4a7127a93f6bcc1cf705c3ba2632" +
    "&sort_by=vote_average.asc&page=1&vote_average.gte=1&include_null_first_air_dates=false"
// const API_SEARCH="https://api.themoviedb.org/3/search/movie?api_key=a4ed4a7127a93f6bcc1cf705c3ba2632&query";
function App() {

    const [movies, setMovies]=useState([]);
    const [query, setQuery]=useState('');

    useEffect(() => {
        fetch(API_URL)
            .then((res)=>res.json())
            .then(data=>{
                console.log(data);
                data.results.splice(10);
                setMovies(data.results);
            })
    }, [])


    const searchMovie = async(e) =>{
        e.preventDefault();
        console.log("Searching");
        try{
            const url='https://api.themoviedb.org/3/discover/movie?api_key=a4ed4a7127a93f6bcc1cf705c3ba2632&sort_by=vote_average.asc&page=1&primary_release_year='
                + query +
                '&vote_average.gte=1' ;
            const res= await fetch(url);
            const data= await res.json();
            console.log(data);
            console.log("movies");
            setMovies(data.results);
        }
        catch(e){
            console.log(e);
        }
    }

    const searchTV = async(e) =>{
        e.preventDefault();
        console.log("Searching");
        try{

            const url='https://api.themoviedb.org/3/discover/tv?api_key=a4ed4a7127a93f6bcc1cf705c3ba2632&sort_by=vote_average.asc&' +
                'first_air_date_year=${query}&page=1&vote_average.gte=1'
            const res= await fetch(url);
            const data= await res.json();
            console.log(data);
            console.log("Tv");
            setMovies(data.results);

        }
        catch(e){
            console.log(e);
        }
    }


    const changeHandler=(e)=>{
        setQuery(e.target.value);
    }

    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="#home">
                        <img
                            width="30"
                            height="30"
                            className="logo"
                        />
                        Кино топку
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
                </Container>
            </Navbar>

            <Container fluid style={{background:'#212529'}}>
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    fill
                >
                    <Tab eventKey="Movies" title="Фильмы"  >
                        <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">

                            <FormControl
                                type="search"
                                placeholder="Year of movie"
                                className="me-2"
                                aria-label="search"
                                name="query"
                                value={query} onChange={changeHandler}></FormControl>
                            <Button variant="secondary" type="submit">Search</Button>
                        </Form>
                    </Tab>
                    <Tab eventKey="profile" title="Сериалы" >
                        <Form className="d-flex" onSubmit={searchTV} autoComplete="off">

                            <FormControl
                                type="search"
                                placeholder="Year of series"
                                className="me-2"
                                aria-label="search"
                                name="query"
                                value={query} onChange={changeHandler}></FormControl>
                            <Button variant="secondary" type="submit">Search</Button>
                        </Form>
                    </Tab>
                </Tabs>
            </Container>

            <div>
                {movies.length > 0 ?(
                    <div className="container">
                        <div className="grid" >
                                {movies.map((movieReq)=>
                                    <div className="grid-item">
                                        <MovieBox key={movieReq.id} {...movieReq}  />
                                    </div>)}
                        </div>
                    </div>
                ):(
                    <h2>Sorry !! No Movies Found</h2>
                )}
            </div>
        </>

    );
}

export default App;
