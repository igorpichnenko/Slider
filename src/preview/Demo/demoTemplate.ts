const demoTemplate = `

<h4  class="panel__title">Панель управления</h4>

<label class="panel__labels">V/H Вид
<input type="checkbox" class="panel__checkbox panel__inputs js-orientation" /></label>

<label class="panel__labels">Показать/Скрыть Tooltip
<input type="checkbox" class="panel__checkbox panel__inputs js-isLabel"/></label>

<label class="panel__labels">Range/Single
<input type="checkbox" class="panel__checkbox panel__inputs js-isDouble"/></label>

<div class="panel__items">
<label class="panel__labels">Max
<input type="number" class="panel__inputs js-max" /></label>

<label class="panel__labels">Min
<input type="number" class="panel__inputs js-min"/></label>

<label class="panel__labels">From
<input type="number" class="panel__inputs js-from"/></label>

<label class="panel__labels">To
<input type="number" class="panel__inputs js-to" /></label>

<label class="panel__labels">Шаг
<input type="number" class="panel__inputs js-step"/></label>
</div>
`;

export {
  demoTemplate,
};
