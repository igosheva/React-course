import React from "react";
import PropTypes from "prop-types";

import './Form.css'

class Form extends React.Component {
    state = {
        name: "",
        text: "",
        bigText: "",
        agree: false
    };
    onBtnClickHandler = e => {
        e.preventDefault();
        const { name, text, bigText } = this.state;
        this.props.onAddNews({
            id: +new Date(),
            author: name,
            text,
            bigText
        });
    };
    handleChange = e => {
        const { id } = e.currentTarget;
        this.setState({ [id]: e.currentTarget.value });
    };
    handleCheckboxChange = e => {
        this.setState({ agree: e.currentTarget.checked });
    };
    validate = () => {
        const { name, text, agree } = this.state;
        if (name.trim() && text.trim() && agree) {
            return true;
        }
        return false;
    };
    render() {
        const { name, text, bigText } = this.state;
        return (
            <form className="form">
                <input
                    id="name"
                    type="text"
                    onChange={this.handleChange}
                    className="form__author"
                    placeholder="Ваше имя"
                    value={name}
                />
                <textarea
                    id="text"
                    onChange={this.handleChange}
                    className="form__author"
                    placeholder="Заголовок статьи"
                    value={text}
                />
                <textarea
                    id="bigText"
                    onChange={this.handleChange}
                    className="form__text"
                    placeholder="Основной текст статьи"
                    value={bigText}
                />
                <label className="form__checkrule">
                    <input type="checkbox" onChange={this.handleCheckboxChange} /> Я
                    согласен с правилами
                </label>
                <button
                    className="form__btn"
                    onClick={this.onBtnClickHandler}
                    disabled={!this.validate()}
                >
                    Добавить статью
                </button>
            </form>
        );
    }
}

Form.propTypes = {
    onAddNews: PropTypes.func.isRequired
};

export default Form;
