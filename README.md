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
| Название свойства | По умолчанию | Описание |
| ------ | ------ | ------ |
| min | 0 | Минимальное значение |
| max | 10 | Максимальное значение |
| step | 1 | шаг может быть дробным |
| type | single/double | Один бегунок/Два бегунка |
| Вид |
| orientation | "vertical"/"horizontal" | Вертикальный/Горизонтальный вид |




## Архитектура


Плагин выполнен согласно шаблону проектирования MVP (Model-View-Presenter).
#### **Модель**. Класс Model


 #### **Представление (или Вид)**. Класс View
 

  

 #### **Представитель**. Класс Presenter
 

 

![UML](https://i.imgur.com/W0GArw5.jpg)
