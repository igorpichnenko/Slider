const demoTemplate = `


  <h4  class="js-title">Панель управления</h4>
  <div class="js-items">
   <label class="js-labels js-label_checkbox">V/H Вид
   <input type="checkbox" class="js-checkbox js-inputs js-orientation" name="orientation" />
   </label>
   <div class="js-items">
   <label class="js-labels js-label_checkbox">Показать/Скрыть Tooltip
   <input type="checkbox" class="js-checkbox js-inputs js-isLabel" name="label"/>
   </label>
   </div>
   </div>
     <div class="js-items">
   <label class="js-labels js-label_checkbox">Range/Single
   <input type="checkbox" class="js-checkbox js-inputs js-isDouble" name="double"/>
   </label>
   </div>
   
   <button class="js-btn js-btn-view">Настройки отображения</button>
   <div class="js-menu js-menu-view">
   
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
   <label class="js-labels js-label_checkbox">Добавить/убрать разделитель
   <input type="checkbox" class="js-checkbox js-inputs js-isScaleDel" name="scale"/>
   </label>
     </div>
     <div class="js-items">
   <label class="js-labels">Делитель
   <input type="text" class="js-inputs js-separate" name="separate"/>
   </label>
   </div>
    <div class="js-items">
   <label class="js-labels js-label_checkbox">Выводить цвета/значения
   <input type="checkbox" class="js-checkbox js-inputs js-isColorOut" name="color"/>
   </label>
   </div>
  
   
   
   <button type="button" class="js-btn js-btn-scale">Управление шкалой</button>
   <div class="js-menu js-menu-scale">
       <div class="js-items">
   <label class="js-labels js-label_checkbox">Шкала с делениями/значениями
   <input type="checkbox" class="js-checkbox js-inputs js-division" name="division"/>
   </label>
   </div>
      <div class="js-items">
   <label class="js-labels js-label_checkbox">Показать/Скрыть Шкалу
   <input type="checkbox" class="js-checkbox js-inputs js-isScale" name="scale"/>
   </label>
     </div>
   </div>
     
   </div>
   
   
   </div>
    <div class="js-items">
   <label class="js-labels">Max
   <input type="number" class="js-inputs js-max" name="max"/>
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels">Min 
   <input type="number" class="js-inputs js-min" name="min"/>
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels">From
   <input type="number" class="js-inputs js-from" name="from" />
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels">To
   <input type="number" class="js-inputs js-to" name="to"/>
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels">Шаг
   <input type="number" class="js-inputs js-step" name="step"/>
   </label>
   </div>
   </div>
   
   
   <button class="js-btn js-btn-color" type="button">Настройки цвета</button>
   <div class="js-menu js-color-setting">
     <div class="js-items">
   <label class="js-labels js-label_checkbox">Откл/Вкл изменение цвета
   <input type="checkbox" class="js-checkbox js-inputs js-isColor" name="isColor"/>
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels js-label_checkbox">Использовать только css/переменной цвет
   <input type="checkbox" class="js-checkbox js-inputs js-isChangeColor" name="isColor"/>
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
   
   
   <button type="button" class="js-btn js-btn-postfix">Postfix/Prefix</button>
   <div class="js-menu js-menu-postfix">
   <div class="js-items">
   <div class="js-items">
   <label class="js-labels js-label_checkbox">Добавить/убрать Префикс tooltip
   <input type="checkbox" class="js-checkbox js-inputs js-isPrefix-all" name="isPrefix"/>
   </label>
   </div>
   <label class="js-labels js-label_checkbox js-label-postfix">Показать/Скрыть Pre/Postfix tooltip
   <input type="checkbox" class="js-checkbox js-inputs js-isPostfixTool" name="isPrefix"/>
   </label>
   </div>
      <div class="js-items">
   <label class="js-labels js-label_checkbox">Показать/Скрыть Pre/Postfix шкалы
   <input type="checkbox" class="js-checkbox js-inputs js-isPostfix" name="isPrefix"/>
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels js-label_checkbox">Показать/Скрыть Pre/Postfix track
   <input type="checkbox" class="js-checkbox js-inputs js-isTrackPostfix" name="isPrefix"/>
   </label>
   </div>
   <div class="js-items">
   <label class="js-labels">Pre/Postfix tooltip
   <input type="text" class="js-inputs js-marker" name="marker"/>
   </label>
   </div>
      <div class="js-items">
   <label class="js-labels">Pre/Postfix шкалы
<input type="text" class="js-inputs js-scale-postfix" name="js-prefix"/>
   </label>
   </div>
    <div class="js-items">
   <label class="js-labels">Pre/Postfix track
<input type="text" class="js-inputs js-track-postfix" name="js-prefix"/>
   </label>
   </div>
   </div>
  
  `;

export { demoTemplate };
