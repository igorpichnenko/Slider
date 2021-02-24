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

// Запустить тесты
npm run test
```
## Использование
Для подключения плагина необходимо:
  * Подключить **jquery** к своему проекту
  * Подключить файлы **slider.js** и **slider.css** к своему проекту

Для создания слайдера c настройками "по умолчанию" выполните:
```
$('.element').colorSlider();
```
Для создания слайдера с пользовательскими настройками:
```
$('.element').colorSlider({
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
| type | double | Один бегунок либо диапазон | string "single"/"double"|
| orientation | horizontal | Вертикальный/Горизонтальный вид | string "vertical"/"horizontal" |
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


 #### **Представление (или Вид)**. Класс View
 

  

 #### **Представитель**. Класс Presenter
 

 

![UML](https://i.imgur.com/W0GArw5.jpg)
