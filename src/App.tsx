import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import './App.css';
import useBreakPoint from "./hooks/useBreakpoint";
import Menu, {LinkItem} from "./components/Menu";
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {Favorites} from "./pages/Favorites";
import {Photos} from "./pages/Photos";
import {Users} from "./pages/Users";

const App = () => {

    const [isClosed, setClosed] = useState(false)
    const isStatic = useBreakPoint("sm")


    const links: LinkItem[] = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "Users",
            path: "users"
        },
        {
            name: "Photos",
            path: "photos"
        },
        {
            name: "Favorites",
            path: "favorites"
        },
        {
            name: "About",
            path: "about"
        }
    ]

    return (
        <Router>
            <Menu
                links={links}
                isClosed={isClosed}
                setClosed={setClosed}
                isStatic={isStatic}
            >
                <div className="flex flex-grow items-center justify-between px-3">
                    <h1>Home</h1>
                    <button>
                        <Link to="login">ログイン</Link>
                    </button>
                </div>
                <div className="flex">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/favorites" component={Favorites}/>
                        <Route exact path="/photos" component={Photos}/>
                        <Route exact path="/users" component={Users}/>
                    </Switch>
                </div>
            </Menu>
        </Router>
    )
}

export default App;
