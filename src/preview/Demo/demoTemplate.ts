const demoTemplate = `

<h4  class="panel__title">Панель управления</h4>

<label class="panel__labels panel__checkboxes">V/H Вид
<input type="checkbox" class="panel__checkbox panel__inputs js-orientation" name="orientation" /></label>

<label class="panel__labels panel__checkboxes">Показать/Скрыть Tooltip
<input type="checkbox" class="panel__checkbox panel__inputs js-isLabel" name="label"/></label>

<label class="panel__labels panel__checkboxes">Range/Single
<input type="checkbox" class="panel__checkbox panel__inputs js-isDouble" name="double"/></label>

<div class="panel__items">
<label class="panel__labels">Max
<input type="number" class="panel__inputs js-max" name="max"/></label>

<label class="panel__labels">Min
<input type="number" class="panel__inputs js-min" name="min"/></label>

<label class="panel__labels">From
<input type="number" class="panel__inputs js-from" name="from" /></label>

<label class="panel__labels">To
<input type="number" class="panel__inputs js-to" name="to"/></label>

<label class="panel__labels">Шаг
<input type="number" class="panel__inputs js-step" name="step"/></label>
</div>
`;

export {
  demoTemplate,
};
