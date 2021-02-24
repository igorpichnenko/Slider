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
| type | double | Один бегунок либо диапазон | single/double|
| orientation | horizontal | Вертикальный/Горизонтальный вид | vertical/horizontal |
| min | 0 | Минимальное значение | number,все number могут быть -, или дробными |
| max | 10 | Максимальное значение | number |
| step | 1 | шаг может быть дробным | number |
| from | 3 | начальная позиция первого бегунка | number |
| to | 7 | начальная позиция второго бегунка | number |
| prefix | $ | префикс для tooltip | любое значение |
| isPrefix | true | показать/скрыть префикс для tooltip | false/true |
| isLabel | true | показать/скрыть сами tooltips над бегунками | false/true |
| isScale | true | показать/скрыть шкалу | false/true |

## Архитектура


Плагин выполнен согласно шаблону проектирования MVP (Model-View-Presenter).
#### **Модель**. Класс Model


 #### **Представление (или Вид)**. Класс View
 

  

 #### **Представитель**. Класс Presenter
 

 

![UML](https://i.imgur.com/W0GArw5.jpg)
