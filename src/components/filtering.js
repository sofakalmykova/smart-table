import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules); 

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    //console.log(indexes)
    //console.log(elements)
    Object.keys(indexes).forEach(elementName => {
    elements[elementName].append(...Object.values(indexes[elementName])
    .map(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        return option;
    }))
    })
    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
    if (action && action.name === "clear") {
        const label = action.parentElement;
        const input = label.querySelector('.input');
        input.value = "";
        const fieldName = action.dataset.field;
        state = {...state, [fieldName]: ""}
    }
        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state)); 
    } }

