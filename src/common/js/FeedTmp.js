export default {
  NETWORK_ERROR: {
    'type': 'operateComponents',
    'target_components': {
      'bubble': {
        'action': 'show',
        'params': {
          'type': 'success',
          'title': 'Network Error!'
        }
      }
    }
  }
}
