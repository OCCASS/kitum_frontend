module.exports = {
  apps: [
    {
      name: 'KITUM',
      script: 'npm',
      args: 'start',
      exec_mode: 'cluster',
      instances: 'max',
      env: {
        "NEXT_SHARP_PATH": "node_modules/sharp"
      }
    }
  ]
}
