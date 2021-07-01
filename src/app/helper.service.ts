import { Injectable } from '@angular/core';

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  convertToTitleCase(inputStr: string) {
    let returnStr = '';
    if (inputStr && inputStr !== null) {
      inputStr = inputStr.toLowerCase();
      returnStr = inputStr.charAt(0).toUpperCase() + inputStr.slice(1);
    }
    return returnStr;
  }

  sortArray(inputArray: any, sortColumn: string, sortDir: SortDirection) {
    inputArray.sort((a, b) => {
      if ( a[sortColumn] < b[sortColumn] ) {
        if (sortDir === SortDirection.ASC) {
          return -1;
        } else {
          return 1;
        }
      }
      if ( a[sortColumn] > b[sortColumn] ){
        if (sortDir === SortDirection.ASC) {
          return 1;
        } else {
          return -1;
        }
      }
      return 0;
    });
  }
}
