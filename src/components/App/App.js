import React from 'react';

import News from './../News/News';
import Form from './../Form/Form';

import './App.css';

class App extends React.Component {
    state = {
        news: null,
        isLoading: true
    };

    componentDidMount() {
        fetch('http://localhost:3000/data/newsData.json')
            .then(response => {
                return response.json()
            })
            .then(data => {
                setTimeout(() => {
                    this.setState({
                        isLoading: !this.state.isLoading,
                        news: data
                    });
                }, 500);
            })
    };

    static getDerivedStateFromProps(props, state) {
        let nextFilteredNews;

        if (Array.isArray(state.news)) {
            nextFilteredNews = [...state.news];

            nextFilteredNews.forEach((item) => {
                if (item.bigText.toLowerCase().indexOf('pubg') !== -1) {
                    item.bigText = 'СПАМ'
                }
            });

            return {
                filteredNews: nextFilteredNews,
            }
        }

        return null;
    }

    handleAddNews = data => {
        const nextNews = [data, ...this.state.news];
        this.setState({ news: nextNews });
    };

    render() {
        const { news, isLoading } = this.state;
        return (
            <React.Fragment>
                <div className="main-content">
                    {isLoading && <h2>Загрузка...</h2>}
                    {Array.isArray(news) &&
                        <div className="container">
                            <h1 className="main-content__title">Блог</h1>
                            <div className="main-content__content">
                                <News data={news}/>
                                <Form onAddNews={this.handleAddNews}/>
                            </div>
                        </div>
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default App;
