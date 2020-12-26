import React, { Component } from 'react';
import AppLocale from '../../lngProvider';
import MUIDataTable from "mui-datatables";
import { connect } from 'react-redux';
import _ from 'lodash';



const defaultOptions = {
    print: false,
    download: true,
    sort: false,
    filter: false,
    viewColumns: false,
    search: false,
    pagination: true,
    selectableRows: 'none'
  };

const defaultColumnOptions =  {
    filter: true,
    sort: false,
}

class XChangeItDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAppLocale: AppLocale[this.props.locale.locale],
      data: props.data,
      options: props.options ? props.options : defaultOptions,
      columns: this.props.columns,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.data !== state.data) {
      return {
        data: props.data,
      };
    }
    return null;
  }

  formatColumns = (columns) => {
    let formattedColumns = [];
    _.map(columns, (column) => {
      formattedColumns.push({
        name: column.name,
        label: this.state.currentAppLocale.messages[column.label], //localize
        options: column.options ? column.options : defaultColumnOptions,
      });
    });
    return formattedColumns;
  };

  render() {
    console.log("re-rendering");

    const { data, options, columns } = this.state;
    const localizedColumns = this.formatColumns(columns);
    return (
      <MUIDataTable
        title={this.props.title}
        data={data}
        columns={localizedColumns}
        options={options}
      />
    );
  }
};

const mapStateToProps = ({ settings }) => {
    const { locale } = settings;
    return { locale }
};

export default connect(mapStateToProps)(XChangeItDataTable);