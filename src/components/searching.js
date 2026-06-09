
import {rules, createComparison, defaultRules} from "../lib/compare.js";

export function initSearching(searchField) {
    
    // @todo: #5.1 — настроить компаратор
    const searchCompair = createComparison(['skipEmptyTargetValues'], [rules.searchMultipleFields (searchField, ['date', 'customer', 'seller'], false)]);
    
    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор 

    const searchValue = state[searchField] ;
    console.log(searchValue)

 return data.filter(row => searchCompair(row, { [searchField]: searchValue })
    );
}
}