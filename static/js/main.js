window.PoetryMe = {

    // events
    ev: {
		'click #subscription__submit': 'signup',
        'keydown input': 'onKeydown',
        'click .showButton': 'toggleLetter',
	},

	// functions
	f: {
		validate: s => !!s.trim(),

		signup() {
			const name = $('#subscription__name').value.trim();
			const email = $('#subscription__email').value.trim();

			if (!PoetryMe.f.validate(name)) {
				alert('We didn\'t get a name! A nickname is just fine.');
				return;
			} else if (!PoetryMe.f.validate(email)) {
				alert('We can\'t send you an email without an email address! Please enter your email');
				return;
			}

			fetch(`https://maker.ifttt.com/trigger/trubadour_signup/with/key/bVFc_4CoaN3D_lYvI8-OPZ?value1=${name}&value2=${email}`, {
                mode: 'no-cors',
			}).then(() => {
                // TODO: improve later
                alert(`Thanks for signing up, ${name}!`);
			});

			$('#subscription__name').value = '';
			$('#subscription__email').value = '';
        },

        onKeydown(evt) {
            if (evt.keyCode === 13) {
                PoetryMe.f.signup()
            }
        },

        toggleLetter() {
            $('.letter').classList.toggle('less');
        },

    },

}

PoetryMe.init = function() {

    // add event listeners
    Object.keys(PoetryMe.ev).forEach(function(identifier) {
        var eventName = identifier.split(' ')[0],
            selector = identifier.split(' ').splice(1).join(' '),
            fn = PoetryMe.f[PoetryMe.ev[identifier]]

        PoetryMeUtils.eventAdder(selector, eventName, fn)
    })

    $('.letter').classList.add('less');

    // serviceWorker check
    // if ('serviceWorker' in navigator) {
    //     navigator.serviceWorker.register('sw.js').then(function(registration) {
    //         console.log('Service worker registration successful')
    //     }).catch(function(err) {
    //         console.error('Service worker registration failed', err)
    //     })
    // }

    console.info('PoetryMe initialized')

}

PoetryMe.init()
