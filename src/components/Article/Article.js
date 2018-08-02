import React from 'react';
import PropTypes from 'prop-types';

import './Article.css'

class Article extends React.Component {

    state = {
        visible: false
    };
    handleReadMoreClck = e => {
        e.preventDefault();
        this.setState({ visible: true });
    };
    render() {
        const {author, text, bigText} = this.props.data;
        const {visible} = this.state;
        return (
            <div className="article">
                <p className="article__author">{author}:</p>
                <p className="article__text">{text}</p>
                {!visible && (
                    <a
                        onClick={this.handleReadMoreClck}
                        href="#readmore"
                        className="article__readmore"
                    >
                        Подробнее
                    </a>
                )}
                {visible && <p className="article__big-text">{bigText}</p>}
            </div>
        );
    }
}

Article.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired, // добавили id, это число, обязательно
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        bigText: PropTypes.string.isRequired
    })
};

export default Article;
