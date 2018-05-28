import { Observable } from 'rxjs';

const app = document.querySelector('#app');
const hello = Observable.create(observer => {
  observer.next('Hello');
  observer.next(' RxJS');
  observer.next('!!');
});

// subscription
const subscription = hello.subscribe(value => {
  const prev = app.innerHTML;
  app.innerHTML = prev + value;
});

// clear subscription
setTimeout(() => {
  console.log('clear subscription');
  subscription.unsubscribe();
}, 2e3);
