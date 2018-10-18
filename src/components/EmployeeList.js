import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { employeeFetch } from "../actions";
import { ListView } from "react-native";
import ListItem from "./ListItem";

class EmployeeList extends Component {
  componentWillMount() {
    this.props.employeeFetch();
    this.createDataSource(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }
  createDataSource({ employee }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(employee);
  }
  renderRow(employee) {
    return <ListItem employee={employee} />;
  }
  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}
const mapStateToProps = state => {
  const employee = _.map(state.employees, (val, uid) => {
    return { ...val, uid };
  });
  return { employee };
};

export default connect(
  mapStateToProps,
  { employeeFetch }
)(EmployeeList);
