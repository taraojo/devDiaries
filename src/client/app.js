const dateService = require('./../server/services/dateService');

(function() {

    let app = {
        isLoading: true,
        visibleCards: {},
        recentEntries: [],
        loader: document.querySelector('.loader'),
        cardTemplate: document.querySelector('.card-template'),
        container: document.querySelector('main .list-container')
    };


    document.getElementById('btnAddEntry').addEventListener('click', function() {
        // Add the newly created entry
        let title = document.getElementById('newTitle').value;
        let content = document.getElementById('newContent').value;

        document.getElementById('newTitle').value = '';
        document.getElementById('newContent').value = '';

        console.log(content);//eslint-disable-line
        if (!app.recentEntries) {
            app.recentEntries = [];
        }
        let newEntry = {
            title,
            content,
            dateTime: new Date()
        };

        app.recentEntries.push(newEntry);
        app.updateEntryCard(newEntry);
        app.saveRecentEntries();
    });


    //get all the cards rendered server side and add to visible cities
    let renderedCards = document.querySelectorAll('.card-template');
    renderedCards.forEach(function (card) {
        let cardId = card.querySelector('.card-id').textContent.trim();
        app.visibleCards[cardId] = card;
    });


    /*****************************************************************************
     *
     * Methods to update/refresh the UI
     *
     ****************************************************************************/

    // Updates an entry card with the latest journal entry. If the card
    // doesn't already exist, it's cloned from the template.
    app.updateEntryCard = function(data) {
        let card = app.visibleCards[data._id];
        if (!card) {
            card = app.cardTemplate.cloneNode(true);
            card.classList.remove('cardTemplate');
            card.querySelector('.entry-title').textContent = data.title;
            card.removeAttribute('hidden');
            app.container.appendChild(card);
            //app.visibleCards[data._id] = card;
        }
        card.querySelector('.description').textContent = data.content;
        card.querySelector('.date').textContent = dateService.convertDate(data.dateTime);

        if (app.isLoading) {
            app.loader.setAttribute('hidden', true);
            app.container.removeAttribute('hidden');
            app.isLoading = false;
        }
    };


    /*****************************************************************************
     *
     * Methods for dealing with the model
     *
     ****************************************************************************/

    // Gets a forecast for a specific city and update the card with the data
    app.getAllEntries = function() {
        let url = '/api/entries/';

        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    let response = JSON.parse(request.response);
                    response.forEach(function (entry) {
                        app.updateEntryCard(entry);
                    });
                    app.recentEntries = response;
                    app.saveRecentEntries();
                }
            }
        };
        request.open('GET', url);
        request.send();
    };

    // Save list of recent entries to localStorage
    app.saveRecentEntries = function() {
        localStorage.recentEntries = JSON.stringify(app.recentEntries);
    };



    /************************************************************************
     *
     * Code required to start the app
     * TODO:
     * NOTE: To simplify this codelab, we've used localStorage.
     *   localStorage is a synchronous API and has serious performance
     *   implications. It should not be used in production applications!
     *   Instead, check out IDB (https://www.npmjs.com/package/idb) or
     *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
     ************************************************************************/

    app.recentEntries = localStorage.recentEntries;
    if (app.recentEntries) {
        app.recentEntries = JSON.parse(app.recentEntries);
        app.recentEntries.forEach(function (entry) {
            app.updateEntryCard(entry);
        });
    } else {
        // The user is using the app for the first time, or has not saved any entries.
        app.getAllEntries();
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function() { console.log('Service Worker Registered'); });
    }

})();
