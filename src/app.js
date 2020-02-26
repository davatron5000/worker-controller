import Planets from './views/planets.js';

Planets.init();
Planets.index();

// TODO: This is a budget router
document.addEventListener('click', (event)=>{
  event.preventDefault();

  if (event.target.tagName === 'A') {
      let path = new URL(event.target.href).pathname;

      if (path.includes('/planets/show')) {
            Planets.show(path.match(/\d+/)[0])
      } else if (path.includes('/planets')) {
            Planets.index();
      } 
  }
});