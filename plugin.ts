module.exports = {
  acpScripts: ['static/lib/acp-main.js'],
  hooks: [
    {
      hook: 'static:app.load',
      method: 'init',
    },
    {
      hook: 'static:api.routes',
      method: 'addRoutes',
    },
    {
      hook: 'filter:admin.header.build',
      method: 'addAdminNavigation',
    },
  ],
  id: 'nodebb-plugin-stub',
  less: ['static/less/quickstart.less'],
  library: './src/index.js',
  modules: {
    '../admin/plugins/quickstart.js': './static/lib/admin.js',
    '../client/quickstart.js': './static/lib/quickstart.js',
  },
  scripts: ['static/lib/main.js'],
  staticDirs: {
    static: './static',
  },
  templates: 'static/templates',
  url: 'https://github.com/NodeBB/nodebb-plugin-quickstart',
}
