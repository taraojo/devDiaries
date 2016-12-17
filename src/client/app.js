
(function() {
    'use strict';

    var app = {
        isLoading: true,
        visibleCards: {},
        loader: document.querySelector('.loader'),
        cardTemplate: document.querySelector('.card-template'),
        container: document.querySelector('main .list-container')
    };


    /*****************************************************************************
     *
     * Methods to update/refresh the UI
     *
     ****************************************************************************/

    // Updates an entry card with the latest journal entry. If the card
    // doesn't already exist, it's cloned from the template.
    app.updateEntryCard = function(data) {
        var card = app.visibleCards[data.key];
        if (!card) {
            card = app.cardTemplate.cloneNode(true);
            card.classList.remove('cardTemplate');
            card.querySelector('.entry-title').textContent = data.title;
            card.removeAttribute('hidden');
            app.container.appendChild(card);
            app.visibleCards[data.key] = card;
        }
        card.querySelector('.description').textContent = data.entry;
        card.querySelector('.date').textContent = new Date(data.dateTime);

        if (app.isLoading) {
            app.loader.setAttribute('hidden', true);
            app.container.removeAttribute('hidden');
            app.isLoading = false;
        }
    };


    var fakeEntry = {
        id: '1234',
        title: 'New York, NY Whatt',
        entry: 'gkytf j jtfc jf jtgfv jtgc gf jfzf`az szzgfxcjy ckyhtc \'kuyfvkuyckuyfv jyytd ytfjytxresgj hgvkuyfuy hgf iy gc jgc ;uinhoiuh jcmhg',
        dateTime: 'Wed Dec 07 2016 22:01:54 GMT+0000 (GMT)'
    };


    // Uncomment the line below to test with the provided fake data
    // app.updateEntryCard(fakeEntry);

})();
