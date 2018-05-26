import { Observable } from "rxjs";
console.clear();
let stream$ = Observable.create(observer => {
  console.log("In create");
  let i = 0;
  observer.next(i++);
  const id = setInterval(() => {
    console.log("In setInverVal");
    observer.next(i++);
  }, 1000);

  return function() {
    console.log("In clearInterval");
    clearInterval(id);
  };
});

const subscription = stream$.subscribe(value => {
  console.log("Value", value);
});

setTimeout(() => {
  console.log("In setTimeout again");
  subscription.unsubscribe();
}, 10000);
