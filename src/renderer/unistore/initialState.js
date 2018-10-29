const initialState = {}

initialState.navigation = {
  stack: [],
  currentPage: '/',
  currentQuery: {},
}

initialState.player = {
  paused: true,
  isLoading: false,
  showPlayer: false,
  syncPaused: true,
  currentTrack: {},
}

initialState.tooltip = {
  text: '',
  show: false,
  position: { left: 0, top: 0 },
}

initialState.cache = {}

initialState.favorites = []

initialState.downloads = {}

export default initialState
