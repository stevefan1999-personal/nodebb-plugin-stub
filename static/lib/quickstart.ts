///<amd-module name='forum/quickstart'/>

/*
	This file is located in the "modules" block of plugin.json
	It is only loaded when the user navigates to /quickstart page
	It is not bundled into the min file that is served on the first load of the page.
*/

export = {
  init(): void {
    $('#last-p').text('quickstart.js loaded!')
  },
}
