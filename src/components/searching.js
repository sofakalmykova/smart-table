import {rules, createComparison, defaultRules} from "../lib/compare.js";

export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    
    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        const searchValue = state[searchField] || '';
        const searchComparator = createComparison(['skipEmptyTargetValues'], [rules.searchMultipleFields (searchValue, ['date', 'customer', 'seller'], false)]);
    console.log(searchComparator);

        console.log(data)
        return data.filter(row => searchComparator(row, { [searchField]: searchValue }))
    }
}