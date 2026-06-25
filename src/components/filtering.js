export function initFiltering(elements) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  const updateIndexes = (elements, indexes) => {
    Object.keys(indexes).forEach((elementName) => {
      elements[elementName].append(
        ...Object.values(indexes[elementName]).map((name) => {
          const el = document.createElement("option");
          el.value = name;
          el.textContent = name;
          return el;
        }),
      );
    });
  };
  const applyFiltering = (query, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    if (action && action.name === "clear") {
      const label = action.parentElement;
      const input = label.querySelector(".input");
      input.value = "";
      const fieldName = action.dataset.field;
      state = { ...state, [fieldName]: "" };
    }
    const totalFrom = parseFloat(state.totalFrom) || undefined;
    const totalTo = parseFloat(state.totalTo) || undefined;
    if (totalFrom !== undefined || totalTo !== undefined) {
      state.total = [totalFrom, totalTo];
    }
    delete state.totalFrom;
    delete state.totalTo;
    const filter = {};
    Object.keys(elements).forEach((key) => {
      if (elements[key]) {
        if (
          ["INPUT", "SELECT"].includes(elements[key].tagName) &&
          elements[key].value
        ) {
          filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра
        }
      }
    });
    return Object.keys(filter).length
      ? Object.assign({}, query, filter)
      : query; // если в фильтре что-то добавилось, применим к запросу
  };
  return {
    updateIndexes,
    applyFiltering,
  };
}
