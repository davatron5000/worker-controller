const ENDPOINTS = {
    INDEX:  'https://swapi.co/api/planets/',
    SHOW:   'https://swapi.co/api/planets/:id'
}

async function index() {

   return await fetch( ENDPOINTS.INDEX )
        .then( response => { return response.json() })
        .then( json => { return json })
        .catch(err => {
            console.log(err);
        })
}

async function show( id ) {
   return await fetch( ENDPOINTS.SHOW.replace(':id', id) )
        .then( response => { return response.json() })
        .then( json => { return json })
        .catch(err => {
            console.log(err);
        })
}

async function router(e) {
    return  e?.data?.id ? await show( e.data.id ) : await index();
}

var onmessage = async function(e) {
    console.log('Message received from main script', e.data);
    var workerResult = await router(e);
    console.log('Posting message back to main script', workerResult);
    postMessage(workerResult);
  }