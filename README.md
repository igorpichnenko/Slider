# Color slider


## [Demo color slider](https://igorpichnenko.github.io/Slider/)


![Slider](https://i.imgur.com/1Qu6emO.jpg)
 


## Установка
```
npm install
```
### Режим работы
```
// develop
npm run start

// production
npm run build

// deploy gh pages
npm run deploy

// Запустить тесты
npm run test

// eslint
npm run lint

```
## Использование
Для подключения плагина необходимо:
  * Подключить **jquery** к своему проекту
  * Подключить файлы **slider.js** и **slider.css** к своему проекту

Для установки через npm 
  * Выполнить **npm i color-range-slider**
  * Сделать импорт из node_modules например:
  * import '../../../node_modules/color-range-slider/dist/slider/slider.js'
  * import '../../../node_modules/color-range-slider/dist/slider/slider.css'
  * Задать размер для оболочки для корректного отображения
  * Классы для переоформления стилей:
    .slider, .slider_horizontal, .slider_vertical, .slider__roller,.slider__roller_horizontal,.slider__roller_vertical, .slider__tooltip, .slider__tooltip_horizontal, .slider__tooltip_vertical, .slider__track, .slider__track_horizontal, .slider__track_vertical, .slider__out,
    .slider__out-start_horizontal, .slider__out-end_horizontal, .slider__track_horizontal, .slider__track_vertical, .slider__bar, .slider__bar_horizontal, .slider__bar_vertical, .slider__scale, .slider__scale_horizontal, .slider__scale_vertical, .slider__scale-value, .slider__scale-value_horizontal,
    .slider__scale-value_vertical, .slider__scale-value:after, .slider_vertical .slider__scale-value:before


Для создания слайдера c настройками "по умолчанию" выполните:

создать в html
```
<div class='slider'></div>
```
Js
```
$('.slider').colorSlider();
```
Для создания слайдера с пользовательскими настройками:
```
$('.slider').colorSlider({
    gradient: 'blue',
    color: 'yellow',
    orientation: "vertical",
    max: 100,
    from: 30,
    to: 70
});
```
### Доступные настройки
| Название свойства | По умолчанию | Описание | Типы |
| ------ | ------ | ------ | ------ |
| type | double | Один бегунок либо диапазон | single/double|
| orientation | horizontal | Вертикальный/Горизонтальный вид | vertical/horizontal |
| min | 0 | Минимальное значение | number,все number могут быть -, или дробными |
| max | 10 | Максимальное значение | number |
| step | 1 | шаг может быть дробным | number |
| from | 3 | начальная позиция первого бегунка | number |
| to | 7 | начальная позиция второго бегунка | number |
| prefix | ₽ | префикс для tooltip | любое значение |
| isPrefix | true | показать/скрыть префикс для tooltip | boolean |
| isLabel | true | показать/скрыть сами tooltips над бегунками | boolean |
| isScale | true | показать/скрыть шкалу | boolean |
| color | 'orange' | цвет первого бегунка, части бара если включен градиент, либо цвет всего слайдера | цвет в 16-ом формате #fff, либо например green/red |
| isScalePrefix | true | показать/скрыть префикс шкалы | boolean |
| scalePrefix | ₽ | префикс шкалы | любое значение |
| minMax | false | показать/скрыть min и max по краям слайдера | boolean |
| fromTo | false | показать/скрыть from и to по краям слайдера | boolean |
| isTrackPrefix | true | показать/скрыть префикс minNax,fromTo | boolean |
| trackPrefix | ₽ | префикс minMax,fromTo | любое значение | 
| isColor | true | изменять цвет или нет | boolean |
| changeColor | true | сменить оттенок | boolean |
| isGradient | true | включить/выключить градиент | boolean |
| gradient | 'purple' | второй цвет для создания градиента | #fff, green/red и.т.д | 
| gradientDeg | 45 | градус направление градиента | number |
| isColorOut | false | выводить значение текущего цвета вместо значений | boolean |
| onlyDivisions | false | оставить только деления шкалы | boolean | 



## Архитектура


Плагин выполнен согласно шаблону проектирования MVP (Model-View-Presenter).

#### **Модель**. Класс Model
Модель выполняет бизнес логику и уведомляет EventEmitter об изменениях состояния,
Модель ничего не знает о Виде и Презентере

 #### **Представление (или Вид)**. Класс View
 Вид не знает о Модели и Презентере. Он содержит логику связанную с отображением слайдера, и действия юзера, делится на подвиды subView где каждый подвид является элементом слайдера.
 Так же он уведомляет об новых изменениях EventEmitter. Подвиды не знают не чего о Виде и о других подвидах, и изменяются получая новое состояние которое им обновляет Вид.

 #### **Представитель**. Класс Presenter
 
Презентер является связующим звеном Модели и Вида, и подписывается в EventEmitter на их изменение, с помощью патерна EventEmitter для двунаправленного общения реализуется слабое связывание которое позволяет передать нужные данные из Вида в Модель и наоборот.
 
#### **Track subView, подвид**. Класс Track
subView класс который рисует трэк, и создаёт 2 элемента для вывода значений в начале и в конце трэка. Не обращается к другим классам, не уведомляет об изменениях.

#### **Bar subView, подвид**. Класс Bar
subView класс который рисует бар,и изменяет цвет от изменения состояния Вида, не обращается к другим классам, не уведомляет об изменениях.

#### **Scale subView, подвид**. Класс Scale
subView класс который рисует шкалу, и создаёт деления шкалы в зависимости от максимального и минимального значения, не обращается к другим классам, и не уведомляет об изменениях.

#### **Rollers subView, подвид**. Класс Rollers
subView класс который рисует 2 бегунка, и 2 tooltip для бегунков, изменяет цвет от изменения состояния Вида и своего положения, не обращается к другим классам и не уведомляет об изменениях.

#### **EventEmitter, паттерн для обмена информацией**. Класс EventEmitter
Класс который получает уведомление об изменении состояния у Вида или Модели и уведомляет об этом Презентера.

![UML](https://i.imgur.com/W0GArw5.jpg)

На графике у нас выходит 3 основных слоя и 4 подвида, связь между слоями слабая, что позволяет разрабатывать слои по отдельности, Вид расширяет базовые параметры, и передает их в подвиды для большей их независимости.
