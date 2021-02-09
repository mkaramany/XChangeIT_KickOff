
import { FormControl, Grid, Input, InputLabel, Select, TextField } from "@material-ui/core";
import _ from "lodash";
import React from "react";
import { injectIntl } from 'react-intl';
import IntlMessages from "util/IntlMessages";
import { ageOptions } from "./AgeOptions";
import { colorOptions } from "./ColorOptions";

class ItemsFilter extends React.Component {

    
    state = {
        searchCriteria: { textSearch: "", minPrice: 0, maxPrice: null, age: "", color: "" }

    }

    updateSearchFilter = (event, propertyName) => {
        let tempCriteria = { ...this.state.searchCriteria };
        tempCriteria[propertyName] = event.target.value;
        this.setState({ searchCriteria: tempCriteria });
    };

    filterItems = () => {
        this.props.onSearch(this.state.searchCriteria);
    }


    render() {
        
    console.log("filter",this.props);

        return (<div className="jr-card">
            <h2><IntlMessages id="items.search.Filters" /></h2>
            <Grid container>

                <Grid container style={{ padding: "1%" }} xs={12}>
                    <Grid item xs={4}>
                        <TextField
                            label={<IntlMessages id="items.search.text" />}
                            placeholder={<IntlMessages id="items.search.text" />}
                            name="textSearch"
                            variant="outlined"
                            size="small"
                            fullwidth
                            onChange={(e) => this.updateSearchFilter(e, "textSearch")}
                            onBlur={this.filterItems}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            label={<IntlMessages id="items.search.minPrice" />}
                            placeholder={<IntlMessages id="items.search.minPrice" />}
                            name="minPrice"
                            variant="outlined"
                            size="small"
                            fullwidth
                            onChange={(e) => this.updateSearchFilter(e, "minPrice")}
                            onBlur={this.filterItems}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label={<IntlMessages id="items.search.maxPrice" />}
                            placeholder={<IntlMessages id="items.search.maxPrice" />}
                            name="maxPrice"
                            variant="outlined"
                            size="small"
                            fullwidth
                            onChange={(e) => this.updateSearchFilter(e, "maxPrice")}
                            onBlur={this.filterItems}
                        />
                    </Grid>
                </Grid>


            </Grid>

            <Grid container style={{ padding: "1%" }} xs={12}>
                <Grid item xs={4}>
                    <TextField
                        label={<IntlMessages id="items.search.dateFrom" />}
                        placeholder={<IntlMessages id="items.search.dateFrom" />}
                        name="dateFrom"
                        variant="outlined"
                        size="small"
                        fullwidth
                        onChange={(e) => this.updateSearchFilter(e, "dateFrom")}
                        onBlur={this.filterItems}
                    />
                </Grid>

                <Grid item xs={4}>
                    <TextField
                        label={<IntlMessages id="items.search.dateTo" />}
                        placeholder={<IntlMessages id="items.search.dateTo" />}
                        name="dateTo"
                        variant="outlined"
                        size="small"
                        fullwidth
                        onChange={(e) => this.updateSearchFilter(e, "dateTo")}
                        onBlur={this.filterItems}
                    />
                </Grid>

                <Grid item xs={4}>
                    <FormControl className="w-50 mb-2">
                        <InputLabel htmlFor="age-native-simple"><IntlMessages id="items.search.color" /></InputLabel>
                        <Select
                            native
                            name="color"
                            value={this.state.age}
                            onChange={(e) => this.updateSearchFilter(e, "color")}
                            onBlur={this.filterItems}
                            input={<Input id="age-native-simple" />}
                        >
                            <option value="" />
                            {_.map(colorOptions, (o) => { return (<option value={o.code}>{o.name}</option>); })}

                        </Select>
                    </FormControl>
                </Grid>

            </Grid>
            <Grid style={{ padding: "1%" }} container>
                <Grid item xs={4}>
                    <FormControl className="w-50 mb-2">
                        <InputLabel htmlFor="age-native-simple"><IntlMessages id="items.search.age" /></InputLabel>
                        <Select
                            native
                            name="age"
                            value={this.state.age}
                            onChange={(e) => this.updateSearchFilter(e, "age")}
                            onBlur={this.filterItems}
                            input={<Input id="age-native-simple" />}
                        >
                            <option value="" />
                            {_.map(ageOptions, (o) => { console.log(this.props.intl.formatMessage({id: o.name})); return (<option value={o.code}>{this.props.intl.formatMessage({id: o.name})}</option>); })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>);
    }
}
export default injectIntl(ItemsFilter);
