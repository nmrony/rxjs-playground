import { Observable, fromEvent } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
console.clear();

const speechRecognition$ = Observable.create(observer => {
  const speech = new webkitSpeechRecognition();
  speech.onresult = event => {
    observer.next(event);
    observer.complete();
  };
  speech.start();

  return () => {
    speech.stop();
  };
});

const say = text =>
  Observable.create(observer => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = e => {
      observer.next(e);
      observer.complete();
    };
    speechSynthesis.speak(utterance);
  });

const button = document.querySelector('button');
const heyClick$ = fromEvent(button, 'click');

heyClick$
  .pipe(
    switchMap(e => speechRecognition$),
    map(e => e.results[0][0].transcript),
    map(text => {
      console.log(text);
      switch (text.toLowerCase()) {
        case 'b2':
        case 'bittu':
        case 'bitu':
          return 'I love you';
        case 'search':
          window.open(`https://www.google.com`);
          return 'opening google.com';
        case 'i want':
          return 'candy';
        case 'hi':
        case 'ice ice':
          return 'baby';
        case 'hello':
          return 'Is it me you are looking for';
        case 'make me a sandwich':
        case 'get me a sandwich':
          return 'do it yo damn self';
        case 'why are you being so sexist':
          return 'you made me that way';
        default:
          return `I don't understand: "${text}"`;
      }
    }),
    concatMap(say),
    catchError(err => console.log('Error', err))
  )
  .subscribe(e => console.log(e));
