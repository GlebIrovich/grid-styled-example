import React from 'react';
import ReactDataGrid from 'react-data-grid';
import { Editors, Formatters } from 'react-data-grid-addons';

const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors;
const { DropDownFormatter } = Formatters;

// options for priorities autocomplete editor
const priorities = [{ id: 0, title: 'Critical' }, { id: 1, title: 'High' }, { id: 2, title: 'Medium' }, { id: 3, title: 'Low' }];
const PrioritiesEditor = <AutoCompleteEditor options={priorities} />;

// options for IssueType dropdown editor
// these can either be an array of strings, or an object that matches the schema below.
const issueTypes = [
  {
    id: 'bug', value: 'bug', text: 'Bug', title: 'Bug',
  },
  {
    id: 'improvement', value: 'improvement', text: 'Improvement', title: 'Improvement',
  },
  {
    id: 'epic', value: 'epic', text: 'Epic', title: 'Epic',
  },
  {
    id: 'story', value: 'story', text: 'Story', title: 'Story',
  },
];
const IssueTypesEditor = <DropDownEditor options={issueTypes} />;

const IssueTypesFormatter = <DropDownFormatter options={issueTypes} value="bug" />;

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          key: 'id', name: 'ID', locked: true, width: 50,
        },
        {
          key: 'title', name: 'Title', resizable: true, editable: true,
        },
        {
          key: 'priority',
          name: 'Priority',
          editor: PrioritiesEditor,
        },
        {
          key: 'issueType',
          name: 'Issue Type',
          editor: IssueTypesEditor,
          formatter: IssueTypesFormatter,
        },
        { key: 'count', name: 'Count' },
      ],
      rows: [],
    };
  }

  componentDidMount() {
    const rows = this.createRows();

    this.setState({
      rows,
    });
  }

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const rows = this.state.rows;

    for (let i = fromRow; i <= toRow; i++) {
      rows[i] = {
        ...rows[i],
        ...updated,
      };
    }

    this.setState({ rows });
  }

    createRows = () => {
      const rows = [];
      for (let i = 1; i < 100; i++) {
        rows.push({
          id: i,
          title: `Title ${i}`,
          count: i * 1000,
        });
      }
      return rows;
    };

    rowGetter = i => this.state.rows[i];

    render() {
      console.log(this.state);

      return (
        <ReactDataGrid
          columns={this.state.columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          enableCellSelect
          minHeight={500}
          onGridRowsUpdated={this.onGridRowsUpdated}
        />);
    }
}

export default Grid;
