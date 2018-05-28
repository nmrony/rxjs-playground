import { Observable } from 'rxjs';
console.clear();
let evenNumbersStream$ = Observable.create(observer => {
  console.log('In create');
  let i = 0;
  const id = setInterval(() => {
    console.log('In setInverVal');
    if (++i % 2 === 0) observer.next(i);
  }, 1000);

  return function() {
    console.log('In clearInterval');
    clearInterval(id);
  };
});

const subscription = evenNumbersStream$.subscribe(value => console.log('Value', value));

setTimeout(() => {
  console.log('In setTimeout');
  subscription.unsubscribe();
}, 10000);
