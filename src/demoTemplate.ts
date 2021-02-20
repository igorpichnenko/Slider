const demoTemplate = `
   <button class="js-btn" type="button">Menu</button>
  <div class="js-menu">
  <h4  class="js-title">Панель управления</h4>
  <div class="js-items">
   <label class="js-labels js-label_checkbox">V/H Вид
   <input type="checkbox" class="js-checkbox js-inputs js-orientation" name="orientation" />
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels js-label_checkbox">Показать/Скрыть Шкалу
   <input type="checkbox" class="js-checkbox js-inputs js-isScale" name="scale"/>
   </label>
     </div>
     <div class="js-items">
   <label class="js-labels js-label_checkbox">Range/Single
   <input type="checkbox" class="js-checkbox js-inputs js-isDouble" name="double"/>
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels js-label_checkbox">Показать/Скрыть Тултип
   <input type="checkbox" class="js-checkbox js-inputs js-isLabel" name="label"/>
   </label>
   </div>
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
   <label class="js-labels">Префикс
   <input type="text" class="js-inputs js-marker" name="marker"/>
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels">Шаг
   <input type="number" class="js-inputs js-step" name="step"/>
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels">Цвет
<input type="text" class="js-inputs js-color" name="color"/>
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
  `;

export { demoTemplate };
