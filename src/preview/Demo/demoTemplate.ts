const demoTemplate = `


<h4  class="panel__title">Панель управления</h4>
<div class="panel__items">

<label class="panel__labels panel__checkboxes">V/H Вид
<input type="checkbox" class="panel__checkbox panel__inputs js-orientation" name="orientation" />
</label>
<div class="panel__items">

<label class="panel__labels panel__checkboxes">Показать/Скрыть Tooltip
<input type="checkbox" class="panel__checkbox panel__inputs js-isLabel" name="label"/>
</label>
</div>
</div>
<div class="panel__items">

<label class="panel__labels panel__checkboxes">Range/Single
<input type="checkbox" class="panel__checkbox panel__inputs js-isDouble" name="double"/>
</label>
</div>

<button class="panel__button js-btn-view">Настройки отображения</button>
<div class="panel__menu js-menu-view">

<div class="panel__items">

<label class="panel__labels panel__checkboxes">Показать min/max
<input type="checkbox" class="panel__checkbox panel__inputs js-minMax" name="minMax"/>
</label>
</div>
<div class="panel__items">

<label class="panel__labels panel__checkboxes">Показать from/to
<input type="checkbox" class="panel__checkbox panel__inputs js-fromTo" name="fromTo"/>
</label>
</div>
<div class="panel__items">

<label class="panel__labels panel__checkboxes">Добавить/убрать разделитель
<input type="checkbox" class="panel__checkbox panel__inputs js-isScaleDel" name="scale"/>
</label>
</div>
<div class="panel__items">

<label class="panel__labels">Делитель
<input type="text" class="panel__inputs js-separate" name="separate"/>
</label>
</div>
<div class="panel__items">

<label class="panel__labels panel__checkboxes">Выводить цвета/значения
<input type="checkbox" class="panel__checkbox panel__inputs js-isColorOut" name="color"/>
</label>
</div>



<button type="button" class="panel__button js-btn-scale">Управление шкалой</button>
<div class="panel__menu js-menu-scale">
<div class="panel__items">

<label class="panel__labels panel__checkboxes">Шкала с делениями/значениями
<input type="checkbox" class="panel__checkbox panel__inputs js-division" name="division"/>
</label>
</div>
<div class="panel__items">

<label class="panel__labels panel__checkboxes">Показать/Скрыть Шкалу
<input type="checkbox" class="panel__checkbox panel__inputs js-isScale" name="scale"/>
</label>
</div>
</div>
</div>
</div>
<div class="panel__items">

<label class="panel__labels">Max
<input type="number" class="panel__inputs js-max" name="max"/>
</label>
</div>
<div class="panel__items">

<label class="panel__labels">Min
<input type="number" class="panel__inputs js-min" name="min"/>
</label>
</div>
<div class="panel__items">

<label class="panel__labels">From
<input type="number" class="panel__inputs js-from" name="from" />
</label>
</div>
<div class="panel__items">

<label class="panel__labels">To
<input type="number" class="panel__inputs js-to" name="to"/>
</label>
</div>
<div class="panel__items">

<label class="panel__labels">Шаг
<input type="number" class="panel__inputs js-step" name="step"/>
</label>
</div>
</div>


<button class="panel__button js-btn-color" type="button">Настройки цвета</button>
<div class="panel__menu js-color-setting">
<div class="panel__items">

<label class="panel__labels panel__checkboxes">Откл/Вкл изменение цвета
<input type="checkbox" class="panel__checkbox panel__inputs js-isColor" name="isColor"/>
</label>
</div>
<div class="panel__items">

<label class="panel__labels panel__checkboxes">Использовать только css/переменной цвет
<input type="checkbox" class="panel__checkbox panel__inputs js-isChangeColor" name="isColor"/>
</label>
</div>
<div class="panel__items">

<label class="panel__labels panel__checkboxes">Сменить оттенок
<input type="checkbox" class="panel__checkbox panel__inputs js-changeColor" name="isColor"/>
</label>
</div>
<div class="panel__items">

<label class="panel__labels panel__checkboxes">Градиент вкл/откл
<input type="checkbox" class="panel__checkbox panel__inputs js-gradient" name="isColor"/>
</label>
</div>
<div class="panel__items">

<label class="panel__labels">Цвет
<input type="text" class="panel__inputs js-color" name="color"/>
</label>
</div>
<div class="panel__items">

<label class="panel__labels">Градиент
<input type="text" class="panel__inputs js-gradient-out" name="gradient"/>
</label>
</div>
<div class="panel__items">

<label class="panel__labels">Угол градиента
<input type="number" class="panel__inputs js-gradient-deg" name="gradient"/>
</label>
</div>
</div>


<button type="button" class="panel__button js-btn-postfix">Postfix/Prefix</button>
<div class="panel__menu js-menu-postfix">
<div class="panel__items">
<div class="panel__items">

<label class="panel__labels panel__checkboxes">Сменить Префикс/Постфикс
<input type="checkbox" class="panel__checkbox panel__inputs js-isPrefix-all" name="isPrefix"/>
</label>
</div>
<label class="panel__labels panel__checkboxes js-label-postfix">Показать/Скрыть Pre/Postfix tooltip
<input type="checkbox" class="panel__checkbox panel__inputs js-isPostfixTool" name="isPrefix"/>
</label>
</div>
<div class="panel__items">

<label class="panel__labels panel__checkboxes">Показать/Скрыть Pre/Postfix шкалы
<input type="checkbox" class="panel__checkbox panel__inputs js-isPostfix" name="isPrefix"/>
</label>
</div>
<div class="panel__items">

<label class="panel__labels panel__checkboxes">Показать/Скрыть Pre/Postfix track
<input type="checkbox" class="panel__checkbox panel__inputs js-isTrackPostfix" name="isPrefix"/>
</label>
</div>
<div class="panel__items">

<label class="panel__labels">Pre/Postfix tooltip
<input type="text" class="panel__inputs js-marker" name="marker"/>
</label>
</div>
<div class="panel__items">

<label class="panel__labels">Pre/Postfix шкалы
<input type="text" class="panel__inputs js-scale-postfix" name="js-prefix"/>
</label>
</div>
<div class="panel__items">

<label class="panel__labels">Pre/Postfix track
<input type="text" class="panel__inputs js-track-postfix" name="js-prefix"/>
</label>
</div>
</div>

`;

export {
  demoTemplate,
};
