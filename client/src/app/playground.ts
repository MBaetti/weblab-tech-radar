import {from, interval, map, scan, take} from 'rxjs';
import { filter } from 'rxjs/operators';

// Students
let students = [
  {"name": "Anna", "class": 4},
  {"name": "Patrick", "class": 2},
  {"name": "Claudio", "class": 3},
  {"name": "Andreas", "class": 4},
  {"name": "Klara", "class": 1},
  {"name": "Kilian", "class": 2},
  {"name": "Pius", "class": 1},
];

// Create an Observable from students list and
// filter list for students in class 1. Print the values on console.
from(students)
  .pipe(filter(student => student.class === 1))
  .subscribe(student => console.log(student));

// Sum
let source = interval(400).pipe(
  take(9),
  map(i => ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'][i]));

// Create an Observable `result` that emits the
// sum of all numbers in source. Use pure functions
// such as map, filter, reduce, scan, merge, delay,
// concat, take, etc.

let result =
  source
    .pipe(
      map(x => Number.parseInt(x)),
      filter(x => !Number.isNaN(Number(x))),
      scan((x, y) => x + y));

result.subscribe(x => console.log(x));
