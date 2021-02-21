const demoTemplate = `
   <button class="js-btn js-btn-main" type="button">Menu</button>
  <div class="js-menu js-menu-main">
  <h4  class="js-title">Панель управления</h4>
  <div class="js-items">
   <label class="js-labels js-label_checkbox">V/H Вид
   <input type="checkbox" class="js-checkbox js-inputs js-orientation" name="orientation" />
   </label>
   </div>
     <div class="js-items">
   <label class="js-labels js-label_checkbox">Range/Single
   <input type="checkbox" class="js-checkbox js-inputs js-isDouble" name="double"/>
   </label>
   </div>
   
   <button class="js-btn js-btn-view">Настройки отображения</button>
   <div class="js-menu js-menu-view">

   <div class="js-items">
   <label class="js-labels js-label_checkbox">Показать/Скрыть Тултип
   <input type="checkbox" class="js-checkbox js-inputs js-isLabel" name="label"/>
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels js-label_checkbox">Показать min/max
   <input type="checkbox" class="js-checkbox js-inputs js-minMax" name="minMax"/>
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels js-label_checkbox">Показать from/to
   <input type="checkbox" class="js-checkbox js-inputs js-fromTo" name="fromTo"/>
   </label>
   </div>

    <div class="js-items">
   <label class="js-labels js-label_checkbox">Выводить цвета
   <input type="checkbox" class="js-checkbox js-inputs js-isColorOut" name="color"/>
   </label>
   </div>
  
   
   
   <button type="button" class="js-btn js-btn-scale">Управление шкалой</button>
   <div class="js-menu js-menu-scale">
       <div class="js-items">
   <label class="js-labels js-label_checkbox">Оставить только деления
   <input type="checkbox" class="js-checkbox js-inputs js-division" name="division"/>
   </label>
   </div>
      <div class="js-items">
   <label class="js-labels js-label_checkbox">Показать/Скрыть Шкалу
   <input type="checkbox" class="js-checkbox js-inputs js-isScale" name="scale"/>
   </label>
     </div>
    <div class="js-items">
   <label class="js-labels js-label_checkbox">Показать/скрыть деления
   <input type="checkbox" class="js-checkbox js-inputs js-isDivision" name="division"/>
   </label>
   </div>
   </div>
   
   
   </div>
    <div class="js-items">
   <label class="js-labels">Max
   <input type="number" class="js-inputs js-max" name="max"/>
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels">To
   <input type="number" class="js-inputs js-to" name="to"/>
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels">From
   <input type="number" class="js-inputs js-from" name="from" />
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels">Min
   <input type="number" class="js-inputs js-min" name="min"/>
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels">Шаг
   <input type="number" class="js-inputs js-step" name="step"/>
   </label>
   </div>
   
   
   <button class="js-btn js-btn-color" type="button">Настройки цвета</button>
   <div class="js-menu js-color-setting">
     <div class="js-items">
   <label class="js-labels js-label_checkbox">Откл/Вкл изменение цвета
   <input type="checkbox" class="js-checkbox js-inputs js-isColor" name="isColor"/>
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels js-label_checkbox">Сменить оттенок
   <input type="checkbox" class="js-checkbox js-inputs js-changeColor" name="isColor"/>
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels js-label_checkbox">Градиент вкл/откл
   <input type="checkbox" class="js-checkbox js-inputs js-gradient" name="isColor"/>
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels">Цвет
<input type="text" class="js-inputs js-color" name="color"/>
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels">Градиент
<input type="text" class="js-inputs js-gradient-out" name="gradient"/>
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels">Угол градиента
<input type="number" class="js-inputs js-gradient-deg" name="gradient"/>
   </label>
   </div>
   </div>
   
   
   <button type="button" class="js-btn js-btn-prefix">Настройки Prefix</button>
   <div class="js-menu js-menu-prefix">
      <div class="js-items">
   <label class="js-labels js-label_checkbox">Показать/Скрыть префикс шкалы
   <input type="checkbox" class="js-checkbox js-inputs js-isPrefix" name="isPrefix"/>
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels js-label_checkbox">Показать/Скрыть префикс track
   <input type="checkbox" class="js-checkbox js-inputs js-isTrackPrefix" name="isPrefix"/>
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels">Префикс
   <input type="text" class="js-inputs js-marker" name="marker"/>
   </label>
   </div>
      <div class="js-items">
   <label class="js-labels">Префикс шкалы
<input type="text" class="js-inputs js-scale-prefix" name="js-prefix"/>
   </label>
   </div>
    <div class="js-items">
   <label class="js-labels">Префикс track
<input type="text" class="js-inputs js-track-prefix" name="js-prefix"/>
   </label>
   </div>
   </div>
   
   <button type="button" class="js-btn js-btn-navigate">Доп. инструменты</button>
   <div class="js-menu js-menu-navigate">
    <div class="js-items">
   <label class="js-labels">Размер
<input value="250" type="range" min="250" max="800" class="js-inputs js-slider-size" name="js-size"/>

   </label>
   </div>
   
   </div>
   </div>
  `;

export { demoTemplate };
