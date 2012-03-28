// Base classes for jQueryMobile Support
// require emberjs, jquery, jquery mobile and the css file for all the previous 
// librairy
// this code is base of the work of LuisSala to see his code go to 
// https://github.com/LuisSala/emberjs-jqm
//------------------------------------------------
// mix with jquery mobile

(function(exports) {
// ==========================================================================
// Project:  Ember - JQ Mobile
// Copyright: ©2012 Tolbard and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/**
  @class

  Ember.MobileBaseView is just a basic class for all the commun attribut in
  JQMobile.

  Note: As of this writing, `MobileBaseView` only add some bidding to its 
  superclass, `ArrayProxy`. The plan is to add additional all the commun
  attribut (with the default valur)for all the jqm element.

  @extends Ember.View
*/

	Ember.MobileBaseView = Ember.View.extend({
		attributeBindings:['data-role', 'data-theme'],
		'data-theme': 'a'
	});
})({});

(function(exports) {
// ==========================================================================
// Project:  Ember - JQ Mobile
// Copyright: ©2012 Tolbard and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/**
  @class

  Ember.PageView is the conterpart of the page element in JQMobile.

  Note: The plan is to add additional all the specific page attributs
  attribut (with the default value)for the page jqm element.

  @extends Ember.MobileBaseView
*/

	Ember.PageView = Ember.MobileBaseView.extend({
		'data-role': 'page'
	});
})({});

(function(exports) {
// ==========================================================================
// Project:  Ember - JQ Mobile
// Copyright: ©2012 Tolbard and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/**
  @class

  Ember.ToolbarBaseView is abstract and it's the conterpart of the toolbar
  element in JQMobile.

  Note: The plan is to add additional all the specific page attributs
  attribut (with the default value)for the toolbar jqm element.

  @extends Ember.MobileBaseView
*/

	Ember.ToolbarBaseView = Ember.MobileBaseView.extend({
		attributeBindings:['data-position'],
		'data-position': function() {
			if (this.get('isFullScreen')) {
				return 'fullscreen'
			}

			if (this.get('isFixed')) {
				return 'fixed'
			}
			return ''
		}.property('isFixed', 'isFullScreen').cacheable(),

		isFixed: true,
		isFullsScreen: false
	});
})({});

(function(exports) {
// ==========================================================================
// Project:  Ember - JQ Mobile
// Copyright: ©2012 Tolbard and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/**
  @class

  Ember.HeaderView is the conterpart of the toolbar header
  element in JQMobile.

  Note: The plan is to add additional all the specific page attributs
  attribut (with the default value)for the header jqm element.

  @extends Ember.MobileBaseView
*/

	Ember.HeaderView = Ember.ToolbarBaseView.extend({
		'data-role': 'header'

	});
})({});

(function(exports) {
// ==========================================================================
// Project:  Ember - JQ Mobile
// Copyright: ©2012 Tolbard and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/**
  @class

  Ember.ContentView is the conterpart of the content element in JQMobile.

  Note: The plan is to add additional all the specific page attributs
  attribut (with the default value)for the content jqm element.

  @extends Ember.MobileBaseView
*/

	Ember.ContentView = Ember.MobileBaseView.extend({
		'data-role': 'content'
	});
})({});

(function(exports) {
// ==========================================================================
// Project:  Ember - JQ Mobile
// Copyright: ©2012 Tolbard and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/**
  @class

  Ember.FooterView is the conterpart of the toolbar Footer
  element in JQMobile.

  Note: The plan is to add additional all the specific page attributs
  attribut (with the default value)for the Footer jqm element.

  @extends Ember.MobileBaseView
*/

	Ember.FooterView = Ember.MobileBaseView.extend({
		'data-role': 'footer',
		attributeBindings:['data-position'],
		'data-position': function() {
			if (this.get('isFixed')) {
				return 'fixed'
			}
			return ''
		}.property('isFixed').cacheable(),

		isFixed: true
	});
})({});


(function(exports) {
// ==========================================================================
// Project:  Ember - JQ Mobile
// Copyright: ©2012 Tolbard and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/**
  @class

  Ember.ListItemView is the conterpart of the element of a List View in JQMobile.

  Note: The plan is to add additional all the specific page attributs
  attribut (with the default value)for the item jqm element.

  @extends Ember.View
*/

	Ember.ListItemView = Ember.MobileBaseView.extend({
		tagName: 'li'/*,
		classNames: [],
		attributeBindings:['data-corners','data-shadow','data-inline','data-wrapperels','data-icon'],
		'data-corners':'false',
		'data-shadow':'false',
		'data-iconshadow':'true',
		'data-inline':'false',
		'data-wrapperels':'div',
		'data-icon':'arrow-r',
		'data-iconpos':'right'*/

	});
})({});

(function(exports) {
// ==========================================================================
// Project:  Ember - JQ Mobile
// Copyright: ©2012 Tolbard and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/**
  @class

  Ember.ListView is the conterpart of the element of a List View in JQMobile.

  Note: The plan is to add additional all the specific page attributs
  attribut (with the default value)for the item jqm element.

  @extends Ember.View
*/

	Ember.ListView = Ember.CollectionView.extend({
    attributeBindings: ['data-role', 'data-theme'],
    'data-role':'listview',
    tagName: 'ul',
    itemViewClass: Ember.ListItemView,
	init: function() {
        this._super();
        var _self = this;
		//the 'later' is to avoid that the preload element of the associated Controler
		//adopt the jqm style. Note : if you find a better way to do it that is compatible
		// with all the browser just let me know (I have test IE, Chrome, IOS 5,
		// black berry and Firefox)
		//   Em.run.next and  Em.run.once don't work the daly is needed.
        Em.run.later(function() {
			_self.$().listview('refresh');
        },400);
    },
    // Observe the attached content array's length and refresh the listview on the next RunLoop tick.
    contentLengthDidChange: function(){
        var _self = this;
        Em.run.next(function() {
			_self.$().listview('refresh');
        });
    }.observes('content.length')
});
})({});



// ==========================================================================
// Project:  Ember - JQ Mobile
// Copyright: ©2012 Tolbard and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/**
	helper: I am not sure why LuisSala have put this in his exemple
	if you know put a comment to explain
*/
$(document).bind('mobileinit', function() {
    $.mobile.touchOverflowEnabled = true;
});