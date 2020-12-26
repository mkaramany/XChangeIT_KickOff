import React from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { TextField, Fab, Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  container: {
    flexGrow: 1,
    position: "relative",
    height: 100,
    width: "60%",
  },
  suggestionsContainerOpen: {
    position: "absolute",
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  suggestion: {
    display: "block",
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
});

class XChangeItAutoSuggest extends React.Component {
  state = {
    value: "",
    suggestions: [],
    selectedSuggestion: "",
  };

  renderInput = (inputProps) => {
    const { classes, ref, ...other } = inputProps;

    return (
      <Grid container>
        <Grid item xs={10} style={{ paddingRight: "10px" }}>
          <TextField
            fullWidth
            inputref={ref}
            InputProps={{
              classes: {
                input: classes.input,
              },
              ...other,
            }}
          />
        </Grid>
        <Grid item xs={2} style={{ paddingLeft: "15px" }}>
          <Fab
            className="jr-fab-btn"
            aria-label="edit"
            onClick={() => this.returnSelectedValue()}>
            <i className="zmdi zmdi-account-add zmdi-hc-fw zmdi-hc-lg" />
          </Fab>
        </Grid>
      </Grid>
    );
  };

  renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </strong>
            );
          })}
        </div>
      </MenuItem>
    );
  }

  renderSuggestionsContainer(options) {
    const { containerProps, children } = options;

    return (
      <div className="position-relative" style={{ zIndex: 200 }}>
        <Paper {...containerProps} square>
          {children}
        </Paper>
      </div>
    );
  }

  returnSelectedValue = () => {
                                console.log("selected: ", this.state.value);
                                // before I return i could check if it is one of the suggestions or not ""show error
                                // or handle this outside component
                                this.props.onAdd(this.state.value);
                              };

  getSuggestionValue = (suggestion) => {
    console.log("inside getSuggestionValue", suggestion.label);
    // this.setState({ selectedSuggestion: suggestion.label }, () => {
    //   console.log("selectedSuggestion", this.state.selectedSuggestion);
    // });
    return suggestion.label;
  };

  getSuggestions(value, suggestionList) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : suggestionList.filter((suggestion) => {
          const keep =
            count < 5 &&
            suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value, this.props.suggestionList),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={this.renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={{
          classes,
          placeholder: "Search all active users",
          value: this.state.value,
          onChange: this.handleChange,
        }}
      />
    );
  }
}

XChangeItAutoSuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(XChangeItAutoSuggest);
