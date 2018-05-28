import { Observable } from 'rxjs';

const hello = Observable.create(observer => {
  observer.next('hello');
  observer.next('World');
});

// subscription
const subscription = hello.subscribe(console.log);

// clear subscription
setTimeout(() => {
  console.log('clear subscription');
  subscription.unsubscribe();
}, 2e3);
