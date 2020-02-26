const PlanetWorker = new Worker('../workers/planets.worker.js' );

export default {    

    index() {
        PlanetWorker.postMessage( {} );
    },

    _renderIndex( event ) {
        let template = `<ul>
            ${event.data.results.map( planet => 
                `<li><a href="/planets/show/${planet.url.match(/\d+/)[0]}">${planet.name}</a></li>`
            ).join('')}
        </ul>`;
        document.querySelector('#app').innerHTML = template;
    },
    
    show( id ) {
        PlanetWorker.postMessage( { id: id } );
    },

    _renderShow(event) {
        const planet = event.data;
        console.log('rendering planet');
        const template = `
            <a href="/planets">Back</a>
             <h1>${planet.name}</h1>
             <p>${planet.terrain}</p>
        `;
        document.querySelector('#app').innerHTML = template;
    },

    handleMessage(event) {
        event?.data?.results?.length ?
            this._renderIndex( event ) :
            this._renderShow( event );
    },

    init() {
        PlanetWorker.addEventListener('message', this.handleMessage.bind(this) )
    }
}