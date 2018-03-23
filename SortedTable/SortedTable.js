import React from 'react';
import st from './SortedTable.css';
import MSGlyphicon from 'MSGlyphicon/MSGlyphicon.js';

export default class SortedTable extends React.Component {
  componentDidMount() {
    const {columns, sortedColumns, data} = this.state;
    if(data && data.length>0){
      this.sortData(columns, sortedColumns);
    }
  }

  constructor(props) {
    super(props);
    const {data} = this.props;
    this.state = {
      columns: {
        id: 'unsorted',
        name: data && data.length>0?'ascending':'unsorted',
        family: 'unsorted',
        city: 'unsorted',
        score: 'unsorted'
      },
      data: data && data.length>0?[...data]:null,
      sortedColumns:['name'],
      isMulti:false
    };
  }

  renderData(){
    const {data} = this.state;
    return (data? Object.keys(data).map((key)=>
        <tr key={key}>
          <td>{data[key].id}</td>
          <td>{data[key].name}</td>
          <td>{data[key].family}</td>
          <td>{data[key].city}</td>
          <td>{data[key].score}</td>
        </tr>): null)
  }
  resetSortingStatus(columns){
    Object.keys(columns).forEach((key) => columns[key]='unsorted');
  }

  getNewColumnStatus(e, column){
    let newColumnStatus;
    const {isMulti, columns} = this.state;
    if((e.ctrlKey || e.altKey) && !isMulti && columns[column]!=='unsorted'){
      newColumnStatus = columns[column];
    }else{
      switch(columns[column]){
      case 'ascending':
        newColumnStatus='descending';
        break;
      case 'descending':
        newColumnStatus='unsorted';
        break;
      case 'unsorted':
        newColumnStatus='ascending';
        break;
      default:
        newColumnStatus='';
      }
    }
    return newColumnStatus;
  }

  sortData(columns, sortedColumns){
    if(sortedColumns.length===0){
      this.setState({data: [...this.props.data]});
    }else{
      let sortedData = [...this.state.data];
      sortedData.sort((obj1,obj2)=>{
        for(let column of sortedColumns){

          let val1 = obj1[column];
          let val2 = obj2[column];
          if(Number.isInteger(val1)){
            val1=Number(val1);
            val2=Number(val2);
          }

          if(columns[column]==='ascending'){
            if(val1<val2){
              return -1;
            }else if(val1>val2){
              return 1;
            }
          }else{
            if(val1<obj2[column]){
              return 1;
            }else if(val1>val2){
              return -1;
            }
          }
        }
        return 0;
      });
      this.setState({data: sortedData});
    }
  }

  handleHeaderClick(e, column){
    if(!this.state.data){
      return;
    }
    let newColumnStatus = this.getNewColumnStatus(e, column);
    let columns = {...this.state.columns};
    let sortedColumns;
    if(e.ctrlKey || e.altKey){
      if(this.state.isMulti){
        sortedColumns=[...this.state.sortedColumns];
      }else{
        sortedColumns=[];
        this.resetSortingStatus(columns);
      }
      if(newColumnStatus==='unsorted'){
        let index = sortedColumns.indexOf(column);
        if (index > -1) {
          sortedColumns.splice(index, 1);
        }
      }else if(!sortedColumns.includes(column)){
        sortedColumns.push(column);
      }
      this.setState({isMulti:true});
    }else{
      this.resetSortingStatus(columns);
      if(newColumnStatus==='unsorted'){
        sortedColumns=[];
      }else{
        sortedColumns=[column];
      }
      this.setState({isMulti:false});
    }
    columns[column] = newColumnStatus;
    this.setState({columns});
    this.setState({sortedColumns});
    this.sortData(columns, sortedColumns);
  }

  getCaretUpStatus(column){
    switch(this.state.columns[column]){
    case 'ascending':
      return st.active;
    case 'descending':
      return st.inactive;
    default:
      return '';
    }
  }

  getCaretDownStatus(column){
    switch(this.state.columns[column]){
    case 'ascending':
      return st.inactive;
    case 'descending':
      return st.active;
    default:
      return '';
    }
  }

  getSortedIndex(column){
    const {sortedColumns, isMulti} = this.state;
    let index='';
    if(isMulti){
      index = sortedColumns.indexOf(column)+1;
      if(index < 1){
        index = '';
      }
    }
    return index;
  }

  render() {
    return (
        <table className={st.dataTable}>
          <thead>
            <tr>
              <th>
                <span className={st.sortableColumn} onClick={(e)=>this.handleHeaderClick(e, 'id')}>
                  ID
                  <span className={st.multi}>{this.getSortedIndex('id')}</span>
                  <MSGlyphicon glyph="caret-up" className={`${st.caretUp} ${this.getCaretUpStatus('id')}`}/>
                  <MSGlyphicon glyph="caret-down" className={`${st.caretDown} ${this.getCaretDownStatus('id')}`}/>
                </span></th>
              <th>
                <span className={st.sortableColumn} onClick={(e)=>this.handleHeaderClick(e, 'name')}>
                  Name
                  <span className={st.multi}>{this.getSortedIndex('name')}</span>
                  <MSGlyphicon glyph="caret-up" className={`${st.caretUp} ${this.getCaretUpStatus('name')}`}/>
                  <MSGlyphicon glyph="caret-down" className={`${st.caretDown} ${this.getCaretDownStatus('name')}`}/>
                </span>
              </th>
              <th>
                <span className={st.sortableColumn} onClick={(e)=>this.handleHeaderClick(e, 'family')}>
                  Family
                  <span className={st.multi}>{this.getSortedIndex('family')}</span>
                  <MSGlyphicon glyph="caret-up" className={`${st.caretUp} ${this.getCaretUpStatus('family')}`}/>
                  <MSGlyphicon glyph="caret-down" className={`${st.caretDown} ${this.getCaretDownStatus('family')}`}/>
                </span>
              </th>
              <th>
                <span className={st.sortableColumn} onClick={(e)=>this.handleHeaderClick(e, 'city')}>
                  City
                  <span className={st.multi}>{this.getSortedIndex('city')}</span>
                  <MSGlyphicon glyph="caret-up" className={`${st.caretUp} ${this.getCaretUpStatus('city')}`}/>
                  <MSGlyphicon glyph="caret-down" className={`${st.caretDown} ${this.getCaretDownStatus('city')}`}/>
                </span>
              </th>
              <th>
                <span className={st.sortableColumn} onClick={(e)=>this.handleHeaderClick(e, 'score')}>
                  Score
                  <span className={st.multi}>{this.getSortedIndex('score')}</span>
                  <MSGlyphicon glyph="caret-up" className={`${st.caretUp} ${this.getCaretUpStatus('score')}`}/>
                  <MSGlyphicon glyph="caret-down" className={`${st.caretDown} ${this.getCaretDownStatus('score')}`}/>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderData()}
          </tbody>
        </table>
    );
  }
}