///<amd-module name='admin/plugins/quickstart'/>

import alerts = require('alerts')
import settings = require('settings')
import uploader = require('uploader')

declare let config: any
declare let socket: any

/*
	This file is located in the "modules" block of plugin.json
	It is only loaded when the user navigates to /admin/plugins/quickstart page
	It is not bundled into the min file that is served on the first load of the page.
*/
function saveSettings(): void {
  settings.save('quickstart', $('.quickstart-settings'), function () {
    alerts.alert({
      alert_id: 'quickstart-saved',
      clickfn() {
        socket.emit('admin.reload')
      },
      message: 'Please reload your NodeBB to apply these settings',
      title: 'Settings Saved',
      type: 'success',
    })
  })
}

function setupColorInputs(): void {
  const colorInputs = $('[data-settings="colorpicker"]')
  colorInputs.on('change', updateColors)
  updateColors()
}

function updateColors(): void {
  $('#preview').css({
    'background-color': $('#bgColor').val(),
    color: $('#color').val(),
  })
}

function setupUploader(): void {
  $('#content input[data-action="upload"]').each(function () {
    const uploadBtn = $(this)
    uploadBtn.on('click', function () {
      uploader.show(
        {
          accept: 'image/*',
          params: {
            folder: 'quickstart',
          },
          route: `${config.relative_path}/api/admin/upload/file`,
        },
        function (image: any) {
          $('#' + uploadBtn.attr('data-target')).val(image)
        },
      )
    })
  })
}

export function init(): void {
  console.log('init1234')
  setupUploader()
  settings.load('quickstart', $('.quickstart-settings'), function () {
    setupColorInputs()
  })
  $('#save').on('click', saveSettings)
}
